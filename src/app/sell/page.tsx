'use client';

import Link from 'next/link';
import { ShieldCheckIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function SellPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <ShieldCheckIcon className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-gray-900">SecureEscrow</span>
          </Link>
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Seller Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Manage your secure transactions
          </p>
        </div>

        {/* Pending Transactions */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center mb-6">
            <ClockIcon className="h-8 w-8 text-amber-500 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">
              Pending Confirmations
            </h2>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-center">
            <p className="text-gray-600 mb-2">No pending transactions</p>
            <p className="text-sm text-gray-500">
              When a buyer creates a transaction, it will appear here for your confirmation
            </p>
          </div>
        </div>

        {/* Active Transactions */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center mb-6">
            <CheckCircleIcon className="h-8 w-8 text-green-500 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">
              Active Transactions
            </h2>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <p className="text-gray-600 mb-2">No active transactions</p>
            <p className="text-sm text-gray-500">
              Confirmed transactions will appear here
            </p>
          </div>
        </div>

        {/* Benefits for Sellers */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Why sell with escrow?
          </h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span><strong>Payment guaranteed:</strong> Funds are secured before you ship</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span><strong>No chargebacks:</strong> Once delivered, payment is final</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span><strong>Automatic release:</strong> Funds released upon confirmed delivery</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span><strong>Dispute protection:</strong> Fair resolution if issues arise</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span><strong>Low fees:</strong> Only 2% platform fee + payment processing</span>
            </li>
          </ul>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Seller Process:</h4>
            <ol className="space-y-2 text-sm text-gray-600">
              <li><span className="font-medium text-green-600">1.</span> Buyer creates transaction and invites you</li>
              <li><span className="font-medium text-green-600">2.</span> You confirm product details</li>
              <li><span className="font-medium text-green-600">3.</span> Buyer pays (funds held in escrow)</li>
              <li><span className="font-medium text-green-600">4.</span> You ship with tracking number</li>
              <li><span className="font-medium text-green-600">5.</span> Funds auto-release after delivery</li>
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
}
