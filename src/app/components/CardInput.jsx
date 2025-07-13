"use client"; 
import * as React from 'react'
import {TextField, Typography, Box, Container, Grid, Card, Button, Stack} from "@mui/material"
import {useState} from "react"
import FlashcardDeck from './FlashcardDeck.jsx';
import {useRouter} from 'next/navigation'

function CreateCard() {
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState(''); 
  const [cards, setCards] = useState([]); 
  const router = useRouter() 

  const handleAddCard = () => {
    const newCard = {term: term, definition: definition}; 
    setCards(prev => [...prev, newCard]); 
    setTerm('');
    setDefinition('');
  }
  
  const handleFlashcardMode = () => {
    localStorage.setItem('cards', JSON.stringify(cards));
    console.log(cards)
    router.push('/flashcards');

  }

  return (
    <div>
      <Stack spacing={{ xs: 2, sm:10}} direction="row">
      <TextField label="Term" 
                  value={term} 
                  variant="outlined"
                  onChange={(t) => setTerm(t.target.value)}
                  margin="normal"
                  />
      <TextField label="Definition" 
                  value={definition}
                  variant="outlined" 
                  maxRows={5}
                  onChange={(d)=> setDefinition(d.target.value)}
                  margin="normal"/>
      </Stack>
      <Button onClick= {handleAddCard}> Add Card </Button>
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
      <Button onClick= {handleFlashcardMode}> Flash Card Mode </Button>
    </div>
  );
}

export default CreateCard