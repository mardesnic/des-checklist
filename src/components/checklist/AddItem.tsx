import React, { useEffect, useRef, useState } from 'react';
import { Item } from '@prisma/client';
import { CircularProgress, InputAdornment, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { fetcher } from '@/lib/api/fetcher';

type Props = {
  onNewItem: (item: Item) => Promise<void>;
};

export const AddItem = ({ onNewItem }: Props) => {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onFinish = async (event: React.FormEvent) => {
    event.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    const newItem = await fetcher('POST', '/api/item', { title });
    if (newItem) {
      await onNewItem(newItem);
      setTitle('');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!loading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [loading]);

  return (
    <form onSubmit={onFinish} autoComplete='off'>
      <TextField
        inputRef={inputRef}
        id='Add'
        value={title}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setTitle(event.target.value);
        }}
        placeholder='Add new item...'
        autoFocus
        required
        disabled={loading}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              {loading ? <CircularProgress size={16} /> : <AddIcon />}
            </InputAdornment>
          ),
        }}
        variant='outlined'
        sx={{ width: '100%' }}
      />
    </form>
  );
};
