import axios from 'axios';
import type { TrackingMoreResponse } from '@/types';

const TRACKINGMORE_API_URL = 'https://api.trackingmore.com/v4';

if (!process.env.TRACKINGMORE_API_KEY) {
  console.warn('TRACKINGMORE_API_KEY is not set - tracking features will be disabled');
}

const trackingClient = axios.create({
  baseURL: TRACKINGMORE_API_URL,
  headers: {
    'Tracking-Api-Key': process.env.TRACKINGMORE_API_KEY || '',
    'Content-Type': 'application/json',
  },
});

export async function createTracking(trackingNumber: string, carrierCode: string) {
  try {
    const response = await trackingClient.post('/trackings', {
      tracking_number: trackingNumber,
      carrier_code: carrierCode,
    });

    return response.data;
  } catch (error) {
    console.error('Error creating tracking:', error);
    throw error;
  }
}

export async function getTrackingInfo(
  trackingNumber: string,
  carrierCode: string
): Promise<TrackingMoreResponse> {
  try {
    const response = await trackingClient.get(
      `/trackings/${carrierCode}/${trackingNumber}`
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching tracking info:', error);
    throw error;
  }
}

export async function isDelivered(trackingNumber: string, carrierCode: string): Promise<boolean> {
  try {
    const trackingInfo = await getTrackingInfo(trackingNumber, carrierCode);

    // Check if status indicates delivery
    const deliveredStatuses = ['delivered', 'delivery', 'pickup'];
    const status = trackingInfo.data.status.toLowerCase();

    return deliveredStatuses.some(deliveredStatus => status.includes(deliveredStatus));
  } catch (error) {
    console.error('Error checking delivery status:', error);
    return false;
  }
}

export function getCarrierCode(carrierName: string): string {
  const carrierMap: Record<string, string> = {
    'ups': 'ups',
    'usps': 'usps',
    'fedex': 'fedex',
    'dhl': 'dhl',
    'amazon': 'amazon',
    'ontrac': 'ontrac',
    'lasership': 'lasership',
    'canada-post': 'canada-post',
    'royal-mail': 'royal-mail',
    'australia-post': 'australia-post',
  };

  const normalizedName = carrierName.toLowerCase().trim();
  return carrierMap[normalizedName] || carrierName;
}

export async function detectCarrier(trackingNumber: string): Promise<string | null> {
  try {
    const response = await trackingClient.post('/carriers/detect', {
      tracking_number: trackingNumber,
    });

    if (response.data.data && response.data.data.length > 0) {
      return response.data.data[0].carrier_code;
    }

    return null;
  } catch (error) {
    console.error('Error detecting carrier:', error);
    return null;
  }
}
