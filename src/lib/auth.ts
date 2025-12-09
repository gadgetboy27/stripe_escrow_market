import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from 'bcryptjs';
import prisma from './prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/auth/error',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.hashedPassword) {
          throw new Error('Invalid credentials');
        }

        // Check if account is active (email verified)
        if (!user.isActive) {
          throw new Error('Please verify your email address before logging in');
        }

        // Check if account is locked
        if (user.lockedUntil && user.lockedUntil > new Date()) {
          const minutesLeft = Math.ceil((user.lockedUntil.getTime() - Date.now()) / 1000 / 60);
          throw new Error(`Account is locked. Please try again in ${minutesLeft} minutes`);
        }

        // Verify password
        const isCorrectPassword = await compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          // Increment failed login attempts
          const newAttempts = user.loginAttempts + 1;
          const updateData: any = {
            loginAttempts: newAttempts,
          };

          // Lock account after 5 failed attempts for 15 minutes
          if (newAttempts >= 5) {
            const lockTime = new Date();
            lockTime.setMinutes(lockTime.getMinutes() + 15);
            updateData.lockedUntil = lockTime;
          }

          await prisma.user.update({
            where: { id: user.id },
            data: updateData,
          });

          if (newAttempts >= 5) {
            throw new Error('Account locked due to too many failed login attempts. Please try again in 15 minutes');
          }

          throw new Error('Invalid credentials');
        }

        // Get client IP from request headers
        const forwarded = req?.headers?.['x-forwarded-for'];
        const ip = forwarded ? (Array.isArray(forwarded) ? forwarded[0] : forwarded.split(',')[0]) : 'unknown';

        // Successful login - reset attempts and update last login
        await prisma.user.update({
          where: { id: user.id },
          data: {
            loginAttempts: 0,
            lockedUntil: null,
            lastLoginAt: new Date(),
            lastLoginIp: ip,
          },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
