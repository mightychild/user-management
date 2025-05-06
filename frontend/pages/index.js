import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getUsers, deleteUser } from '../lib/api';
import Layout from '../components/Layout';
import UserTable from '../components/UserTable';
import { Box, 
    Button, 
    Typography,
    Pagination,
    CircularProgress,
    Snackbar,
    Alert } from '@mui/material';

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const router = useRouter();
  const limit = 10;


  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/login');
      return;
    }
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const { users } = await getUsers();
        setUsers(users);
      } catch (err) {
        setError('Failed to load users');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        setUsers(users.filter(user => user._id !== userId));
        setSnackbar({ open: true, message: 'User deleted successfully' });
      } catch (err) {
        setSnackbar({ open: true, message: err.message || 'Failed to delete user' });
      }
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Layout>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h4">User Management</Typography>
            <Button 
              variant="contained" 
              href="/users/add"
            >
              Add User
            </Button>
          </Box>
    
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
    
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <UserTable users={users} onDelete={handleDelete} />
              {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(_, value) => setPage(value)}
                    color="primary"
                  />
                </Box>
              )}
            </>
          )}
        </Layout>
  );
}
