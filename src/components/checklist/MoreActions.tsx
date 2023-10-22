'use client';
import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Popover,
  Stack,
  styled,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import { fetcher } from '@/lib/api/fetcher';

type Props = {
  onRemoveItems: () => Promise<void>;
};

const DropdownButton = styled(Button)(() => ({
  padding: 16,
  borderRadius: 0,
  width: '100%',
  justifyContent: 'flex-start',
}));

export const MoreActions = ({ onRemoveItems }: Props) => {
  const [loadingAll, setLoadingAll] = useState(false);
  const [loadingCompleted, setLoadingCompleted] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRemoveCompleted = async () => {
    setLoadingCompleted(true);
    const response = await fetcher('DELETE', '/api/item/completed');
    if (response) {
      await onRemoveItems();
    }
    handleClose();
    setLoadingCompleted(false);
  };

  const handleRemoveAll = async () => {
    setLoadingAll(true);
    const response = await fetcher('DELETE', '/api/item');
    if (response) {
      await onRemoveItems();
    }
    handleClose();
    setLoadingAll(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const loading = loadingCompleted || loadingAll;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', height: '54px' }}>
      <IconButton onClick={handleClick}>
        <MoreVertIcon fontSize='inherit' />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Stack alignItems='flex-start'>
          <DropdownButton
            variant='text'
            startIcon={
              loadingCompleted ? <CircularProgress size={16} /> : <ClearIcon />
            }
            onClick={handleRemoveCompleted}
            disabled={loading}
          >
            Remove Completed
          </DropdownButton>
          <DropdownButton
            variant='text'
            color='warning'
            startIcon={
              loadingAll ? <CircularProgress size={16} /> : <DeleteIcon />
            }
            onClick={handleRemoveAll}
            disabled={loading}
          >
            Remove All
          </DropdownButton>
        </Stack>
      </Popover>
    </Box>
  );
};
