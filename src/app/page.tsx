import Image from "next/image";
import {Container, Typography} from '@mui/material'
import Flashcard from './components/flashcard.jsx'
import FlashcardDeck from './components/FlashcardDeck.jsx';

const card1 = {term: "T1", description: "D1"};
const card2 = {term: "T2", description: "D2"};
const card3 = {term: "T3", description: "D3"};
const cards = [card1, card2, card3]

export default function Home() {
  return (
      //  <Container>
      //       <FlashcardDeck cards= {cards}/>
      //       <Typography> Hello </Typography>
      //   </Container>
      <div> Hello</div>
  );
}
