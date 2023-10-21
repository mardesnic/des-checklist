'use client';

import { getItems } from '@/lib/api/itemApi';
import { Item } from '@prisma/client';
import React, { useState } from 'react';
import { ListItem as ChecklistItem } from './ListItem';
import { AddItem } from './AddItem';
import { MoreActions } from './MoreActions';
import { Box } from '@mui/material';

type Props = {
  defaultItems: Item[];
};

export const List = ({ defaultItems }: Props) => {
  const [items, setItems] = useState<Item[]>(defaultItems || []);

  const fetchItems = async () => {
    const fetchedItems = await getItems();
    setItems(fetchedItems);
  };

  const handleNewItem = async () => {
    fetchItems();
  };

  const handleRemoveCompleted = async () => {
    fetchItems();
  };

  return (
    <Box sx={{ display: 'flex', gap: '16px' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '100%',
        }}
      >
        {items.length > 0 && (
          <div>
            {items.map((item) => (
              <ChecklistItem key={item.id} {...item} />
            ))}
          </div>
        )}
        <AddItem onNewItem={handleNewItem} />
      </Box>
      <MoreActions onRemoveItems={handleRemoveCompleted} />
    </Box>
  );
};
