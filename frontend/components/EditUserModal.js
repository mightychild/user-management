import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import api from '../lib/api';

export default function EditUserModal({ open, onClose, user, onUserUpdated }) {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status || 'active'
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    
    try {
      await onUserUpdated(user._id, data);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit User</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          {error && (
            <Box color="error.main" mb={2}>
              {error}
            </Box>
          )}
          <TextField
            margin="normal"
            fullWidth
            label="Name"
            {...register('name', { required: 'Name is required' })}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Email"
            type="email"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email format'
              }
            })}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Role"
            select
            {...register('role')}
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>
          <TextField
            margin="normal"
            fullWidth
            label="Status"
            select
            {...register('status')}
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? 'Updating...' : 'Update User'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}