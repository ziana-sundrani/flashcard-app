"use client"; 
import * as React from 'react'
import {TextField, Typography, Box, Container, Grid, Card, Button, Stack} from "@mui/material"
import {useState} from "react"
import FlashcardDeck from './FlashcardDeck.jsx';
import {useRouter} from 'next/navigation'
import {IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveAsIcon from '@mui/icons-material/SaveAs';

function CreateCard({count}) {
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState(''); 

  return (
    <Stack spacing={{ xs: 2, sm:10}} direction="row">
      <Container sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="h3">
            {count}
          </Typography>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Box>

        {/* Bottom: Term and Definition side-by-side */}
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <TextField
            fullWidth
            label="Term"
            value={term}
            variant="outlined"
            onChange={(t) => setTerm(t.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Definition"
            value={definition}
            variant="outlined"
            onChange={(d) => setDefinition(d.target.value)}
            margin="normal"
          />
        </Box>
      </Container>
    </Stack>
  );
}

export default CreateCard