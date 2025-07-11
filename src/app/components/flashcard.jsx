"use client";
import { Card, CardContent, Button, Typography} from '@mui/material';
import React, {useState} from 'react'; 

function Flashcard({term, description, onPrev, onNext}) {
  const [content, setContent] = useState(term);
  return (
    <Card sx={{justifyContent: 'center', alignContent: 'center'}}>
      <CardContent>
        <Typography variant="h1"> {content} </Typography>
      </CardContent>
      <Button onClick = {() => {content == term ? setContent(description) : setContent(term)}}> Flip </Button>
      <Button onClick= {onPrev}> Previous </Button>
      <Button onClick={onNext}>
        Next
      </Button>
    </Card>

  );
}

export default Flashcard;
