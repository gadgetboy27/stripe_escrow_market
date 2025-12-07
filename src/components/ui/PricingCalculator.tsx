'use client';

import { useState } from 'react';
import { calculateFees, formatCurrency } from '@/lib/utils';

export default function PricingCalculator() {
  const [amount, setAmount] = useState(1000);

  const fees = calculateFees(amount);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Calculate Your Transaction Fees
      </h3>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Transaction Amount
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl">
            $
          </span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full pl-10 pr-4 py-4 text-2xl font-semibold border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
            min="0"
            step="100"
          />
        </div>
        <input
          type="range"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          min="0"
          max="10000"
          step="100"
          className="w-full mt-4 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center py-3 border-b border-gray-200">
          <span className="text-gray-600">Transaction Amount</span>
          <span className="text-xl font-semibold text-gray-900">
            {formatCurrency(amount)}
          </span>
        </div>

        <div className="flex justify-between items-center py-3 border-b border-gray-200">
          <div>
            <span className="text-gray-600">Platform Fee</span>
            <span className="text-xs text-gray-500 ml-2">(2%)</span>
          </div>
          <span className="text-lg font-medium text-gray-700">
            {formatCurrency(fees.platformFee)}
          </span>
        </div>

        <div className="flex justify-between items-center py-3 border-b border-gray-200">
          <div>
            <span className="text-gray-600">Payment Processing</span>
            <span className="text-xs text-gray-500 ml-2">(~3%)</span>
          </div>
          <span className="text-lg font-medium text-gray-700">
            {formatCurrency(fees.bankFee)}
          </span>
        </div>

        <div className="flex justify-between items-center py-4 bg-primary-50 rounded-lg px-4 mt-4">
          <span className="text-lg font-semibold text-gray-900">Total Fees</span>
          <span className="text-2xl font-bold text-primary-600">
            {formatCurrency(fees.totalFees)}
          </span>
        </div>

        <div className="flex justify-between items-center py-4 bg-green-50 rounded-lg px-4">
          <span className="text-lg font-semibold text-gray-900">Seller Receives</span>
          <span className="text-2xl font-bold text-green-600">
            {formatCurrency(fees.sellerReceives)}
          </span>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-6 text-center">
        💡 Use bank transfer to reduce processing fees (takes 2-3 days longer)
      </p>
    </div>
  );
}
