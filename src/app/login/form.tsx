'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
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
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const searchParams = useSearchParams();
  const callbackUrl =
    searchParams.get('callbackUrl') || ROUTE_PATHS.PROTECTED.HOME;

  const onSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    const res = await signIn('credentials', {
      redirect: false,
      username: formValues.username,
      password: formValues.password,
      callbackUrl,
    });
    setLoading(false);

    if (res?.error) {
      router.push(callbackUrl);
      setError('invalid username or password');
      return;
    }

    router.push(callbackUrl);
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
        id='username'
        placeholder='Username'
        name='username'
        autoFocus
        value={formValues.username}
        onChange={handleChange}
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
