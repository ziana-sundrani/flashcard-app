"use client";
import styles from './flashcard.css';
import { Card, CardContent, Button, Typography, IconButton} from '@mui/material';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import React, {useState} from 'react'; 

function Flashcard({term, definition, onPrev, onNext}) {
  const [flipped, setFlipped]= useState(false); 
  return (
    <Card sx={{justifyContent: 'center', alignContent: 'center'}} onClick={() => setFlipped(!flipped)} aria-label="flip"  className= "flashcard">
      <CardContent>
        <Typography variant="h3"> {flipped ? definition : term} </Typography>
      </CardContent>

      <div className= "bottomButtons">
        <Button onClick= {onPrev}> 
          Previous 
          </Button>
        <Button onClick={onNext}>
          Next
        </Button>
      </div>
    </Card>

  );
}

export default Flashcard;
