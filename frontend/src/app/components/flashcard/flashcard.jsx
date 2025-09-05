"use client";
import styles from './flashcard.css';
import { Card, CardContent, Typography, Box} from '@mui/material';
import React, {useState} from 'react'; 

function Flashcard({term, definition}) {
  const [flipped, setFlipped] = useState(false); 
  
  return (
    <Card 
      onClick={() => setFlipped(!flipped)} 
      aria-label="flip flashcard"  
      sx={{
        minHeight: 400,
        minWidth: 300,
        width: '100%',
        maxWidth: 600,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.6s, box-shadow 0.3s',
        transformStyle: 'preserve-3d',
        boxShadow: 3,
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-2px)'
        },
        border: '1px solid',
        borderColor: flipped ? 'primary.main' : 'grey.300'
      }}
    >
      <CardContent sx={{ 
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        p: 4
      }}>
        <Box>
          <Typography 
            variant="h4" 
            component="div"
            sx={{ 
              lineHeight: 1.2,
              wordBreak: 'break-word'
            }}
          >
            {flipped ? definition : term}
          </Typography>
          
          {/* Flip indicator */}
          <Typography 
            variant="caption" 
            sx={{ 
              mt: 3, 
              display: 'block',
              opacity: 0.7
            }}
          >
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default Flashcard;
