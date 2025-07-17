"use client"; 
import React from 'react';
import Navbar from '../components/NavBar';
import CardInput from '../components/CardInput';
import { Container, Button, Grid } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function CreateCards() {
  const [count, setCount] = useState(1); 
  const [cards, setCards] = useState([]); 
  const router = useRouter(); 

  const handleAddCard = () => {
  const newCard = {term: term, definition: definition}; 
  setCards(prev => [...prev, newCard]); 
  setCount(count + 1);
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
            <Card key={index}>
            <Typography> Term: {card.term}</Typography>
            <Typography> Definition: {card.definition}</Typography>
          </Card>
        ))
      }
      </Grid>
      <CardInput count={count} />
      <Button onClick= {handleAddCard}> Add Card </Button>
    <Button onClick= {handleFlashcardMode}> Flash Card Mode </Button>
  </Container>
    
);
}