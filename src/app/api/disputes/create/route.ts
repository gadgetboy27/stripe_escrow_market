import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { z } from 'zod';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

const createDisputeSchema = z.object({
  transactionId: z.string(),
  reason: z.string().min(20, 'Please provide a detailed reason (minimum 20 characters)'),
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = createDisputeSchema.parse(body);

    // Get transaction
    const transaction = await prisma.transaction.findUnique({
      where: { id: validatedData.transactionId },
    });

    if (!transaction) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }

    // Verify user is party to transaction
    const isBuyer = transaction.buyerId === session.user.id;
    const isSeller = transaction.sellerId === session.user.id;

    if (!isBuyer && !isSeller) {
      return NextResponse.json(
        { error: 'Not authorized to dispute this transaction' },
        { status: 403 }
      );
    }

    // Check if dispute already exists
    const existingDispute = await prisma.dispute.findFirst({
      where: {
        transactionId: validatedData.transactionId,
        status: {
          in: ['OPEN', 'IN_REVIEW'],
        },
      },
    });

    if (existingDispute) {
      return NextResponse.json(
        { error: 'An active dispute already exists for this transaction' },
        { status: 400 }
      );
    }

    // Create dispute
    const dispute = await prisma.dispute.create({
      data: {
        transactionId: validatedData.transactionId,
        raisedById: session.user.id,
        reason: validatedData.reason,
        status: 'OPEN',
      },
      include: {
        transaction: {
          include: {
            buyer: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            seller: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        raisedBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Update transaction status
    await prisma.transaction.update({
      where: { id: validatedData.transactionId },
      data: {
        status: 'DISPUTED',
      },
    });

    // TODO: Send email notifications to admin and other party

    return NextResponse.json({
      message: 'Dispute created successfully',
      dispute,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Dispute creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create dispute' },
      { status: 500 }
    );
  }
}
