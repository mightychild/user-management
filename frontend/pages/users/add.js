import { useRouter } from 'next/router';
import { useState } from 'react';
import { Alert, Snackbar, CircularProgress } from '@mui/material';
import UserForm from '../../components/UserForm';
import { createUser } from '../../lib/api';

export default function AddUser() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      await createUser(userData);
      router.push('/');
    } catch (err) {
      setError(err.message || 'Failed to create user');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1>Add New User</h1>
      
      {loading && <CircularProgress style={{ margin: '20px auto', display: 'block' }} />}
      
      <UserForm 
        onSubmit={handleSubmit} 
        disabled={loading}
      />
      
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert severity="error">
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}