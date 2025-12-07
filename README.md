# Secure Escrow Marketplace

A modern, secure escrow marketplace built with Next.js 15, React 19, TypeScript, and Stripe Connect.

## Features

- 🔒 **Bank-Level Security**: Comprehensive security headers, CSP, HTTPS enforcement
- 💳 **Stripe Connect Integration**: Secure payment holding and automatic fund distribution
- 📦 **Automatic Delivery Tracking**: TrackingMore.com API integration
- 🤝 **Multi-Party Confirmation**: Email, passcode, and chat-based confirmation options
- ⚖️ **Dispute Resolution**: Built-in dispute handling workflow
- 🚀 **Modern Stack**: Next.js 15 (App Router), React 19, TypeScript, Prisma, PostgreSQL

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **Payments**: Stripe Connect
- **Tracking**: TrackingMore API
- **UI Components**: Heroicons, Sonner (toast notifications)

## Getting Started

### Prerequisites

- Node.js 18.17.0 or higher
- PostgreSQL database
- Stripe account with Connect enabled
- TrackingMore API key

### Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Set up environment variables**:
```bash
cp .env.example .env
```

Edit `.env` and add your credentials:
- `DATABASE_URL`: PostgreSQL connection string
- `STRIPE_SECRET_KEY`: Stripe secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Stripe publishable key
- `TRACKINGMORE_API_KEY`: TrackingMore API key
- `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`

3. **Set up the database**:
```bash
npx prisma generate
npx prisma db push
```

4. **Run development server**:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── buy/               # Buyer workflows
│   ├── sell/              # Seller workflows
│   ├── dashboard/         # User dashboard
│   └── transactions/      # Transaction management
├── components/            # React components
├── lib/                   # Core utilities
│   ├── prisma.ts         # Database client
│   ├── stripe.ts         # Stripe integration
│   ├── tracking.ts       # TrackingMore integration
│   └── utils.ts          # Helper functions
└── types/                 # TypeScript types
```

## How It Works

### Transaction Flow

1. **Confirmation**: Buyer and seller confirm product details, price, shipping
2. **Payment**: Buyer pays via Stripe - funds held in escrow (not released)
3. **Shipping**: Seller ships product, adds tracking number
4. **Tracking**: System automatically monitors delivery via TrackingMore
5. **Release**: Funds auto-released to seller upon confirmed delivery
6. **Fees**: Platform takes 2% + ~3% bank processing = 5% total

### Security Measures

- HTTPS enforcement via Strict-Transport-Security
- Content Security Policy (CSP) headers
- X-Frame-Options to prevent clickjacking
- Rate limiting on API endpoints
- Input validation with Zod
- SQL injection protection via Prisma ORM
- XSS protection with React's built-in escaping
- CSRF protection via NextAuth.js

### Fee Structure

- **Platform Fee**: 2% of transaction amount
- **Bank/Card Processing**: ~3% (Stripe fees)
- **Total**: ~5% combined
- **Bank Transfer Option**: Lower fees (minimal processing), takes 2-3 days longer

## API Routes

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login existing user

### Transactions
- `POST /api/transactions/create` - Create new transaction
- `POST /api/transactions/[id]/confirm` - Confirm transaction details
- `POST /api/transactions/[id]/pay` - Process payment
- `POST /api/transactions/[id]/ship` - Mark as shipped
- `GET /api/transactions/[id]` - Get transaction details
- `GET /api/transactions` - List user transactions

### Stripe Integration
- `POST /api/stripe/create-connect-account` - Create seller Stripe Connect account
- `POST /api/stripe/webhooks` - Handle Stripe webhook events

### Tracking
- `GET /api/tracking/[transactionId]` - Get tracking updates
- `POST /api/tracking/check` - Manual tracking check

## Deployment

### Environment Setup

1. Set up PostgreSQL database (recommended: Railway, Supabase, or Neon)
2. Configure environment variables in your hosting platform
3. Enable Stripe webhooks pointing to `/api/stripe/webhooks`

### Deploy to Vercel

```bash
vercel deploy
```

### Deploy to Other Platforms

The application can be deployed to any platform supporting Next.js:
- Vercel (recommended)
- Netlify
- Railway
- AWS Amplify
- Self-hosted with Docker

## Security Best Practices

1. **Always use HTTPS in production**
2. **Rotate secrets regularly**: `NEXTAUTH_SECRET`, API keys
3. **Enable Stripe webhook signature verification**
4. **Keep dependencies updated**: Run `npm audit` regularly
5. **Use environment variables**: Never commit secrets to git
6. **Enable rate limiting**: Protect against DoS attacks
7. **Implement logging**: Monitor suspicious activity

## Testing

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Build for production
npm run build
```

## Support

For questions or issues:
- Open an issue on GitHub
- Email: support@escrowmarketplace.com

## License

Proprietary - All rights reserved

## Changelog

### v0.1.0 (2025-12-07)
- Initial release
- Escrow transaction creation and management
- Stripe Connect integration
- TrackingMore delivery confirmation
- Multi-party confirmation system
- Dispute resolution workflow
