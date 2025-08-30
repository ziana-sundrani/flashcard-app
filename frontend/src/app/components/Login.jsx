"use client"; 
import { Typography, Button, Card, TextField } from '@mui/material';
import React, { useState } from 'react'; 
import { useRouter } from 'next/navigation';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogIn = async () => {
    const user = { email, password };

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        router.push('/');
      } else {
        alert('Email or password is incorrect. Please try again or sign up for an account');
      }
    } catch (err) {
      alert('An error occurred while logging in. Please try again.');
    }
  };

  const handleSignUp = () => {
    router.push('/signup');
  };

  return (
    <Card style={{ padding: '2rem', maxWidth: '400px', margin: '3rem auto' }}>
      <Typography variant="h5" gutterBottom>
        Welcome Back
      </Typography>
      <Typography variant="body1" gutterBottom>
        Sign into your flashcards account
      </Typography>
      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        variant="outlined"
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleLogIn}
        style={{ marginTop: '1rem' }}
      >
        Sign In
      </Button>
      <Typography variant="body2" align="center" style={{ marginTop: '1rem' }}>
        Don’t have an account?{' '}
        <Button color="secondary" onClick={handleSignUp}>
          Sign up
        </Button>
      </Typography>
    </Card>
  );
}

export default Login;