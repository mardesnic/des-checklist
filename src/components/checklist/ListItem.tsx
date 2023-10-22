import React, { useEffect, useState } from 'react';
import { Item } from '@prisma/client';
import { Box, Checkbox, FormControlLabel, styled } from '@mui/material';
import { fetcher } from '@/lib/api/fetcher';

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

interface Props {
  item: Item;
  onUpdateItem: () => Promise<void>;
}

export const ListItem = ({
  item: { id, title, complete: initialComplete },
  onUpdateItem,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(initialComplete);

  useEffect(() => {
    setComplete(initialComplete);
  }, [initialComplete]);

  const handleCheckboxChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoading(true);
    const checked = !complete;
    const res = await fetcher('PATCH', `/api/item/${id}`, {
      complete: checked,
    });
    if (res) {
      await onUpdateItem();
    }
    setLoading(false);
    setComplete(checked);
  };
  return (
    <Box sx={{ height: '54px', display: 'flex', alignItems: 'center' }}>
      <FormControlLabelStyled
        control={
          <Checkbox checked={complete} onChange={handleCheckboxChange} />
        }
        label={title}
        sx={{ ...(complete ? completeStyle : {}) }}
        disabled={loading}
      />
    </Box>
  );
};
