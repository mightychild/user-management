import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Container, Box, Typography, Button, CircularProgress } from '@mui/material';
import api from '../lib/api';
import UserTable from '../components/UserTable';
import AddUserModal from '../components/AddUserModal';
import EditUserModal from '../components/EditUserModal';
import FilterDialog from '../components/FilterDialog';

export default function AdminUsersPage() {
  const { isAdmin } = useAuth();
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = {
        page: page + 1,
        limit: rowsPerPage,
        ...filters
      };
      if (searchQuery) params.q = searchQuery;

      const { data } = await api.get('/users', { params });
      setUsers(data.data.users);
      setTotal(data.total);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (isAdmin) {
  //     fetchUsers();
  //   }
  // }, [isAdmin, page, rowsPerPage, searchQuery, filters]);

  const handleAddUser = async (userData) => {
    try {
      const { data } = await api.post('/users', userData);
      setUsers([data.data.user, ...users]);
    } catch (err) {
      console.error('Failed to add user:', err);
      throw err;
    }
  };

  const handleUpdateUser = async (userId, userData) => {
    try {
      const { data } = await api.patch(`/users/${userId}`, userData);
      setUsers(users.map(u => u._id === userId ? data.data.user : u));
    } catch (err) {
      console.error('Failed to update user:', err);
      throw err;
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await api.delete(`/users/${userId}`);
      setUsers(users.filter(u => u._id !== userId));
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  const handleBulkDelete = async (userIds) => {
    try {
      await api.delete('/users', { data: { ids: userIds } });
      setUsers(users.filter(u => !userIds.includes(u._id)));
    } catch (err) {
      console.error('Failed to delete users:', err);
    }
  };

  if (!isAdmin) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          You don't have permission to access this page
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">User Management</Typography>
        <Button 
          variant="contained" 
          onClick={() => setModalOpen(true)}
        >
          Add User
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <UserTable
          users={users}
          total={total}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          onEdit={(user) => {
            setCurrentUser(user);
            setEditModalOpen(true);
          }}
          onDelete={handleDeleteUser}
          onBulkDelete={handleBulkDelete}
          onSearch={setSearchQuery}
          onFilter={() => setFilterDialogOpen(true)}
        />
      )}

      <AddUserModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)}
        onUserAdded={handleAddUser}
      />

      <EditUserModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        user={currentUser}
        onUserUpdated={handleUpdateUser}
      />

      <FilterDialog
        open={filterDialogOpen}
        onClose={() => setFilterDialogOpen(false)}
        onApply={(newFilters) => {
          setFilters(newFilters);
          setPage(0);
        }}
      />
    </Container>
  );
}