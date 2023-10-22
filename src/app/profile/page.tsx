import { generatePageTitle } from '@/lib/utils';
import { Metadata } from 'next';
import React from 'react';
import { getCurrentUser } from '../api/auth/service';
import { Button, Stack } from '@mui/material';
import { ROUTE_PATHS } from '@/routes';
import ChecklistIcon from '@mui/icons-material/Checklist';

export const metadata: Metadata = {
  title: generatePageTitle('Profile'),
};

export default async function Profile() {
  const currentUser = await getCurrentUser();
  return (
    <Stack alignItems={'flex-start'} gap={2}>
      <div>Welcome, {currentUser.email}!</div>
      <Button
        variant='outlined'
        href={ROUTE_PATHS.PROTECTED.HOME}
        startIcon={<ChecklistIcon />}
      >
        Checklist
      </Button>
    </Stack>
  );
}
