"use client";
import { Card, CardContent, CardActionArea, Typography} from '@mui/material';
import React, {useState} from 'react'; 

function Flashcard({term, description}) {
  const [content, setContent] = useState(term);
  return (
    <Card sx={{justifyContent: 'center', alignContent: 'center'}} onClick={() => {content == term ? setContent(description) : setContent(term)}}>
      <CardContent>
        <Typography variant="h1"> {content} </Typography>
      </CardContent>
    </Card>

  );
}

export default Flashcard;
