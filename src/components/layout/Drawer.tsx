'use client';

import React from 'react';
import {
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  ListItemButton,
} from '@mui/material';
import { Box } from '@mui/system';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import Language from '@mui/icons-material/Language';
import { styled } from '@mui/system';
import { EMAIL, GITHUB, NAME, WEBSITE, TWITTER } from '../../lib/const';
import { signOut, useSession } from 'next-auth/react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { ROUTE_PATHS } from '@/routes';
import ChecklistIcon from '@mui/icons-material/Checklist';

const DrawerContent = styled(Box)(({ theme }) => ({
  width: 360,
  maxWidth: '70vw',
  padding: theme.spacing(2),
}));

const CustomAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(10),
  height: theme.spacing(10),
}));

export const CustomDrawer: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const { data: session } = useSession();

  const handleSignout = async () => {
    await signOut({ redirect: true });
  };

  return (
    <Drawer anchor='right' open={open} onClose={onClose}>
      <DrawerContent
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {session && (
          <List>
            <ListItemButton href={ROUTE_PATHS.PROTECTED.PROFILE}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText
                sx={{
                  overflow: 'hidden',
                }}
                primary={session?.user?.name}
              />
            </ListItemButton>
            <ListItemButton href={ROUTE_PATHS.PROTECTED.HOME}>
              <ListItemIcon>
                <ChecklistIcon />
              </ListItemIcon>
              <ListItemText
                sx={{
                  overflow: 'hidden',
                }}
                primary='Checklist'
              />
            </ListItemButton>
            <ListItemButton onClick={handleSignout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={'Log out'} />
            </ListItemButton>
          </List>
        )}
        <List>
          <ListItem>
            <CustomAvatar alt={NAME} src='assets/avatar.jpeg' />
          </ListItem>
          <ListItem>
            <ListItemText primary={NAME} secondary={EMAIL} />
          </ListItem>
          <Box my={2}>
            <Divider />
          </Box>
          <ListItemButton component='a' href={WEBSITE}>
            <ListItemIcon>
              <Language />
            </ListItemIcon>
            <ListItemText primary='Website' />
          </ListItemButton>
          <ListItemButton component='a' href={GITHUB} target='_blank'>
            <ListItemIcon>
              <GitHubIcon />
            </ListItemIcon>
            <ListItemText primary='GitHub' />
          </ListItemButton>
          <ListItemButton href={TWITTER} target='_blank'>
            <ListItemIcon>
              <TwitterIcon />
            </ListItemIcon>
            <ListItemText primary='Twitter' />
          </ListItemButton>
        </List>
      </DrawerContent>
    </Drawer>
  );
};
