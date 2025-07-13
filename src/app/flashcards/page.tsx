'use client';
import Image from "next/image";
import {Container, Typography} from '@mui/material'
import FlashcardDeck from '../components/FlashcardDeck.jsx';

const card1 = {term: "T1", definition: "D1"};
const card2 = {term: "T2", definition: "D2"};
const card3 = {term: "T3", definition: "D3"};
const cards = [card1, card2, card3]

export default function Home() {

  return (
       <Container>
            <FlashcardDeck />
        </Container>
  );
}
