import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    await prisma.$connect();
    const userCount = await prisma.user.count();
    const transactionCount = await prisma.transaction.count();

    return NextResponse.json({
      status: 'connected',
      database: 'healthy',
      stats: {
        users: userCount,
        transactions: transactionCount,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      database: 'unhealthy',
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
