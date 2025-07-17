"use client"; 
import * as React from 'react'
import {TextField, Typography, Box, Container, Grid, Card, Button, Stack} from "@mui/material"
import {useState} from "react"
import FlashcardDeck from './FlashcardDeck.jsx';
import {useRouter} from 'next/navigation'
import {IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import CheckIcon from '@mui/icons-material/Check';

function CreateCard({count, term = ' ', definition = ' ', onSaveCard, onDeleteCard, isSaved = false}) {
  const [newTerm, setNewTerm] = useState('');
  const [newDefinition, setNewDefinition] = useState('');

  const handleSaveCard = () => {
    if (newTerm && newDefinition) {
      onSaveCard(newTerm, newDefinition); 
    } else {
      alert('Please enter a term and definition');
    }
  }
  return (
    <Stack spacing={{ xs: 2, sm:10}} direction="row">
      <Container sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="h3">
            {count}
          </Typography>
          <Box sx={{display: 'flex', gap: 1}}>
            {!isSaved && (
              <IconButton onClick={handleSaveCard}>
                <CheckIcon label="Save Card" />
              </IconButton>
            )}
            <IconButton onClick={onDeleteCard}>
              <DeleteIcon />
            </IconButton>
          </Box>
          
        </Box>

        {/* Bottom: Term and Definition side-by-side */}
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <TextField
            fullWidth
            label="Term"
            value={isSaved ? term : newTerm}
            variant="outlined"
            onChange={(t) => setNewTerm(t.target.value)}
            margin="normal"
            color= {isSaved ? 'success' : 'primary'}
          />
          <TextField
            fullWidth
            label="Definition"
            value={isSaved ? definition : newDefinition}
            variant="outlined"
            onChange={(d) => setNewDefinition(d.target.value)}
            margin="normal"
          />
        </Box>
      </Container>
    </Stack>
  );
}

export default CreateCard