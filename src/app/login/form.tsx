'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import { ROUTE_PATHS } from '@/routes';
import { generateCredentials } from '@/lib/utils';

export const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const callbackUrl = ROUTE_PATHS.PROTECTED.HOME;

  const onSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
      });
      if (!res?.ok) {
        setError('Invalid email or password');
        setLoading(false);
        return;
      }
      setError('');
      router.push(callbackUrl);
      return;
    } catch (error) {
      console.warn(error);
      setError('Something went wrong, try again later!');
      setLoading(false);
      return;
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleGenerateNew = () => {
    setFormValues(generateCredentials());
  };

  return (
    <form onSubmit={onSubmit}>
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        id='email'
        placeholder='Email'
        name='email'
        type='email'
        autoFocus
        value={formValues.email}
        onChange={handleChange}
        disabled={loading}
      />

      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        name='password'
        placeholder='Password'
        type='password'
        id='password'
        value={formValues.password}
        onChange={handleChange}
        disabled={loading}
      />

      {error && <Typography color='error'>{error}</Typography>}
      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <Button
          type='button'
          fullWidth
          variant='text'
          disabled={loading}
          size='large'
          onClick={handleGenerateNew}
        >
          Generate New
        </Button>
        <Button
          type='submit'
          fullWidth
          variant='outlined'
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} />}
          size='large'
        >
          Sign In
        </Button>
      </Box>
    </form>
  );
};
