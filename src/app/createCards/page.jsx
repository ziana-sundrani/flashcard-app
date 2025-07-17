import React from 'react';
import Navbar from '../components/NavBar';
import CardInput from '../components/CardInput';
import { Container } from '@mui/material';

export default function CreateCards() {

  return (
    <Container sx={{p:10, bgcolor: 'secondary'}}>
        <Navbar />
        <CardInput />
    </Container>
      
  );
}