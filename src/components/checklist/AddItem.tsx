import React, { useState } from 'react';
import { Item } from '@prisma/client';
import { createItem } from '@/lib/api/itemApi';
import { InputAdornment, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

type Props = {
  onNewItem: (item: Item) => void;
};

export const AddItem = ({ onNewItem }: Props) => {
  const [title, setTitle] = useState('');

  const onFinish = async (event: React.FormEvent) => {
    event.preventDefault();
    const newItem = await createItem({ title });
    if (newItem) {
      setTitle('');
      onNewItem(newItem);
    }
  };

  return (
    <form onSubmit={onFinish} autoComplete='off'>
      <TextField
        id='Add'
        value={title}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setTitle(event.target.value);
        }}
        placeholder='Add new item...'
        autoFocus
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <AddIcon />
            </InputAdornment>
          ),
        }}
        variant='outlined'
        sx={{ width: '100%' }}
      />
    </form>
  );
};
