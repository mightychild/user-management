import { Container, CssBaseline, Box, Toolbar } from '@mui/material';
import Head from 'next/head';
import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>User Management Dashboard</title>
        <meta name="description" content="User management system" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Navbar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: '100%',
            minHeight: '100vh',
            backgroundColor: '#f5f5f5'
          }}
        >
          <Toolbar /> {/* This creates space below the app bar */}
          <Container maxWidth="xl">
            {children}
          </Container>
        </Box>
      </Box>
    </>
  );
}