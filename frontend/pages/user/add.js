import { useState } from 'react';
import { useRouter } from 'next/router';
import UserForm from '../../components/UserForm';
import { createUser } from '../../lib/api';

export default function AddUser() {
  const router = useRouter();

  const handleSubmit = async (userData) => {
    await createUser(userData);
  };

  return <UserForm onSubmit={handleSubmit} />;
}