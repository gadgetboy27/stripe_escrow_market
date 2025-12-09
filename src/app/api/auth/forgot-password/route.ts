import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import prisma from '@/lib/prisma';
import { sendPasswordResetEmail } from '@/lib/email';
import { passwordResetRateLimiter, getClientIp } from '@/lib/rate-limit';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting - 3 password reset attempts per IP per hour
    const ip = getClientIp(request);
    const rateLimitResult = passwordResetRateLimiter.check(request, 3, `reset_${ip}`);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many password reset attempts. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': '3',
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimitResult.reset).toISOString(),
          }
        }
      );
    }

    const body = await request.json();

    // Validate input
    const validatedData = forgotPasswordSchema.parse(body);

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    // Always return success message for security (don't reveal if user exists)
    const successMessage = 'If an account exists with this email, a password reset link has been sent.';

    if (!user) {
      return NextResponse.json(
        { message: successMessage },
        { status: 200 }
      );
    }

    // Check if user account is active
    if (!user.isActive) {
      return NextResponse.json(
        { error: 'Account is not active. Please verify your email first.' },
        { status: 400 }
      );
    }

    // Generate password reset token
    const resetToken = nanoid(32);
    const resetExpires = new Date();
    resetExpires.setHours(resetExpires.getHours() + 1); // 1 hour expiry for security

    // Save token to database
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetToken: resetToken,
        passwordResetExpires: resetExpires,
      },
    });

    // Send password reset email
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const resetUrl = `${appUrl}/auth/reset-password?token=${resetToken}`;

    try {
      await sendPasswordResetEmail(
        user.email,
        user.name || 'User',
        resetUrl
      );
    } catch (emailError) {
      console.error('Failed to send password reset email:', emailError);
      return NextResponse.json(
        { error: 'Failed to send password reset email. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: successMessage },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
