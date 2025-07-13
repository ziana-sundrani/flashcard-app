"use client"; 
import { Card, CardContent, Typography} from '@mui/material';
import React, {useState, useEffect} from 'react'; 
import Flashcard from './Flashcard.jsx'

function FlashcardDeck() {
    const [index, setIndex] = useState(0); 
    const[cards, setCards] = useState([]);
    useEffect(() => {
        const saved = localStorage.getItem("cards");
        const initialValue = JSON.parse(saved);
        setCards(initialValue || []);
        console.log(cards);
    }, cards)
    
    const hasNext = () => index + 1 < cards.length; 
    const hasPrev = () => index - 1 >= 0;
    const handleNext = () => {
        hasNext() ? setIndex(index + 1) : alert("no more cards in deck");
    }
    const handlePrev = () => {
        hasPrev() ? setIndex(index - 1) : alert("no previous cards"); 
    }

    const addCard = (t, d) => {cards.push({term: t, definition: d})}

    if(cards.length == 0) {
        return (
            <Flashcard 
            term= "No cards in this deck yet"
            definition= "Please enter card"
            onNext= {handleNext}
            onPrev= {handlePrev}
            />
        )
    } else {
            return (
            <Flashcard
            term= {cards[index].term}
            definition= {cards[index].definition}
            onNext= {handleNext}
            onPrev= {handlePrev}
            />

            //  <Flashcard 
            // term= "No cards in this deck yet"
            // definition= "Please enter card"
            // onNext= {handleNext}
            // onPrev= {handlePrev}
            // />
            ); 
    }
}

export default FlashcardDeck;