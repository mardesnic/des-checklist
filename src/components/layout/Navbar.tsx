'use client';

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import { CustomDrawer } from './Drawer';
import { APP_NAME } from '../../lib/const';
import Link from 'next/link';
import { ROUTE_PATHS } from '@/routes';

const NavbarTitle = styled(Typography)(() => ({
  flexGrow: 1,
  textAlign: 'left',
  fontWeight: 700,
}));

export const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <NavbarTitle variant='h1'>
            <Link href={ROUTE_PATHS.PROTECTED.HOME}>{APP_NAME}</Link>
          </NavbarTitle>
          <IconButton
            edge='end'
            color='inherit'
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <CustomDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};
