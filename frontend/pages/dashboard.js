import { useAuth } from '../context/AuthContext';
import { 
  Box, 
  Typography, 
  Button,
  Container,
  Paper
} from '@mui/material';

export default function Dashboard() {
  const { user, signOut } = useAuth();

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user?.name}
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Email: {user?.email}
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Role: {user?.role}
        </Typography>
        <Button
          variant="contained"
          color="error"
          onClick={signOut}
          sx={{ mt: 2 }}
        >
          Sign Out
        </Button>
      </Paper>
    </Container>
  );
}