"use client";
import {useState} from 'react';
import {Container, TextField, Button, Typography, Box, IconButton, Grid} from '@mui/material';
import {useRouter} from 'next/navigation';
import Navbar from '../components/NavBar';
import CardInput from '../components/CardInput';
import SaveAsIcon from '@mui/icons-material/SaveAs';

export default function GenerateCards() {
    const [prompt, setPrompt] = useState('');
    const [cards, setCards] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    
    const handleSubmit = async () => {
        if (!prompt.trim()) {
            alert('Please enter a topic!');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('http://localhost:3001/api/generate-flashcards', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({content: prompt}),
            });
            
            const data = await response.json();
            setCards(data.cards);
            setName(data.name);
            setDescription(data.description);
            setSubmitted(true);
        } catch (error) {
            console.error('Error generating cards:', error);
            alert('Error generating cards. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveDeck = async () => {
        const deck = {name: name, description: description, cards: cards};
            
        try {
            const response = await fetch('http://localhost:3001/api/Decks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(deck),
            });
            
            if (response.ok) {
                const savedDeck = await response.json();
                console.log('Deck created successfully:', savedDeck);
                router.push(`/flashcards?deckID=${savedDeck._id}`);
            } else {
                console.error('Failed to save deck');
                alert('Failed to save deck. Please try again.');
            }
        } catch (error) {
            console.error('Error saving deck:', error);
            alert('Error saving deck. Please check your connection.');
        }
    };

    // Added missing functions with proper types
    const handleSaveCard = (term: string, definition: string) => {
        // Not needed for generated cards, but required for CardInput component
        console.log('Card saved:', term, definition);
    };

    const handleDeleteCard = (index: number) => {
        setCards(prevCards => prevCards.filter((_, i) => i !== index));
    };

    return (
        <Container sx={{p:10, bgcolor: 'secondary', justifyContent: 'space-between' }}>
            <Navbar />
            {!submitted && (
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
                        Generate Flashcards with AI
                    </Typography>
                    
                    <TextField 
                        fullWidth 
                        label="What would you like to learn?" 
                        value={prompt} 
                        onChange={(e) => setPrompt(e.target.value)} 
                        margin="normal"
                        placeholder="e.g., Spanish vocabulary, Biology terms, History facts"
                        multiline
                        rows={3}
                        sx={{ mb: 3 }}
                    />
                    
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleSubmit}
                        disabled={loading || !prompt.trim()}
                        size="large"
                    >
                        {loading ? 'Generating Cards...' : 'Generate Cards'}
                    </Button>
                </Box>
            )}

            {submitted && (
                <Box>
                    {/* Create name and description row */}
                    <Container sx={{display: 'flex', flexDirection: 'column', gap: 1, mb: 3}}>
                        <TextField
                            fullWidth
                            label="Deck Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            variant="filled"
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            variant="standard"
                            margin="normal"
                        />
                    </Container>
                    
                    {/* Create Deck Button Row */}
                    <Container sx={{display: 'flex', justifyContent: 'flex-end', mb: 5}}>
                        <IconButton 
                            onClick={handleSaveDeck}
                            sx={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'center',
                                p: 2,
                                border: '1px solid #ccc',
                                borderRadius: 2,
                                '&:hover': {
                                    backgroundColor: '#f5f5f5'
                                }
                            }}
                        >
                            <SaveAsIcon sx={{ fontSize: 30, mb: 1 }} />
                            <Typography variant="caption">Create Deck</Typography>
                        </IconButton>
                    </Container>
                    
                    {/* Generated Cards */}
                    <Typography variant="h5" sx={{ mb: 3 }}>
                        Generated Cards ({cards.length})
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {cards.map((card, index) => (
                            <CardInput 
                                key={index}
                                count={index + 1}
                                term={(card as { term: string }).term}
                                definition={(card as { definition: string }).definition}
                                onSaveCard={handleSaveCard}
                                onDeleteCard={() => handleDeleteCard(index)}
                                isSaved={true}
                            />
                        ))}
                    </Box>     
                </Box>
            )}
        </Container>
    );
}