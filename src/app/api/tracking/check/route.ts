import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getTrackingInfo, isDelivered } from '@/lib/tracking';

// This endpoint should be called by a cron job every hour
// to check delivery status and auto-release funds

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

    // Get all shipped transactions that haven't been delivered yet
    const shippedTransactions = await prisma.transaction.findMany({
      where: {
        status: {
          in: ['SHIPPED', 'IN_TRANSIT'],
        },
        trackingNumber: {
          not: null,
        },
        trackingCarrier: {
          not: null,
        },
      },
    });

    const results = [];

    for (const transaction of shippedTransactions) {
      try {
        // Check if delivered
        const delivered = await isDelivered(
          transaction.trackingNumber!,
          transaction.trackingCarrier!
        );

        if (delivered) {
          // Update status to delivered
          await prisma.transaction.update({
            where: { id: transaction.id },
            data: {
              status: 'DELIVERED',
              deliveredAt: new Date(),
            },
          });

          // Check if we should auto-release funds
          const now = new Date();
          const autoReleaseDate = transaction.autoReleaseAt;

          if (autoReleaseDate && now >= autoReleaseDate) {
            // Trigger fund release
            await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/transactions/${transaction.id}/release`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'authorization': authHeader,
              },
            });

            results.push({
              transactionId: transaction.id,
              action: 'delivered_and_released',
            });
          } else {
            results.push({
              transactionId: transaction.id,
              action: 'marked_delivered',
            });
          }
        } else {
          // Get tracking info for updates
          const trackingInfo = await getTrackingInfo(
            transaction.trackingNumber!,
            transaction.trackingCarrier!
          );

          // Store tracking update
          if (trackingInfo.data.destination_info.trackinfo.length > 0) {
            const latestUpdate = trackingInfo.data.destination_info.trackinfo[0];

            await prisma.trackingUpdate.create({
              data: {
                transactionId: transaction.id,
                status: latestUpdate.checkpoint_status,
                location: latestUpdate.location,
                description: latestUpdate.tracking_detail,
                timestamp: new Date(latestUpdate.checkpoint_date),
              },
            });

            // Update transaction status to IN_TRANSIT if not already
            if (transaction.status === 'SHIPPED') {
              await prisma.transaction.update({
                where: { id: transaction.id },
                data: {
                  status: 'IN_TRANSIT',
                },
              });
            }
          }

          results.push({
            transactionId: transaction.id,
            action: 'tracking_updated',
          });
        }
      } catch (error) {
        console.error(`Error checking transaction ${transaction.id}:`, error);
        results.push({
          transactionId: transaction.id,
          action: 'error',
          error: String(error),
        });
      }
    }

    return NextResponse.json({
      message: 'Tracking check completed',
      checked: shippedTransactions.length,
      results,
    });
  } catch (error) {
    console.error('Tracking check error:', error);
    return NextResponse.json(
      { error: 'Tracking check failed' },
      { status: 500 }
    );
  }
}
