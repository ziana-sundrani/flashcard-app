"use client"; 
import * as React from 'react'
import {TextField, Typography, Box} from "@mui/material"
import {useState} from "react"
import {IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';

function CreateCard({count, term = '', definition = '', onSaveCard, onDeleteCard, isSaved = false}) {
  const [newTerm, setNewTerm] = useState('');
  const [newDefinition, setNewDefinition] = useState('');

  const handleSaveCard = () => {
    if (newTerm.trim() && newDefinition.trim()) {
      onSaveCard(newTerm, newDefinition);
      setNewTerm('');
      setNewDefinition('');
    } else {
      alert('Please enter a term and definition');
    }
  }
  return (
    <Box sx={{ 
      width: '100%', 
      p: 2, 
      border: '1px solid #ccc', 
      borderRadius: 2, 
      mb: 2,
      backgroundColor: isSaved ? '#f8f9fa' : '#ffffff'
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="h3">
          {count}
        </Typography>
        <Box sx={{display: 'flex', gap: 1}}>
          {!isSaved && (
            <IconButton onClick={handleSaveCard}>
              <CheckIcon />
            </IconButton>
          )}
          {isSaved && (
            <IconButton onClick={onDeleteCard}>
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      </Box>

      {/* Bottom: Term and Definition side-by-side */}
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <TextField
          fullWidth
          label="Term"
          value={isSaved ? term : newTerm}
          variant="outlined"
          onChange={(e) => setNewTerm(e.target.value)}
          margin="normal"
          disabled={isSaved}
          sx={isSaved ? { backgroundColor: '#f5f5f5' } : {}}
        />
        <TextField
          fullWidth
          label="Definition"
          value={isSaved ? definition : newDefinition}
          variant="outlined"
          onChange={(e) => setNewDefinition(e.target.value)}
          margin="normal"
          disabled={isSaved}
          sx={isSaved ? { backgroundColor: '#f5f5f5' } : {}}
        />
      </Box>
    </Box>
  );
}

export default CreateCard