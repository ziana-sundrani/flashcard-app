
"use client"; 
import {Container, Typography, Grid, Card, CardContent, Box, Button, IconButton} from '@mui/material'
import Navbar from './components/NavBar'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DeleteIcon from '@mui/icons-material/Delete';


export default function Homepage() {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (!token) {
      router.replace('/login');
    }
    }, [router]);


  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://flashcard-app-1-34e10aa359c9.herokuapp.com/api";
        const response = await fetch(`${BASE_URL}/Decks`);
        if (response.ok) {
          const data = await response.json();
          setDecks(data);
        } else {
          console.error('Failed to fetch decks');
        }
      } catch (error) {
        console.error('Error fetching decks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDecks();
  }, []);

  const handleDeckClick = (deck) => {
    router.push(`/flashcards?deckID=${deck._id}`);
  };

  const handleCreateNew = () => {
    router.push('/createCards');
  };

  const handleGenerateNew = () => {
    router.push('/generateCards');
  };

  const handleDelete = async (deck) => {
    try {
      const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://flashcard-app-1-34e10aa359c9.herokuapp.com/api";
      const response = await fetch(`${BASE_URL}/Decks/${deck._id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        // Remove the deck from the UI
        setDecks(prevDecks => prevDecks.filter(d => d._id !== deck._id));
        console.log('Deck deleted successfully');
      } else {
        console.error('Failed to delete deck');
        alert('Failed to delete deck. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting deck:', error);
    }
  }

  return (
    <Container sx={{p: 4, bgcolor: 'secondary'}}>
      <Navbar />
      
      {/* Header Section */}
      <Box sx={{ mt: 10, mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" sx={{ mb: 2, fontWeight: 'bold' }}>
          My Decks
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {decks.length === 0 && !loading
            ? "You haven't created any flashcard decks yet. Start by creating your first deck!" 
            : `You have ${decks.length} deck${decks.length !== 1 ? 's' : ''} ready to study.`
          }
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center'}}>
          <Button 
            variant="contained" 
            size="large" 
            onClick={handleCreateNew}
            sx={{ mb: 4 }}
          >
            Create
          </Button>
          <Button 
            variant="contained" 
            size="large" 
            onClick={handleGenerateNew}
            sx={{ mb: 4 }}
          >
            Create with AI 
          </Button>

        </Box>
        
      </Box>

      {/* Loading State */}
      {loading && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography>Loading your decks...</Typography>
        </Box>
      )}

      {/* No Decks State */}
      {!loading && decks.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No decks found
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Create your first flashcard deck to get started!
          </Typography>
        </Box>
      )}

      {/* Decks Grid */}
      {!loading && decks.length > 0 && (
        <Grid container spacing={3} sx={{justifyContent: 'center'}}>
          {decks.map((deck) => (
            <Grid item xs={12} sm={6} md={4} key={deck._id}>
              <Card 
                sx={{ 
                  height: '100%',
                  width: '250px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  }
                }}
                onClick={() => handleDeckClick(deck)}
              >
                <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
                    {deck.name}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ mb: 2, flex: 1 }}
                  >
                    {deck.description}
                  </Typography>
                  
                  {/* Deck Stats */}
                  <Box sx={{ mt: 'auto', pt: 2, borderTop: '1px solid #f0f0f0' }}>
                    <Typography variant="caption" color="text.secondary">
                      {deck.cards?.length || 0} card{deck.cards?.length !== 1 ? 's' : ''}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
                      Created: {new Date(deck.createdAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <IconButton color= 'error' onClick={(event) => {event.stopPropagation(); handleDelete(deck)}}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

