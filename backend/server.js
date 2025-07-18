const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Schema
const cardSchema = new mongoose.Schema({
  term: String,
  definition: String,
});

const deckSchema = new mongoose.Schema({
  name: String,
  description: String,
  cards: [cardSchema],
  createdAt: { type: Date, default: Date.now },
});

const Deck = mongoose.model('Deck', deckSchema);

// Routes
app.get('/api/Decks', async (req, res) => {
  try {
    const decks = await Deck.find();
    res.json(decks);
  } catch (error) {
    console.error('Error fetching decks:', error);
    res.status(500).json({ error: 'Failed to fetch decks' });
  }
});

app.get('/api/Decks/:id', async (req, res) => {
    try {
        const deck = await Deck.findById(req.params.id);
        if (!deck) {
            return res.status(404).json({ error: 'Deck not found' });
        }
        res.json(deck);
    } catch (error) {
        console.error('Error fetching deck:', error);
        res.status(500).json({ error: 'Failed to fetch deck' });
    }
});

app.post('/api/Decks', async (req, res) => {
  try {
    console.log('Received data:', req.body);
    const newDeck = new Deck(req.body);
    const savedDeck = await newDeck.save();
    console.log('Saved deck:', savedDeck);
    res.status(201).json(savedDeck);
  } catch (error) {
    console.error('Error creating deck:', error);
    res.status(500).json({ error: 'Failed to create deck' });
  }
});

app.delete('/api/Decks/:id', async (req, res) => {
    try {
        await Deck.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting deck:', error);
        res.status(500).json({ error: 'Failed to delete deck' });
    }
});

//openAI API logic
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/generate-flashcards', async (req, res) => {
    const { content } = req.body;
    
    console.log("Received request for content:", content);
    console.log("OpenAI API Key exists:", !!process.env.OPENAI_API_KEY);

  try {
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini", 
      messages: [
        {   
            role: "system", 
            content: "You are a helpful assistant that generates flashcard decks " + 
            "based on the user's topic of choice. For each card, create a term and a " +
            "definition. Add a mnemonic to the definition to help the user remember the term. " +
            "Generate a flashcard deck with about 10 to 15 cards in the following JSON format: " +
            "{" +
            "  \"name\": \"<deck name>\", " +
            "  \"description\": \"<description>\", " +
            "  \"cards\": [" +
            "    {" +
            "      \"term\": \"<term>\", " +
            "      \"definition\": \"<definition>\"" +
            "    }" +
            "  ]" +
            "}" +
            " Return ONLY the JSON, no additional text."
        },
        { 
            role: "user", 
            content: content 
        }],
      max_tokens: 1500,
    });

    const reply = chatResponse.choices[0].message.content;
    console.log("OpenAI response:", reply);
    
    // Parse the JSON response from OpenAI
    try {
      const parsedResult = JSON.parse(reply);
      res.json(parsedResult);
    } catch (parseError) {
      console.error("Failed to parse OpenAI response:", reply);
      res.status(500).json({ error: "Failed to parse AI response" });
    }
  } catch (error) {
    console.error("OpenAI error:", error.message);
    console.error("Full error:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
