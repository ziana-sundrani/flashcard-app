"use client"; 
import { Card, CardContent, Typography} from '@mui/material';
import React, {useState} from 'react'; 
import Flashcard from './flashcard'

function FlashcardDeck({cards}) {
    const [index, setIndex] = useState(0); 
    const hasNext = () => index + 1 < cards.length; 
    const hasPrev = () => index - 1 >= 0;
    const handleNext = () => {
        hasNext() ? setIndex(index + 1) : alert("no more cards in deck");
        return renderCard();
    }
    const handlePrev = () => {
        hasPrev() ? setIndex(index - 1) : alert("no previous cards"); 
        return renderCard();

    }

    const renderCard = () => { if(!cards) {
        return (
            <Flashcard 
            term= "No cards in this deck yet"
            description= "Please enter card"
            onNext= {handleNext}
            onPrev= {handlePrev}
            />
        )
        
    } else {
        const currCard = cards[index];
        return (
        <Flashcard
        term= {currCard.term}
        description= {currCard.description}
        onNext= {handleNext}
        onPrev= {handlePrev}
        />
        ); 
    }}
    
    return renderCard();
   
}

export default FlashcardDeck;