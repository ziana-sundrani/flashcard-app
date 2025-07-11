"use client";
import { Card, CardContent, Button, Typography} from '@mui/material';
import React, {useState} from 'react'; 

function Flashcard({term, description, onPrev, onNext}) {
  const [flipped, setFlipped]= useState(false); 
  return (
    <Card sx={{justifyContent: 'center', alignContent: 'center'}}>
      <CardContent>
        <Typography variant="h1"> {flipped ? description : term} </Typography>
      </CardContent>
      <Button onClick = {()=> setFlipped(!flipped)}> Flip </Button>
      <Button onClick= {onPrev}> 
        Previous 
        </Button>
      <Button onClick={onNext}>
        Next
      </Button>
    </Card>

  );
}

export default Flashcard;
