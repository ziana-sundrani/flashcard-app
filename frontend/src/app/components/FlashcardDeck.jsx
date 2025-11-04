"use client"; 
import { Box, IconButton, Typography, Container, Card, CardContent, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import React, {useState, useEffect} from 'react'; 
import Flashcard from './flashcard/flashcard.jsx';
import { useSearchParams } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';

function FlashcardDeck() {
    const[index, setIndex] = useState(0); 
    const[cards, setCards] = useState([]);
    const[name, setName] = useState('');
    const[description, setDescription] = useState('');
    const[isEditMode, setIsEditMode] = useState(false);
    const[editingCard, setEditingCard] = useState(null);
    const[editDialogOpen, setEditDialogOpen] = useState(false);
    const[editTerm, setEditTerm] = useState('');
    const[editDefinition, setEditDefinition] = useState('');
    const searchParams = useSearchParams();
    const deckID = searchParams.get('deckID'); //get deckID from url
    const router = useRouter();
   
    // Get correct deck from db
    useEffect(() => {
        const getDeck = async () => {
            const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://flashcard-app-1-34e10aa359c9.herokuapp.com/api";
            const response = await fetch(`${BASE_URL}/Decks/${deckID}`);
            const data = await response.json();
            setCards(data.cards || []);
            setName(data.name || '');
            setDescription(data.description || '');
        }
        if (deckID) {
            getDeck();
        }
    }, [deckID])
    
    const hasNext = () => index + 1 < cards.length; 
    const hasPrev = () => index - 1 >= 0;
    const handleNext = () => {
        hasNext() ? setIndex(index + 1) : alert("no more cards in deck");
    }
    const handlePrev = () => {
        hasPrev() ? setIndex(index - 1) : alert("no previous cards"); 
    }

    const handleEditCard = (cardIndex) => {
        const card = cards[cardIndex];
        setEditingCard(cardIndex);
        setEditTerm(card.term);
        setEditDefinition(card.definition);
        setEditDialogOpen(true);
    }

    const handleSaveEdit = async () => {
        if (!editTerm.trim() || !editDefinition.trim()) {
            alert('Please enter both term and definition');
            return;
        }

        const updatedCards = [...cards];
        updatedCards[editingCard] = {
            term: editTerm,
            definition: editDefinition
        };
        setCards(updatedCards);
        setEditDialogOpen(false);
        setEditingCard(null);
    }
    
    const handleSaveDeck = async () => {
        if (!deckID) {
            alert('Error: Deck ID is missing. Please try reloading the page.');
            return;
        }
        
        try {
            const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://flashcard-app-1-34e10aa359c9.herokuapp.com/api';
            const url = `${BASE_URL}/Decks/${deckID}`;
            console.log('Saving deck to:', url);
            console.log('Deck ID:', deckID);
            console.log('Deck data:', { name, description, cards: cards.length });
            
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, description, cards }),
            });

            console.log('Response status:', response.status);
            
            if (response.ok) {
                const updatedDeck = await response.json();
                setCards(updatedDeck.cards || []);
                setName(updatedDeck.name || '');
                setDescription(updatedDeck.description || '');
                setIsEditMode(false);
                alert('Deck saved successfully!');
            } else {
                const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
                console.error('Save failed:', response.status, errorData);
                alert(`Failed to save deck: ${errorData.error || 'Please try again.'}`);
            }
        } catch (error) {
            console.error('Error saving deck:', error);
            alert('Error saving deck. Please check your connection.');
        }
    }

    const handleCancelEdit = () => {
        setEditDialogOpen(false);
        setEditingCard(null);
        setEditTerm('');
        setEditDefinition('');
    }

    if (cards.length === 0) {
        return (
            <Container sx={{ py: 4}}>
                    <IconButton  onClick={() => router.push('/')}>
                    <Typography> View All Decks </Typography>
                    <ArrowBackIcon />
                </IconButton>
            
                <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                    <Card sx={{ p: 4, textAlign: 'center', minWidth: 400, minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CardContent>
                            <Typography variant="h4" gutterBottom>No cards in this deck yet</Typography>
                            <Typography variant="body1" color="text.secondary">
                                Go back to create some flashcards!
                            </Typography>
                        </CardContent>
                    </Card>
                </Container>
            </Container>
        );
    }

    return (
        <Container sx={{ py: 4 }}>
            {/* Deck Title and Progress */}
            <Box sx={{ textAlign: 'center', mb: 4, display: 'flex', alignItems: 'center', gap: 2}}>
                <IconButton sx = {{justifyContent: 'flex-start'}} onClick={() => router.push('/')}>
                    <ArrowBackIcon />
                    <Typography> View All Decks </Typography>
                </IconButton>
                <Typography variant="h4" component="h1" gutterBottom sx={{flex: 1}}>
                    {name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Card {index + 1} of {cards.length}
                </Typography>
                {!isEditMode ? (
                    <IconButton 
                        onClick={() => setIsEditMode(true)}
                        sx={{ 
                            bgcolor: 'primary.main',
                            color: 'white',
                            '&:hover': { bgcolor: 'primary.dark' }
                        }}
                    >
                        <EditIcon />
                    </IconButton>
                ) : (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton 
                            onClick={handleSaveDeck}
                            sx={{ 
                                bgcolor: 'success.main',
                                color: 'white',
                                '&:hover': { bgcolor: 'success.dark' }
                            }}
                            title="Save changes"
                        >
                            <SaveIcon />
                        </IconButton>
                        <IconButton 
                            onClick={() => {
                                // Reload deck to discard changes
                                const getDeck = async () => {
                                    const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://flashcard-app-1-34e10aa359c9.herokuapp.com/api';
                                    const response = await fetch(`${BASE_URL}/Decks/${deckID}`);
                                    const data = await response.json();
                                    setCards(data.cards || []);
                                    setName(data.name || '');
                                    setDescription(data.description || '');
                                }
                                getDeck();
                                setIsEditMode(false);
                            }}
                            sx={{ 
                                bgcolor: 'grey.600',
                                color: 'white',
                                '&:hover': { bgcolor: 'grey.700' }
                            }}
                            title="Cancel editing"
                        >
                            <CancelIcon />
                        </IconButton>
                    </Box>
                )}
            </Box>

            {/* Flashcard with Side Navigation */}
            <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: 4,
                minHeight: '50vh'
            }}>
                {/* Previous Arrow */}
                <IconButton 
                    onClick={handlePrev}
                    disabled={!hasPrev()}
                    sx={{ 
                        width: 60, 
                        height: 60,
                        border: '2px solid',
                        borderColor: hasPrev() ? 'primary.main' : 'grey.300',
                        '&:hover': {
                            backgroundColor: 'primary.light',
                            transform: 'scale(1.1)'
                        },
                        transition: 'all 0.2s'
                    }}
                >
                    <ArrowBackIosIcon sx={{ fontSize: 30 }} />
                </IconButton>

                {/* Flashcard */}
                <Box sx={{ flex: '0 0 auto', maxWidth: 600, width: '100%', position: 'relative' }}>
                    <Flashcard
                        key={index}
                        term={cards[index].term}
                        definition={cards[index].definition}
                    />
                    {isEditMode && (
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                            <Button
                                variant="contained"
                                startIcon={<EditIcon />}
                                onClick={() => handleEditCard(index)}
                                sx={{ bgcolor: 'primary.main' }}
                            >
                                Edit Card
                            </Button>
                        </Box>
                    )}
                </Box>

                {/* Next Arrow */}
                <IconButton 
                    onClick={handleNext}
                    disabled={!hasNext()}
                    sx={{ 
                        width: 60, 
                        height: 60,
                        border: '2px solid',
                        borderColor: hasNext() ? 'primary.main' : 'grey.300',
                        '&:hover': {
                            backgroundColor: 'primary.light',
                            transform: 'scale(1.1)'
                        },
                        transition: 'all 0.2s'
                    }}
                >
                    <ArrowForwardIosIcon sx={{ fontSize: 30 }} />
                </IconButton>
            </Box>

                {/* Progress Bar */}
            <Box sx={{ mt: 4, mx: 'auto', maxWidth: 400 }}>
                <Box sx={{ 
                    width: '100%', 
                    height: 10, 
                    backgroundColor: 'grey.200', 
                    borderRadius: 5,
                    overflow: 'hidden',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    <Box sx={{ 
                        width: `${((index + 1) / cards.length) * 100}%`, 
                        height: '100%', 
                        backgroundColor: 'primary.main',
                        transition: 'width 0.3s ease',
                        borderRadius: 5
                    }} />
                </Box>
            </Box>

            {/* Edit Dialog */}
            <Dialog open={editDialogOpen} onClose={handleCancelEdit} maxWidth="sm" fullWidth>
                <DialogTitle>Edit Flashcard</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Term"
                        fullWidth
                        variant="outlined"
                        value={editTerm}
                        onChange={(e) => setEditTerm(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="dense"
                        label="Definition"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        value={editDefinition}
                        onChange={(e) => setEditDefinition(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelEdit} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveEdit} variant="contained" color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default FlashcardDeck;