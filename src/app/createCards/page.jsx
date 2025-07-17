"use client"; 
import React from 'react';
import Navbar from '../components/NavBar';
import CardInput from '../components/CardInput';
import { Container, Button, Grid } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function CreateCards() {
  const [cards, setCards] = useState([]); 
  const router = useRouter(); 

  const handleSaveCard = (term, definition) => {
    const newCard = {term: term, definition: definition}; 
    setCards(prev => [...prev, newCard]); 
  }

  const handleDeleteCard = () => {
    setCards(prev => prev.filter((_, index) => index !== count - 1));
  }

  const handleFlashcardMode = () => {
  localStorage.setItem('cards', JSON.stringify(cards));
  router.push('/flashcards');
  }

return (
  <Container sx={{p:10, bgcolor: 'secondary'}}>
      <Navbar />
       <Grid spacing= {5}>
      {
        cards.map((card, index) => (
            <CardInput key={index} count={cards.length > 0 ? index + 1 : 1} term={card.term} definition={card.definition} onSaveCard={handleSaveCard} onDeleteCard={handleDeleteCard} isSaved={true} />
        ))
      }
      </Grid>
    <CardInput count={cards.length > 0 ? cards.length + 1 : 1} onSaveCard={handleSaveCard} onDeleteCard={handleDeleteCard} isSaved={false} />
    <Button onClick= {handleFlashcardMode}> Flash Card Mode </Button>
  </Container>
    
);
}