import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import prisma from '@/lib/prisma';
import { isValidEmail } from '@/lib/utils';
import { sendVerificationEmail } from '@/lib/email';
import { authRateLimiter, getClientIp } from '@/lib/rate-limit';

// Strong password validation
const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character');

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: passwordSchema,
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.enum(['BUYER', 'SELLER']),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting - 5 registration attempts per IP per 15 minutes
    const ip = getClientIp(request);
    const rateLimitResult = authRateLimiter.check(request, 5, `register_${ip}`);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many registration attempts. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimitResult.reset).toISOString(),
          }
        }
      );
    }

    const body = await request.json();

    // Validate input
    const validatedData = registerSchema.parse(body);

    // Additional email validation
    if (!isValidEmail(validatedData.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(validatedData.password, 12);

    // Generate email verification token
    const verificationToken = nanoid(32);
    const verificationExpires = new Date();
    verificationExpires.setHours(verificationExpires.getHours() + 24); // 24 hour expiry

    // Create user (inactive until email verified)
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        name: validatedData.name,
        hashedPassword,
        role: validatedData.role,
        isActive: false,
        emailVerificationToken: verificationToken,
        emailVerificationExpires: verificationExpires,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    // Send verification email
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const verificationUrl = `${appUrl}/auth/verify-email?token=${verificationToken}`;

    try {
      await sendVerificationEmail(
        validatedData.email,
        validatedData.name,
        verificationUrl
      );
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      // Don't fail registration if email fails, user can request resend
    }

    return NextResponse.json(
      {
        message: 'Registration successful! Please check your email to verify your account.',
        user,
        requiresVerification: true,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
