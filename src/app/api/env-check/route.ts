import { NextResponse } from 'next/server';

export async function GET() {
  const envCheck = {
    // Database
    database: {
      url: !!process.env.DATABASE_URL,
      urlPreview: process.env.DATABASE_URL
        ? `${process.env.DATABASE_URL.substring(0, 20)}...`
        : 'NOT SET',
    },

    // NextAuth
    nextAuth: {
      secret: !!process.env.NEXTAUTH_SECRET,
      url: process.env.NEXTAUTH_URL || 'NOT SET',
    },

    // Stripe
    stripe: {
      secretKey: !!process.env.STRIPE_SECRET_KEY,
      publishableKey: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      webhookSecret: !!process.env.STRIPE_WEBHOOK_SECRET,
      connectClientId: !!process.env.STRIPE_CONNECT_CLIENT_ID,
    },

    // TrackingMore
    tracking: {
      apiKey: !!process.env.TRACKINGMORE_API_KEY,
    },

    // Cron
    cron: {
      secret: !!process.env.CRON_SECRET,
    },

    // Fees
    fees: {
      platformFee: process.env.PLATFORM_FEE_PERCENTAGE || '2',
      bankFee: process.env.BANK_FEE_PERCENTAGE || '3',
    },

    // Node Environment
    nodeEnv: process.env.NODE_ENV,
  };

  // Count how many are missing
  const missingCount = Object.entries(envCheck).reduce((count, [key, value]) => {
    if (typeof value === 'object' && value !== null) {
      return count + Object.values(value).filter(v => v === false || v === 'NOT SET').length;
    }
    return count;
  }, 0);

  return NextResponse.json({
    status: missingCount === 0 ? 'healthy' : 'incomplete',
    missingCount,
    environment: envCheck,
    timestamp: new Date().toISOString(),
  });
}
