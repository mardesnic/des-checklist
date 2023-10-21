import { prisma } from '@/db';
import { isValidCredentials } from '@/lib/utils';
import { ROUTE_PATHS } from '@/routes';
import { compare, hash } from 'bcrypt';
import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: ROUTE_PATHS.PUBLIC.LOGIN,
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username' },
        password: { label: 'Password' },
      },
      authorize: async (credentials, req) => {
        if (!credentials || !isValidCredentials(credentials)) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            name: credentials.username,
          },
        });

        if (!user) {
          // Create a new user if they don't exist
          const passwordHash = await hash(credentials.password, 12);
          const newUserData = {
            data: {
              name: credentials.username,
              password: passwordHash,
            },
          };
          const newUser = await prisma.user.create(newUserData);
          return newUser;
        }

        if (user && (await compare(credentials.password, user.password))) {
          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
  session: {
    strategy: 'jwt',
  },
};
