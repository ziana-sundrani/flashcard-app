'use client';
import {Container, IconButton, Typography, Box} from '@mui/material'
import FlashcardDeck from '../components/FlashcardDeck.jsx';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from "next/navigation";
import Navbar from '../components/NavBar';

interface DeckProps {
  deckName: string;
}

export default function Deck({ deckName }: DeckProps) {
  const router = useRouter();
  
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Navbar />
      
      {/* Back to Decks Button */}
      <Container sx={{ pt: 2 }}>
        <IconButton 
          onClick={() => router.push('/')}
          sx={{ 
            mb: 2,
            border: '1px solid',
            borderColor: 'grey.300',
            '&:hover': {
              backgroundColor: 'grey.100'
            }
          }}
        >
          <ArrowBackIcon sx={{ mr: 1 }} />
          <Typography variant="body2">Back to Decks</Typography>
        </IconButton>
      </Container>
      
      <FlashcardDeck deckName={deckName} />
    </Box>
  );
}
