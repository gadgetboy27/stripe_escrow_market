import Link from 'next/link';
import {
  ShieldCheckIcon,
  ArrowRightIcon,
  PlayCircleIcon,
  CheckCircleIcon,
  UserGroupIcon,
  LockClosedIcon,
  TruckIcon,
  BanknotesIcon,
  ClockIcon,
  ShieldExclamationIcon,
  DocumentCheckIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

export default function EscrowMarketplacePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <ShieldCheckIcon className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              SecureEscrow
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors">
              Home
            </Link>
            <Link
              href="/register"
              className="bg-gradient-to-r from-primary-600 to-purple-600 text-white px-6 py-2.5 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200 font-semibold"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              The Complete{' '}
              <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                Escrow Marketplace
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto">
              Secure payment holding that protects buyers and sellers for any transaction,
              from any website, anywhere in the world.
            </p>
          </div>

          {/* Video Demo Section */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="relative aspect-video bg-gray-900">
                {/* Video Iframe Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <PlayCircleIcon className="h-24 w-24 text-white/80 mx-auto mb-4" />
                    <p className="text-white/90 text-lg font-medium">
                      Demo Video Coming Soon
                    </p>
                    <p className="text-white/60 text-sm mt-2">
                      See how SecureEscrow protects your transactions
                    </p>
                  </div>
                </div>

                {/* This is where your video will go */}
                <iframe
                  id="demo-video"
                  className="absolute inset-0 w-full h-full hidden"
                  src=""
                  title="SecureEscrow Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-6 bg-gray-50 border-t">
                <p className="text-sm text-gray-600 text-center">
                  ⚡ Watch how transactions work from start to finish in under 2 minutes
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Escrow */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                What is Escrow?
              </h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">
                  An <strong>escrow service</strong> is a trusted third party that holds money during a transaction.
                  Instead of paying the seller directly, you pay us. We hold your payment securely
                  until the item is shipped and delivered.
                </p>
                <p className="mb-4">
                  Once delivery is confirmed via tracking, we automatically release the funds to the seller.
                  If something goes wrong, you get your money back. It's that simple.
                </p>
                <p>
                  Think of it as a <strong>neutral referee</strong> for online transactions. We make sure
                  both parties follow through on their promises before money changes hands.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary-50 to-purple-50 rounded-2xl p-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircleIcon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">For Buyers</h3>
                    <p className="text-gray-600">
                      Your money is protected. Only released when you receive what you paid for.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <CheckCircleIcon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">For Sellers</h3>
                    <p className="text-gray-600">
                      Get paid immediately after delivery. No chargebacks, no payment disputes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                      <CheckCircleIcon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">For Everyone</h3>
                    <p className="text-gray-600">
                      Complete transparency. Track every step from payment to delivery.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Escrow Working Model */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              The Escrow Working Model
            </h2>
            <p className="text-xl text-gray-600">
              Here's exactly what happens to your money at each step
            </p>
          </div>

          {/* Visual Flow Diagram */}
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Step 1 */}
              <div className="mb-12">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      1
                    </div>
                  </div>
                  <div className="flex-1 bg-white rounded-xl shadow-lg p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                        <UserGroupIcon className="h-8 w-8 text-blue-500" />
                        Agreement Created
                      </h3>
                      <span className="text-sm text-gray-500">~5 minutes</span>
                    </div>
                    <div className="space-y-3">
                      <p className="text-gray-600">
                        • Buyer creates transaction with product details and seller's email
                      </p>
                      <p className="text-gray-600">
                        • Both parties review and confirm: price, shipping, product description
                      </p>
                      <p className="text-gray-600">
                        • Verification method chosen: passcode, email, or in-app confirmation
                      </p>
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm font-medium text-blue-900">
                          💡 Status: No money has changed hands yet
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ml-8 mt-4 mb-4">
                  <div className="w-1 h-12 bg-gradient-to-b from-blue-500 to-purple-500 mx-auto"></div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="mb-12">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      2
                    </div>
                  </div>
                  <div className="flex-1 bg-white rounded-xl shadow-lg p-8 border-2 border-purple-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                        <LockClosedIcon className="h-8 w-8 text-purple-500" />
                        Payment Held in Escrow
                      </h3>
                      <span className="text-sm text-gray-500">~2 minutes</span>
                    </div>
                    <div className="space-y-3">
                      <p className="text-gray-600">
                        • Buyer pays via credit card or bank transfer
                      </p>
                      <p className="text-gray-600">
                        • <strong>Funds are HELD by SecureEscrow</strong> (not sent to seller)
                      </p>
                      <p className="text-gray-600">
                        • Seller receives notification that payment is secured
                      </p>
                      <p className="text-gray-600">
                        • Stripe holds the money using "manual capture" - seller cannot withdraw
                      </p>
                      <div className="mt-4 p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                        <p className="text-sm font-medium text-purple-900">
                          🔒 Status: Money is LOCKED in escrow. Seller sees it's reserved but can't access it.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ml-8 mt-4 mb-4">
                  <div className="w-1 h-12 bg-gradient-to-b from-purple-500 to-orange-500 mx-auto"></div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="mb-12">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      3
                    </div>
                  </div>
                  <div className="flex-1 bg-white rounded-xl shadow-lg p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                        <TruckIcon className="h-8 w-8 text-orange-500" />
                        Seller Ships Product
                      </h3>
                      <span className="text-sm text-gray-500">~1-7 days</span>
                    </div>
                    <div className="space-y-3">
                      <p className="text-gray-600">
                        • Seller ships the product to buyer's address
                      </p>
                      <p className="text-gray-600">
                        • Seller enters tracking number in the system
                      </p>
                      <p className="text-gray-600">
                        • We automatically connect to TrackingMore.com API
                      </p>
                      <p className="text-gray-600">
                        • System monitors delivery status every hour (automated cron job)
                      </p>
                      <div className="mt-4 p-4 bg-orange-50 rounded-lg">
                        <p className="text-sm font-medium text-orange-900">
                          📦 Status: Item in transit. Money still held in escrow.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ml-8 mt-4 mb-4">
                  <div className="w-1 h-12 bg-gradient-to-b from-orange-500 to-green-500 mx-auto"></div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="mb-12">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      4
                    </div>
                  </div>
                  <div className="flex-1 bg-white rounded-xl shadow-lg p-8 border-2 border-green-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                        <CheckCircleIcon className="h-8 w-8 text-green-500" />
                        Delivery Confirmed
                      </h3>
                      <span className="text-sm text-gray-500">Automatic</span>
                    </div>
                    <div className="space-y-3">
                      <p className="text-gray-600">
                        • TrackingMore confirms package was delivered
                      </p>
                      <p className="text-gray-600">
                        • System waits 48 hours (grace period for buyer to report issues)
                      </p>
                      <p className="text-gray-600">
                        • If no disputes opened, funds automatically released
                      </p>
                      <div className="mt-4 p-4 bg-green-50 rounded-lg border-2 border-green-200">
                        <p className="text-sm font-medium text-green-900">
                          ✅ Status: Delivery confirmed. Ready for fund release.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ml-8 mt-4 mb-4">
                  <div className="w-1 h-12 bg-gradient-to-b from-green-500 to-emerald-500 mx-auto"></div>
                </div>
              </div>

              {/* Step 5 */}
              <div>
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      5
                    </div>
                  </div>
                  <div className="flex-1 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl shadow-lg p-8 border-2 border-emerald-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                        <BanknotesIcon className="h-8 w-8 text-emerald-500" />
                        Funds Released to Seller
                      </h3>
                      <span className="text-sm text-gray-500">~1-2 days</span>
                    </div>
                    <div className="space-y-3">
                      <p className="text-gray-600">
                        • Stripe captures the payment (was held, now processed)
                      </p>
                      <p className="text-gray-600">
                        • Platform fee (2%) deducted automatically
                      </p>
                      <p className="text-gray-600">
                        • Remaining amount transferred to seller's bank account
                      </p>
                      <p className="text-gray-600">
                        • Transaction marked as COMPLETE - no chargebacks possible
                      </p>
                      <div className="mt-4 p-4 bg-emerald-100 rounded-lg border-2 border-emerald-300">
                        <p className="text-sm font-medium text-emerald-900">
                          💰 Status: Transaction complete! Seller receives payment, buyer has product.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Money Flow Diagram */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Where Does The Money Go?
            </h2>
            <p className="text-xl text-gray-600">
              Complete transparency on fund flow and fees
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 shadow-xl">
              {/* Example Transaction */}
              <div className="text-center mb-8">
                <p className="text-sm text-gray-600 mb-2">Example Transaction</p>
                <p className="text-4xl font-bold text-gray-900">$1,000.00</p>
              </div>

              {/* Money Flow */}
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-900">Buyer Pays</p>
                      <p className="text-sm text-gray-600">Full transaction amount</p>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">$1,000.00</p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="w-1 h-8 bg-gradient-to-b from-gray-300 to-primary-500"></div>
                </div>

                <div className="bg-purple-50 rounded-lg p-6 shadow-md border-2 border-purple-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-purple-900">Held in Escrow</p>
                      <p className="text-sm text-purple-700">Secured by Stripe</p>
                    </div>
                    <p className="text-2xl font-bold text-purple-900">$1,000.00</p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-green-500"></div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <p className="text-gray-700">Transaction Amount</p>
                      <p className="font-semibold text-gray-900">$1,000.00</p>
                    </div>
                    <div className="flex justify-between items-center text-red-600">
                      <p>− Platform Fee (2%)</p>
                      <p className="font-semibold">−$20.00</p>
                    </div>
                    <div className="flex justify-between items-center text-red-600">
                      <p>− Payment Processing (~3%)</p>
                      <p className="font-semibold">−$30.00</p>
                    </div>
                    <div className="border-t-2 border-gray-200 pt-3 mt-3">
                      <div className="flex justify-between items-center">
                        <p className="font-bold text-gray-900">Seller Receives</p>
                        <p className="text-3xl font-bold text-green-600">$950.00</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900 text-center">
                  💡 <strong>Bank Transfer Option:</strong> Skip card fees (3%) by using bank transfer.
                  Takes 2-3 days longer but seller receives $980 instead of $950.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What If Things Go Wrong */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What If Things Go Wrong?
            </h2>
            <p className="text-xl text-gray-600">
              We've got you covered with our dispute resolution system
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <ShieldExclamationIcon className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Item Never Arrives
              </h3>
              <div className="space-y-3 text-gray-600">
                <p>1. Buyer opens dispute after expected delivery date</p>
                <p>2. We check tracking - shows no delivery</p>
                <p>3. We contact seller for proof of shipment</p>
                <p>4. If no proof: <strong className="text-green-600">Full refund to buyer</strong></p>
                <p>5. Funds returned within 3-5 business days</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <DocumentCheckIcon className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Wrong Item Received
              </h3>
              <div className="space-y-3 text-gray-600">
                <p>1. Buyer opens dispute with photos/evidence</p>
                <p>2. Seller has 48 hours to respond</p>
                <p>3. If item differs from description: buyer wins</p>
                <p>4. Seller pays return shipping</p>
                <p>5. <strong className="text-green-600">Full refund after item returned</strong></p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <ClockIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Seller Won't Ship
              </h3>
              <div className="space-y-3 text-gray-600">
                <p>1. Buyer waits 7 days after payment</p>
                <p>2. If no tracking number added: auto-dispute</p>
                <p>3. Seller has 24 hours to provide tracking</p>
                <p>4. No response: <strong className="text-green-600">Automatic full refund</strong></p>
                <p>5. Seller banned from platform</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <CurrencyDollarIcon className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Buyer Won't Confirm
              </h3>
              <div className="space-y-3 text-gray-600">
                <p>1. Tracking shows delivered + signed for</p>
                <p>2. 48-hour grace period for buyer to dispute</p>
                <p>3. No dispute filed: <strong className="text-green-600">Auto-release to seller</strong></p>
                <p>4. Seller gets paid regardless</p>
                <p>5. Transaction marked complete</p>
              </div>
            </div>
          </div>

          <div className="mt-12 max-w-3xl mx-auto bg-green-50 border-2 border-green-200 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Our Guarantee
            </h3>
            <p className="text-lg text-gray-700">
              If you follow the process and provide evidence, we'll make it right.
              <strong> 100% money-back guarantee</strong> if the seller doesn't deliver.
              No questions asked.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Safe Transactions?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands who never worry about getting scammed again
          </p>
          <Link
            href="/register"
            className="bg-white text-primary-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all inline-flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105"
          >
            Create Free Account
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
          <p className="mt-8 text-blue-100 text-sm">
            No credit card required • Setup in 60 seconds • First transaction free
          </p>
        </div>
      </section>
    </div>
  );
}
