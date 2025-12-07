import { Transaction, User, TransactionStatus, UserRole } from '@prisma/client';

export type SafeUser = Omit<User, 'hashedPassword' | 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};

export type TransactionWithUsers = Transaction & {
  buyer: SafeUser;
  seller: SafeUser;
};

export interface CreateTransactionInput {
  sellerId: string;
  productName: string;
  productDescription: string;
  productUrl: string;
  productImageUrl?: string;
  amount: number;
  confirmationType: 'EMAIL' | 'PASSCODE' | 'CHAT' | 'BOTH_PARTIES';
}

export interface ConfirmTransactionInput {
  transactionId: string;
  passcode?: string;
}

export interface ProcessPaymentInput {
  transactionId: string;
  paymentMethodId: string;
}

export interface ShippingInfo {
  trackingNumber: string;
  trackingCarrier: string;
}

export interface TrackingMoreResponse {
  meta: {
    code: number;
    message: string;
  };
  data: {
    tracking_number: string;
    carrier_code: string;
    status: string;
    origin_info: {
      trackinfo: Array<{
        checkpoint_status: string;
        checkpoint_date: string;
        location: string;
        tracking_detail: string;
      }>;
    };
    destination_info: {
      trackinfo: Array<{
        checkpoint_status: string;
        checkpoint_date: string;
        location: string;
        tracking_detail: string;
      }>;
    };
  };
}

export interface FeeCalculation {
  amount: number;
  platformFee: number;
  bankFee: number;
  totalFees: number;
  sellerReceives: number;
}
