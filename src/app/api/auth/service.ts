import { User, getServerSession } from 'next-auth';
import { authOptions } from './[...nextauth]/authOptions';

export async function getCurrentUser(): Promise<User> {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error('No current user in session.');
  }
  return session.user;
}
