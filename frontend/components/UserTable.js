import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Chip } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import PropTypes from 'prop-types';

export default function UserTable({ users, onEdit, onDelete }) {
  return (
    <TableContainer component={Paper} elevation={3}>
      <Table aria-label="user management table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id} hover>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Chip
                  label={user.role}
                  color={user.role === 'admin' ? 'primary' : 'default'}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Chip
                  label={user.status}
                  color={user.status === 'active' ? 'success' : 'error'}
                  size="small"
                />
              </TableCell>
              <TableCell align="center">
                <IconButton 
                  onClick={() => onEdit(user)}
                  aria-label={`edit ${user.name}`}
                  color="primary"
                >
                  <Edit fontSize="small" />
                </IconButton>
                <IconButton 
                  onClick={() => onDelete(user._id)}
                  aria-label={`delete ${user.name}`}
                  color="error"
                >
                  <Delete fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

UserTable.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      role: PropTypes.oneOf(['admin', 'user']).isRequired,
      status: PropTypes.oneOf(['active', 'inactive']).isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};