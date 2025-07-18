const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
