import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function calculateFees(amount: number): {
  platformFee: number;
  bankFee: number;
  totalFees: number;
  sellerReceives: number;
} {
  const platformFeePercentage = parseFloat(process.env.PLATFORM_FEE_PERCENTAGE || '2');
  const bankFeePercentage = parseFloat(process.env.BANK_FEE_PERCENTAGE || '3');

  const platformFee = (amount * platformFeePercentage) / 100;
  const bankFee = (amount * bankFeePercentage) / 100;
  const totalFees = platformFee + bankFee;
  const sellerReceives = amount - totalFees;

  return {
    platformFee: Math.round(platformFee * 100) / 100,
    bankFee: Math.round(bankFee * 100) / 100,
    totalFees: Math.round(totalFees * 100) / 100,
    sellerReceives: Math.round(sellerReceives * 100) / 100,
  };
}

export function generatePasscode(length: number = 6): string {
  return Math.floor(Math.random() * Math.pow(10, length))
    .toString()
    .padStart(length, '0');
}

export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

export async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength - 3) + '...';
}
