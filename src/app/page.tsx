import Link from 'next/link';
import {
  ShieldCheckIcon,
  CreditCardIcon,
  TruckIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  LockClosedIcon,
  UserGroupIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheckIcon className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">SecureEscrow</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Safe Transactions,
            <span className="text-primary-600"> Every Time</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Buy and sell with complete confidence. Our escrow service holds payments securely
            until both parties are satisfied. Protection for buyers and sellers from any website,
            for any transaction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/buy"
              className="group bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-all hover-lift inline-flex items-center justify-center"
            >
              I'm a Buyer
              <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/sell"
              className="group bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-all hover-lift inline-flex items-center justify-center"
            >
              I'm a Seller
              <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserGroupIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Agree on Terms</h3>
              <p className="text-gray-600">
                Buyer and seller confirm product details, price, and shipping information
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCardIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Secure Payment</h3>
              <p className="text-gray-600">
                Buyer pays securely. Funds are held in escrow, not released to seller yet
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TruckIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Ship & Track</h3>
              <p className="text-gray-600">
                Seller ships the item. We automatically track delivery via TrackingMore
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">4. Auto-Release</h3>
              <p className="text-gray-600">
                Once delivery is confirmed, funds are automatically released to the seller
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Transparent Pricing
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            No hidden fees. Know exactly what you'll pay.
          </p>
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <h3 className="text-lg font-semibold">Platform Fee</h3>
                  <p className="text-gray-600">Our escrow service fee</p>
                </div>
                <div className="text-3xl font-bold text-primary-600">2%</div>
              </div>
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <h3 className="text-lg font-semibold">Bank/Card Processing</h3>
                  <p className="text-gray-600">Standard payment processing fees</p>
                </div>
                <div className="text-3xl font-bold text-gray-700">~3%</div>
              </div>
              <div className="flex justify-between items-center bg-primary-50 rounded-lg p-4">
                <div>
                  <h3 className="text-xl font-bold">Total Fee</h3>
                  <p className="text-gray-600">Combined cost per transaction</p>
                </div>
                <div className="text-4xl font-bold text-primary-600">5%</div>
              </div>
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-800">
                  <strong>💡 Pro Tip:</strong> Use bank transfer instead of card payments to reduce fees.
                  Bank transfers may take 2-3 days longer but incur minimal processing fees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Why Choose SecureEscrow
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <LockClosedIcon className="h-12 w-12 text-primary-600 mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Bank-Level Security</h3>
              <p className="text-gray-600">
                Your funds are protected with industry-leading encryption and security measures.
                We never store sensitive payment information.
              </p>
            </div>
            <div>
              <ShieldCheckIcon className="h-12 w-12 text-primary-600 mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Buyer Protection</h3>
              <p className="text-gray-600">
                Funds are only released when you receive what you paid for. Automatic delivery
                tracking ensures transparency every step of the way.
              </p>
            </div>
            <div>
              <BanknotesIcon className="h-12 w-12 text-primary-600 mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Seller Assurance</h3>
              <p className="text-gray-600">
                Get paid quickly after delivery confirmation. No chargebacks or payment disputes
                once the transaction is complete.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Safe Transactions?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of buyers and sellers who trust SecureEscrow for their transactions
          </p>
          <Link
            href="/register"
            className="bg-white text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
          >
            Create Free Account
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <ShieldCheckIcon className="h-6 w-6 text-primary-400" />
                <span className="text-lg font-bold text-white">SecureEscrow</span>
              </div>
              <p className="text-sm text-gray-400">
                Safe transactions for everyone, everywhere.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/security" className="hover:text-white transition-colors">Security</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/disputes" className="hover:text-white transition-colors">Dispute Resolution</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} SecureEscrow Marketplace. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
