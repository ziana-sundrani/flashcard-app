"use client"; 
import {TextField, Box, Container, Button, Stack} from "@mui/material"
import {useState} from "react"
import FlashcardDeck from './FlashcardDeck.jsx';

function CreateCard() {
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState(''); 
  const [cards, setCards] = useState([]); 
  const handleAddCard = () => {
    const newCard = {term, definition}; 
    setCards(prev => [...prev, newCard]); 
    setTerm('');
    setDefinition('');
    console.log(cards);
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
      {cards.length > 0 && <FlashcardDeck cards={cards} />}
    
    </div>
  );
}

export default CreateCard