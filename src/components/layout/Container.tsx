import { ReactNode } from 'react';
import { Container as MuiContainer, Box, Paper } from '@mui/material';
import { Navbar } from './Navbar';

interface Props {
  children: ReactNode;
}

export const Container: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />
      <MuiContainer maxWidth='xs'>
        <Box sx={{ paddingTop: 4, paddingBottom: 4 }}>
          <Paper
            sx={{
              paddingInline: 2,
              paddingBlock: 3,
            }}
          >
            {children}
          </Paper>
        </Box>
      </MuiContainer>
    </>
  );
};
