import Link from 'next/link';
import {
  ShieldCheckIcon,
  TruckIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  LockClosedIcon,
  UserGroupIcon,
  BanknotesIcon,
  SparklesIcon,
  ClockIcon,
  ShieldExclamationIcon,
} from '@heroicons/react/24/outline';
import {
  CheckBadgeIcon,
  CreditCardIcon,
} from '@heroicons/react/24/solid';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import PricingCalculator from '@/components/ui/PricingCalculator';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheckIcon className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              SecureEscrow
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="#how-it-works" className="text-gray-700 hover:text-primary-600 transition-colors">
              How It Works
            </Link>
            <Link href="#pricing" className="text-gray-700 hover:text-primary-600 transition-colors">
              Pricing
            </Link>
            <Link href="#use-cases" className="text-gray-700 hover:text-primary-600 transition-colors">
              Use Cases
            </Link>
            <Link href="#faq" className="text-gray-700 hover:text-primary-600 transition-colors">
              FAQ
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="bg-gradient-to-r from-primary-600 to-purple-600 text-white px-6 py-2.5 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200 font-semibold"
            >
              Get Started Free
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <SparklesIcon className="h-4 w-4" />
                <span>Trusted by 10,000+ users</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Buy & Sell{' '}
                <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                  Without Risk
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                Your money stays protected until you get exactly what you paid for.
                No scams. No disputes. Just safe transactions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Link
                  href="/buy"
                  className="group bg-gradient-to-r from-primary-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-200 inline-flex items-center justify-center"
                >
                  Start as Buyer
                  <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/sell"
                  className="group bg-white text-gray-900 border-2 border-gray-300 px-8 py-4 rounded-xl text-lg font-semibold hover:border-primary-600 hover:text-primary-600 hover:shadow-lg transition-all duration-200 inline-flex items-center justify-center"
                >
                  Start as Seller
                  <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <CheckBadgeIcon className="h-5 w-5 text-green-500" />
                  <span>No chargebacks</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckBadgeIcon className="h-5 w-5 text-green-500" />
                  <span>Money-back guarantee</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckBadgeIcon className="h-5 w-5 text-green-500" />
                  <span>24/7 support</span>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative lg:ml-auto">
              <div className="bg-white rounded-2xl shadow-2xl p-8 relative">
                <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  ✓ Funds Protected
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <UserGroupIcon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Transaction Created</p>
                        <p className="text-sm text-gray-500">Both parties agree</p>
                      </div>
                    </div>
                    <CheckBadgeIcon className="h-6 w-6 text-green-500" />
                  </div>

                  <div className="flex items-center justify-between pb-4 border-b">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <LockClosedIcon className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Payment Secured</p>
                        <p className="text-sm text-gray-500">Held in escrow</p>
                      </div>
                    </div>
                    <CheckBadgeIcon className="h-6 w-6 text-green-500" />
                  </div>

                  <div className="flex items-center justify-between pb-4 border-b">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <TruckIcon className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Product Shipped</p>
                        <p className="text-sm text-gray-500">Auto-tracked</p>
                      </div>
                    </div>
                    <div className="animate-pulse">
                      <div className="h-6 w-6 bg-orange-500 rounded-full"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <BanknotesIcon className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Funds Released</p>
                        <p className="text-sm text-gray-500">After delivery</p>
                      </div>
                    </div>
                    <span className="text-gray-400">Pending...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">
                $<AnimatedCounter end={15} suffix="M+" />
              </div>
              <div className="text-blue-100">Transactions Protected</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <AnimatedCounter end={10} suffix="K+" />
              </div>
              <div className="text-blue-100">Happy Users</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <AnimatedCounter end={99} suffix=".9%" />
              </div>
              <div className="text-blue-100">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <AnimatedCounter end={24} suffix="/7" />
              </div>
              <div className="text-blue-100">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              The Problem With Online Transactions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Buying or selling online shouldn't feel like gambling with your money
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-4">
                <ShieldExclamationIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Buyer Risk</h3>
              <p className="text-gray-600">
                Send money first and hope the seller actually ships? What if it never arrives or isn't what you ordered?
              </p>
            </div>

            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-4">
                <ClockIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Seller Risk</h3>
              <p className="text-gray-600">
                Ship first and hope the buyer pays? Risk chargebacks weeks after delivery? Lose money on fraud?
              </p>
            </div>

            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-4">
                <CreditCardIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Platform Risk</h3>
              <p className="text-gray-600">
                PayPal holds funds for weeks. Venmo offers zero protection. Wire transfers are irreversible.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-2xl p-8 md:p-12 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircleIcon className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              SecureEscrow Solves All Three
            </h3>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We hold the buyer's payment securely until the seller ships and delivery is confirmed.
              Only then do we release the funds. Everyone's protected, every time.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works - Enhanced */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How SecureEscrow Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple, secure, and automatic. Your transaction protected in 4 easy steps.
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary-200 via-purple-200 to-primary-200 -translate-y-1/2 z-0"></div>

            <div className="grid md:grid-cols-4 gap-8 relative z-10">
              {[
                {
                  icon: UserGroupIcon,
                  title: '1. Agree on Terms',
                  description: 'Both parties confirm product details, price, and shipping. Choose verification method: passcode, email, or in-app.',
                  color: 'blue',
                },
                {
                  icon: LockClosedIcon,
                  title: '2. Buyer Pays',
                  description: 'Payment is securely held in escrow. Seller can see funds are reserved but cannot withdraw yet.',
                  color: 'purple',
                },
                {
                  icon: TruckIcon,
                  title: '3. Seller Ships',
                  description: 'Seller ships and adds tracking number. We automatically monitor delivery status via TrackingMore.',
                  color: 'orange',
                },
                {
                  icon: CheckCircleIcon,
                  title: '4. Auto-Release',
                  description: 'Once delivery is confirmed, funds are automatically released to seller minus our 5% fee.',
                  color: 'green',
                },
              ].map((step, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow p-6 border-2 border-gray-100">
                  <div className={`w-16 h-16 bg-${step.color}-100 rounded-full flex items-center justify-center mb-4 mx-auto`}>
                    <step.icon className={`h-8 w-8 text-${step.color}-600`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="use-cases" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Perfect For Any Transaction
            </h2>
            <p className="text-xl text-gray-600">
              From Facebook Marketplace to freelance work, we've got you covered
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Marketplace Sales',
                examples: 'Facebook, Craigslist, OfferUp',
                description: 'Buy and sell locally or ship nationwide with complete protection',
                emoji: '🛒',
              },
              {
                title: 'Freelance Services',
                examples: 'Design, Development, Writing',
                description: 'Client pays upfront, freelancer gets paid after delivery',
                emoji: '💼',
              },
              {
                title: 'High-Value Items',
                examples: 'Electronics, Jewelry, Collectibles',
                description: 'Extra protection for expensive purchases and sales',
                emoji: '💎',
              },
              {
                title: 'Vehicle Sales',
                examples: 'Cars, Motorcycles, Boats',
                description: 'Secure large transactions with automatic title verification',
                emoji: '🚗',
              },
              {
                title: 'Digital Products',
                examples: 'Software, Domains, Accounts',
                description: 'Ensure transfer is complete before releasing payment',
                emoji: '💻',
              },
              {
                title: 'Event Tickets',
                examples: 'Concerts, Sports, Festivals',
                description: 'No more fake tickets or getting scammed',
                emoji: '🎫',
              },
            ].map((useCase, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100"
              >
                <div className="text-4xl mb-4">{useCase.emoji}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {useCase.title}
                </h3>
                <p className="text-sm text-primary-600 font-medium mb-3">
                  {useCase.examples}
                </p>
                <p className="text-gray-600">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Calculator */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Only 5% total. No hidden fees, no surprises.
            </p>
          </div>

          <PricingCalculator />

          <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-3xl font-bold text-primary-600 mb-2">2%</div>
              <div className="text-sm text-gray-600">Platform Fee</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-3xl font-bold text-primary-600 mb-2">~3%</div>
              <div className="text-sm text-gray-600">Payment Processing</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-3xl font-bold text-green-600 mb-2">5%</div>
              <div className="text-sm text-gray-600">Total Cost</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: 'How long does it take to release funds?',
                a: 'Funds are automatically released once delivery is confirmed via tracking. This typically takes 1-2 days after delivery.',
              },
              {
                q: 'What if the item never arrives?',
                a: "If tracking shows no delivery after the expected timeframe, you can open a dispute and get a full refund. Your money is 100% protected.",
              },
              {
                q: 'Can I use this for international transactions?',
                a: 'Yes! We support international shipping and tracking for most major carriers worldwide.',
              },
              {
                q: 'What happens if there\'s a dispute?',
                a: 'Either party can open a dispute. Our team reviews the case, checks tracking data, and makes a fair decision within 3-5 business days.',
              },
              {
                q: 'Is my payment information secure?',
                a: 'Absolutely. We use Stripe for payment processing (same as Amazon, Google). We never store your card details.',
              },
              {
                q: 'Can sellers really trust buyers won\'t chargeback?',
                a: 'Yes! Once funds are released after confirmed delivery, the transaction is final. No chargebacks allowed.',
              },
            ].map((faq, index) => (
              <details
                key={index}
                className="bg-gray-50 rounded-lg p-6 group hover:bg-gray-100 transition-colors"
              >
                <summary className="font-semibold text-lg text-gray-900 cursor-pointer flex items-center justify-between">
                  {faq.q}
                  <span className="text-primary-600 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transact With Confidence?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands who never worry about getting scammed again
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-white text-primary-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all inline-flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Create Free Account
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/how-it-works"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-primary-600 transition-all inline-flex items-center justify-center"
            >
              Learn More
            </Link>
          </div>
          <p className="mt-8 text-blue-100 text-sm">
            No credit card required • Setup in 60 seconds • First transaction free
          </p>
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
                <li><Link href="/api" className="hover:text-white transition-colors">API</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/disputes" className="hover:text-white transition-colors">Dispute Resolution</Link></li>
                <li><Link href="/status" className="hover:text-white transition-colors">System Status</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} SecureEscrow Marketplace. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
