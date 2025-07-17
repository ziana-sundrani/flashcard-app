"use client"; 
import * as React from 'react'
import {TextField, Typography, Box, Container, Grid, Card, Button, Stack} from "@mui/material"
import {useState} from "react"
import FlashcardDeck from './FlashcardDeck.jsx';
import {useRouter} from 'next/navigation'
import DeleteIcon from '@mui/icons-material/Delete';

function CreateCard() {
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState(''); 
  const [cards, setCards] = useState([]); 
  const router = useRouter() 
  const [count, setCount] = useState(1);

  const handleAddCard = () => {
    const newCard = {term: term, definition: definition}; 
    setCards(prev => [...prev, newCard]); 
    setTerm('');
    setDefinition('');
    setCount(count + 1);
  }
  
  const handleFlashcardMode = () => {
    localStorage.setItem('cards', JSON.stringify(cards));
    console.log(cards)
    router.push('/flashcards');

  }

  return (
    <div>
      <Stack spacing={{ xs: 2, sm:10}} direction="row">
        <Container sx={{display: 'flex', flexDirection: 'column', border: "2px solid rgb(0, 0, 0)", p:10, bgcolor: 'secondary'}}>
          <Box sx={{display: 'flex', alignItems: 'center', gap: 20}}>
            <Typography variant="h4" component="h3" gutterBottom>
              {count}
            </Typography>
            <DeleteIcon /> 
          </Box>
          <Box sx={{display: 'flex', gap: 2}}>
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
          </Box>
        </Container>

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