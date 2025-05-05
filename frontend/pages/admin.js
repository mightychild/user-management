import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import { Typography, Box, Button, CircularProgress } from '@mui/material';

export default function AdminPanel() {
  // const { user, isAdmin, loading } = useAuth();
  
  const router = useRouter();

  // useEffect(() => {
  //   if (!loading && !isAdmin) {
  //     router.replace('/dashboard');
  //   }
  // }, [loading, isAdmin, router]);

  // if (loading || !user) {
  //   return (
  //     <Layout>
  //       <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
  //         <CircularProgress />
  //       </Box>
  //     </Layout>
  //   );
  // }

  // if (!isAdmin) {
  //   return (
  //     <Layout>
  //       <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
  //         <Typography color="error">
  //           You don't have permission to access this page
  //         </Typography>
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
      </Box>
    </Layout>
  );
}