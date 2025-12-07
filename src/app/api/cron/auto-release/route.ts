import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Cron job to auto-release funds after delivery + grace period
// Should be called every hour or every 6 hours

export async function POST(request: NextRequest) {
  try {
    // Verify cron job authorization
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET || 'dev-secret';

    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const now = new Date();

    // Find all delivered transactions ready for auto-release
    const transactionsToRelease = await prisma.transaction.findMany({
      where: {
        status: 'DELIVERED',
        autoReleaseAt: {
          lte: now,
        },
      },
      include: {
        seller: true,
      },
    });

    const results = [];

    for (const transaction of transactionsToRelease) {
      try {
        // Call release endpoint
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/transactions/${transaction.id}/release`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'authorization': authHeader,
            },
          }
        );

        if (response.ok) {
          results.push({
            transactionId: transaction.id,
            status: 'released',
          });
        } else {
          const errorData = await response.json();
          results.push({
            transactionId: transaction.id,
            status: 'failed',
            error: errorData.error,
          });
        }
      } catch (error) {
        console.error(`Error releasing transaction ${transaction.id}:`, error);
        results.push({
          transactionId: transaction.id,
          status: 'error',
          error: String(error),
        });
      }
    }

    return NextResponse.json({
      message: 'Auto-release check completed',
      processed: transactionsToRelease.length,
      results,
    });
  } catch (error) {
    console.error('Auto-release cron error:', error);
    return NextResponse.json(
      { error: 'Auto-release failed' },
      { status: 500 }
    );
  }
}
