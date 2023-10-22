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
        email: { label: 'Email' },
        password: { label: 'Password' },
      },
      authorize: async (credentials, req) => {
        if (!credentials || !isValidCredentials(credentials)) {
          return null;
        }
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (!user) {
            // Create a new user if they don't exist
            const passwordHash = await hash(credentials.password, 12);
            const newUserData = {
              data: {
                email: credentials.email,
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
        } catch (error) {
          console.warn(error);
          return null;
        }
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
