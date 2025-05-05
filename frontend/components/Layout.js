import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Layout({ children }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <>
      <Head>
        <title>User Management</title>
        <meta name="description" content="User Management Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">User Dashboard</h1>
          {router.pathname !== '/login' && (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      <main className="container mx-auto p-4">{children}</main>
    </>
  );
}