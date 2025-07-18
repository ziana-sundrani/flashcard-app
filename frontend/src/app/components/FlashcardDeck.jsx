"use client"; 
import { Box, IconButton, Typography, Container, Card, CardContent} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React, {useState, useEffect} from 'react'; 
import Flashcard from './flashcard/flashcard.jsx'
import { useSearchParams } from 'next/navigation';

function FlashcardDeck(deck) {
    const [index, setIndex] = useState(0); 
    const[cards, setCards] = useState([]);
   
    // Get correct deck from db
    useEffect(() => {
        const getDeck = async () => {
            const response = await fetch(`http://localhost:3001/api/Decks/${deck._id}`);
            const data = await response.json();
            setCards(data.cards);
        }
        getDeck();
    }, cards)
    
    const hasNext = () => index + 1 < cards.length; 
    const hasPrev = () => index - 1 >= 0;
    const handleNext = () => {
        hasNext() ? setIndex(index + 1) : alert("no more cards in deck");
    }
    const handlePrev = () => {
        hasPrev() ? setIndex(index - 1) : alert("no previous cards"); 
    }

    // if (loading) {
    //     return (
    //         <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
    //             <Typography variant="h5">Loading flashcards...</Typography>
    //         </Container>
    //     );
    // }

    if (cards.length === 0) {
        return (
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
        );
    }

    const validIndex = Math.min(index, cards.length - 1);

    return (
        <Container sx={{ py: 4 }}>
            {/* Deck Title and Progress */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {deckName}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Card {validIndex + 1} of {cards.length}
                </Typography>
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
                <Box sx={{ flex: '0 0 auto', maxWidth: 600, width: '100%' }}>
                    <Flashcard
                        term={cards[validIndex].term}
                        definition={cards[validIndex].definition}
                    />
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
                    height: 8, 
                    backgroundColor: 'grey.200', 
                    borderRadius: 4,
                    overflow: 'hidden'
                }}>
                    <Box sx={{ 
                        width: `${((validIndex + 1) / cards.length) * 100}%`, 
                        height: '100%', 
                        backgroundColor: 'primary.main',
                        transition: 'width 0.3s ease'
                    }} />
                </Box>
            </Box>
        </Container>
    );
}

export default FlashcardDeck;