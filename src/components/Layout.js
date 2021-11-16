import { Container } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

function Layout({ children }) {
  return (
    <Container maxWidth="lg" component="main">
      <Box
        sx={{
          marginTop: '1rem',
          marginBottom: '1rem',
        }}
      >
        {children}
      </Box>
    </Container>
  );
}

export default Layout;
