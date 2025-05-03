import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../styles/theme';
import LoadingScreen from '../components/LoadingScreen';
import '../styles/globals.css';

function AuthWrapper({ children }) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user && ['/login', '/register'].includes(router.pathname)) {
        router.replace('/dashboard');
      }
      if (!user && !['/login', '/register'].includes(router.pathname)) {
        router.replace('/login');
      }
    }
  }, [user, loading, router]);

  return loading ? <LoadingScreen /> : children;
}

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AuthWrapper>
          <Component {...pageProps} />
        </AuthWrapper>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;