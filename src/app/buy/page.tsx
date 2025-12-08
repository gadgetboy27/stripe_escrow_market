'use client';

import Link from 'next/link';
import { ShieldCheckIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function BuyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <ShieldCheckIcon className="h-8 w-8 text-blue-600" />
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
            Buyer Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Start a secure escrow transaction
          </p>
        </div>

        {/* Start Transaction Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-100 rounded-full p-4">
              <PlusIcon className="h-12 w-12 text-blue-600" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
            Create New Transaction
          </h2>

          <p className="text-gray-600 text-center mb-8">
            Start by entering the product details and seller information
          </p>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                placeholder="e.g. Vintage Guitar"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product URL
              </label>
              <input
                type="url"
                placeholder="https://example.com/product"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transaction Amount ($)
              </label>
              <input
                type="number"
                placeholder="1000.00"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seller Email
              </label>
              <input
                type="email"
                placeholder="seller@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Create Escrow Transaction
            </button>
          </form>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            How it works as a buyer:
          </h3>
          <ol className="space-y-3 text-gray-600">
            <li className="flex">
              <span className="font-semibold text-blue-600 mr-2">1.</span>
              Create a transaction with product details
            </li>
            <li className="flex">
              <span className="font-semibold text-blue-600 mr-2">2.</span>
              Seller confirms the transaction details
            </li>
            <li className="flex">
              <span className="font-semibold text-blue-600 mr-2">3.</span>
              You pay and funds are held in escrow
            </li>
            <li className="flex">
              <span className="font-semibold text-blue-600 mr-2">4.</span>
              Seller ships the item with tracking
            </li>
            <li className="flex">
              <span className="font-semibold text-blue-600 mr-2">5.</span>
              Funds automatically release upon delivery
            </li>
          </ol>
        </div>
      </main>
    </div>
  );
}
