import { generatePageTitle } from '@/lib/utils';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import React from 'react';

export const metadata: Metadata = {
  title: generatePageTitle('Profile'),
};

const Profile = async () => {
  const session = await getServerSession();
  return <div>Welcome, {session?.user?.name}!</div>;
};

export default Profile;
