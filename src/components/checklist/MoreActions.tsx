'use client';
import React, { useState } from 'react';
import { removeAllItems, removeCompletedItems } from '@/lib/api/itemApi';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Button, IconButton, Popover, Stack, styled } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';

type Props = {
  onRemoveItems: () => void;
};

const DropdownButton = styled(Button)(() => ({
  padding: 16,
  borderRadius: 0,
  width: '100%',
  justifyContent: 'flex-start',
}));

export const MoreActions = ({ onRemoveItems }: Props) => {
  const [loading, setLoading] = useState(false);
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
    handleClose();
    setLoading(true);
    const response = await removeCompletedItems();
    setLoading(false);
    if (response) {
      onRemoveItems();
    }
  };

  const handleRemoveAll = async () => {
    handleClose();
    setLoading(true);
    const response = await removeAllItems();
    setLoading(false);
    if (response) {
      onRemoveItems();
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

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
            startIcon={<ClearIcon />}
            onClick={handleRemoveCompleted}
            disabled={loading}
          >
            Remove Completed
          </DropdownButton>
          <DropdownButton
            variant='text'
            color='warning'
            startIcon={<DeleteIcon />}
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
