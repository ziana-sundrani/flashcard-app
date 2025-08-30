"use client"; 
import { Typography, Button, Card, TextField } from '@mui/material';
import React, { useState } from 'react'; 
import { useRouter } from 'next/navigation';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    const user = { username, email, password };

    try {
      const response = await fetch('http://localhost:3001/api/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        router.push('/');
      } else {
        alert('Email already registered. Please use a different email or log-in');
      }
    } catch (err) {
      alert('An error occurred while signing up. Please try again.');
    }
  };

  const handleLogIn = () => {
    router.push('/login');
  }

  return (
    <Card style={{ padding: '2rem', maxWidth: '400px', margin: '3rem auto' }}>
      <Typography variant="body1" gutterBottom>
        Sign up for your GoCards account
      </Typography>
      <TextField
        fullWidth
        label="Username"
        variant="outlined"
        onChange={(e) => setUsername(e.target.value)}
        margin="normal"
      />
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
        onClick={handleSubmit}
        style={{ marginTop: '1rem' }}
      >
        Sign Up
      </Button>
      <Typography variant="body2" align="center" style={{ marginTop: '1rem' }}>
        Already have an account?{' '}
        <Button color="secondary" onClick={handleLogIn}>
          Log In
        </Button>
      </Typography>
    </Card>
  );
}

export default Signup;