import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import { Typography, Box, Button } from '@mui/material';

export default function AdminPanel() {
  const { user } = useAuth();
  const router = useRouter();

  // useEffect(() => {
  //   if (user && user.role !== 'admin') {
  //     router.replace('/dashboard');
  //   }
  // }, [user, router]);

  // if (!user || user.role !== 'admin') {
  //   return (
  //     <Layout>
  //       <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
  //         <Typography>Loading...</Typography>
  //       </Box>
  //     </Layout>
  //   );
  // }

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Button 
          variant="contained" 
          onClick={() => router.push('/users')}
          sx={{ mr: 2 }}
        >
          Manage Users
        </Button>
        <Button variant="outlined">
          System Settings
        </Button>
      </Box>
    </Layout>
  );
}