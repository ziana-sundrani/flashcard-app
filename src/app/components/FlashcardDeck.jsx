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
    }
    const handlePrev = () => {
        hasPrev() ? setIndex(index - 1) : alert("no previous cards"); 
    }

    if(!cards) {
        console.log(index)
        return (
            <Flashcard 
            term= "No cards in this deck yet"
            description= "Please enter card"
            onNext= {handleNext}
            onPrev= {handlePrev}
            />
        )
    } else {
            console.log(index); 
            return (
            <Flashcard
            term= {cards[index].term}
            description= {cards[index].description}
            onNext= {handleNext}
            onPrev= {handlePrev}
            />
            ); 
    }
}

export default FlashcardDeck;