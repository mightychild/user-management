import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../styles/theme';
import LoadingScreen from '../components/LoadingScreen';
import NProgress from 'nprogress';
import '../styles/nprogress.css';
import '../styles/globals.css';

function RouteLoader() {
  const router = useRouter();
  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleComplete = () => NProgress.done();
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);
  return null;
}

function AuthWrapper({ children }) {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (!loading) {
      const publicRoutes = ['/login', '/register', '/forgot-password'];
      const isPublicRoute = publicRoutes.includes(router.pathname);
      
      if (user && isPublicRoute) {
        router.replace(user.role === 'admin' ? '/admin' : '/dashboard');
      } else if (!user && !isPublicRoute) {
        router.replace(`/login?redirect=${encodeURIComponent(router.asPath)}`);
      }
      setAuthChecked(true);
    }
  }, [user, loading, router]);

  if (loading || !authChecked) return <LoadingScreen />;
  return children;
}

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <RouteLoader />
        <AuthWrapper>
          <Component {...pageProps} />
        </AuthWrapper>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;