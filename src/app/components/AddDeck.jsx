import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

function CreateDeck(cards) {
    const [cards, setCards] = useState([]); 
    const [count, setCount] = useState(1); 
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
    <div> 
       <Button onClick= {handleAddCard}> Add Card </Button>
      {/* <Grid spacing= {5}>
      {
        cards.map((card, index) => (
            <Card key={index}>
            <Typography> Term: {card.term}</Typography>
            <Typography> Definition: {card.definition}</Typography>
          </Card>
        ))
      }
      </Grid> */}
      <Button onClick= {handleFlashcardMode}> Flash Card Mode </Button>
   

    </div>

  );
}