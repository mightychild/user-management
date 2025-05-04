import { TextField, MenuItem, Box } from '@mui/material';
import PropTypes from 'prop-types';

export default function UserFilters({ 
  searchTerm, 
  onSearchChange, 
  filters, 
  onFilterChange 
}) {
  return (
    <Box sx={{ 
      display: 'flex', 
      gap: 2, 
      mb: 3,
      flexDirection: { xs: 'column', sm: 'row' },
      alignItems: { xs: 'stretch', sm: 'center' }
    }}>
      <TextField
        label="Search users"
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        fullWidth
      />
      <TextField
        select
        label="Role"
        size="small"
        value={filters.role}
        onChange={(e) => onFilterChange('role', e.target.value)}
        sx={{ minWidth: 120 }}
      >
        <MenuItem value="all">All Roles</MenuItem>
        <MenuItem value="admin">Admin</MenuItem>
        <MenuItem value="user">User</MenuItem>
      </TextField>
      <TextField
        select
        label="Status"
        size="small"
        value={filters.status}
        onChange={(e) => onFilterChange('status', e.target.value)}
        sx={{ minWidth: 120 }}
      >
        <MenuItem value="all">All Statuses</MenuItem>
        <MenuItem value="active">Active</MenuItem>
        <MenuItem value="inactive">Inactive</MenuItem>
      </TextField>
    </Box>
  );
}

UserFilters.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  filters: PropTypes.shape({
    role: PropTypes.string,
    status: PropTypes.string
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired
};