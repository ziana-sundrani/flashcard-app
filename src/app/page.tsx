import Image from "next/image";
import {Container} from '@mui/material'
import Flashcard from './components/flashcard.jsx'

export default function Home() {
  return (
       <Container>
            <Flashcard term={'term'} description={'description'} />
        </Container>
  );
}
