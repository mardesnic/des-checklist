import React, { useState } from 'react';
import { updateItem } from '@/lib/api/itemApi';
import { Item } from '@prisma/client';
import { Box, Checkbox, FormControlLabel, styled } from '@mui/material';

const completeStyle = {
  textDecoration: 'line-through',
  opacity: 0.6,
};

const FormControlLabelStyled = styled(FormControlLabel)(() => ({
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  lineHeight: '32px',
}));

export const ListItem = ({ id, title, complete: initialComplete }: Item) => {
  const [complete, setComplete] = useState(initialComplete);
  const handleCheckboxChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = event.target.checked;
    await updateItem(id, isChecked);
    setComplete(isChecked);
  };
  return (
    <Box sx={{ height: '54px', display: 'flex', alignItems: 'center' }}>
      <FormControlLabelStyled
        control={
          <Checkbox defaultChecked={complete} onChange={handleCheckboxChange} />
        }
        label={title}
        sx={{ ...(complete ? completeStyle : {}) }}
      />
    </Box>
  );
};
