'use client';

import { Item } from '@prisma/client';
import React, { useState } from 'react';
import { ListItem as ChecklistItem } from './ListItem';
import { AddItem } from './AddItem';
import { MoreActions } from './MoreActions';
import { Box, Divider } from '@mui/material';
import { fetcher } from '@/lib/api/fetcher';

type Props = {
  defaultItems: Item[];
};

export const List = ({ defaultItems }: Props) => {
  const [items, setItems] = useState<Item[]>(defaultItems || []);

  const fetchItems = async () => {
    const fetchedItems = await fetcher('GET', '/api/item');
    setItems(fetchedItems);
  };

  const todoItems = items.filter((item) => !item.complete);
  const completedItems = items.filter((item) => item.complete);

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
            {todoItems.map((item) => (
              <ChecklistItem
                key={item.id}
                item={item}
                onUpdateItem={fetchItems}
              />
            ))}
            {todoItems.length > 0 && completedItems.length > 0 && (
              <Divider sx={{ marginBlock: 2 }} />
            )}
            {completedItems
              .filter((item) => item.complete)
              .map((item) => (
                <ChecklistItem
                  key={item.id}
                  item={item}
                  onUpdateItem={fetchItems}
                />
              ))}
          </div>
        )}
        <AddItem onNewItem={fetchItems} />
      </Box>
      <MoreActions onRemoveItems={fetchItems} />
    </Box>
  );
};
