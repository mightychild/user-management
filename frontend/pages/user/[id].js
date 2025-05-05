import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import UserForm from '../../../components/UserForm';
import { updateUser, getUser } from '../../../lib/api';

export default function EditUser() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        const data = await getUser(id);
        setUser(data.user);
      };
      fetchUser();
    }
  }, [id]);

  const handleSubmit = async (userData) => {
    await updateUser(id, userData);
  };

  if (!user) return <div>Loading...</div>;

  return <UserForm initialData={user} onSubmit={handleSubmit} />;
}