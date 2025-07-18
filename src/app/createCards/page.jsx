"use client"; 
import React from 'react';
import Navbar from '../components/NavBar';
import CardInput from '../components/CardInput';
import { Container, Button, Grid, TextField, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SaveAsIcon from '@mui/icons-material/SaveAs';


export default function CreateCards() {
  const [deckName, setDeckName] = useState('');
  const [deckDescription, setDeckDescription] = useState('');
  const [cards, setCards] = useState([]); 
  const router = useRouter(); 

  const handleSaveCard = (term, definition) => {
    const newCard = {term: term, definition: definition}; 
    setCards(prev => [...prev, newCard]); 
  }

  const handleDeleteCard = (indexToDelete) => {
    setCards(prev => prev.filter((_, index) => index !== indexToDelete));
  }

  const handleFlashcardMode = () => {
  localStorage.setItem('cards', JSON.stringify(cards));
  router.push('/flashcards');
  }

return (
  <Container sx={{p:10, bgcolor: 'secondary', justifyContent: 'space-between' }}>
       <Navbar />
       {/* Title and Description Row */}
       <Container sx={{display: 'flex', flexDirection: 'column', gap: 1, mb: 3}}>
         <TextField
            fullWidth
            label="Deck Name"
            value={deckName}
            variant="filled"
            onChange={(e) => setDeckName(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            value={deckDescription}
            variant="standard"
            onChange={(e) => setDeckDescription(e.target.value)}
            margin="normal"
          />
       </Container>
       
       {/* Create Deck Button Row */}
       <Container sx={{display: 'flex', justifyContent: 'flex-end', mb: 5}}>
         <IconButton 
           onClick={handleFlashcardMode}
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
       
       <Grid sx= {{justifyContent: 'space-between'}} spacing= {5}>
      {
        cards.map((card, index) => (
            <CardInput key={index} count={index + 1} term={card.term} definition={card.definition} onSaveCard={handleSaveCard} onDeleteCard={() => handleDeleteCard(index)} isSaved={true} />
        ))
      }
      </Grid>
    <CardInput count={cards.length + 1} onSaveCard={handleSaveCard} onDeleteCard={() => {}} isSaved={false} />
    
  </Container>
    
);
}