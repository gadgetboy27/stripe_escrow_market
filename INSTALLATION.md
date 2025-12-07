# Installation Guide

## Quick Start (Development)

### 1. Install Dependencies

**Note**: Due to network restrictions in some environments, you may need to run this on your local machine.

```bash
npm install
```

If you encounter issues, try:

```bash
npm install --legacy-peer-deps
```

### 2. Set Up Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and add your credentials. For development, you can use these test values:

```bash
# App
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database - Use local PostgreSQL or online service
DATABASE_URL="postgresql://user:password@localhost:5432/escrow_dev"

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=  # Generate: openssl rand -base64 32

# Stripe (use test keys)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_CONNECT_CLIENT_ID=ca_...

# TrackingMore
TRACKINGMORE_API_KEY=your_test_api_key

# Cron Secret
CRON_SECRET=dev-secret-12345

# Fees
PLATFORM_FEE_PERCENTAGE=2
BANK_FEE_PERCENTAGE=3
```

### 3. Set Up Database

#### Option A: Local PostgreSQL

Install PostgreSQL on your machine, then:

```bash
# Create database
createdb escrow_dev

# Update DATABASE_URL in .env
# Then run:
npx prisma generate
npx prisma db push
```

#### Option B: Online Database (Easier)

Use Supabase, Railway, or Neon (all have free tiers):

1. Create account and new PostgreSQL database
2. Copy connection string
3. Paste in `.env` as `DATABASE_URL`
4. Run:

```bash
npx prisma generate
npx prisma db push
```

### 4. Get Stripe Test Keys

1. Go to [dashboard.stripe.com/test/apikeys](https://dashboard.stripe.com/test/apikeys)
2. Copy "Publishable key" and "Secret key"
3. Add to `.env`

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## First Time Setup

### Create Test Users

Use the registration page or create directly in database:

**Buyer Account**:
- Email: buyer@test.com
- Password: testbuyer123
- Role: BUYER

**Seller Account**:
- Email: seller@test.com
- Password: testseller123
- Role: SELLER

### Test Transaction Flow

1. Login as buyer
2. Create transaction with seller's email
3. Both parties confirm
4. Buyer pays (use Stripe test card: `4242 4242 4242 4242`)
5. Seller adds tracking number
6. System checks delivery status
7. Funds auto-release

## Stripe Test Cards

Use these for testing payments:

- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **3D Secure**: 4000 0025 0000 3155

Any future expiry date, any 3-digit CVC.

## Common Issues

### "Cannot connect to database"

- Check DATABASE_URL is correct
- Ensure database is running
- Check firewall/network settings

### "Module not found"

```bash
rm -rf node_modules package-lock.json
npm install
```

### "Prisma Client not generated"

```bash
npx prisma generate
```

### "Stripe API error"

- Check STRIPE_SECRET_KEY is correct
- Ensure using test key (starts with `sk_test_`)
- Verify Stripe account is active

## Development Workflow

### Making Database Changes

1. Edit `prisma/schema.prisma`
2. Run `npx prisma db push`
3. Run `npx prisma generate`

### Testing Webhooks Locally

Use Stripe CLI:

```bash
# Install
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks
stripe listen --forward-to localhost:3000/api/stripe/webhooks
```

### Running Type Checks

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

## Project Structure

```
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/
│   │   ├── api/               # API routes
│   │   │   ├── auth/         # Authentication
│   │   │   ├── transactions/ # Transaction management
│   │   │   ├── stripe/       # Stripe integration
│   │   │   ├── tracking/     # Package tracking
│   │   │   └── disputes/     # Dispute handling
│   │   ├── page.tsx          # Landing page
│   │   └── layout.tsx        # Root layout
│   ├── components/           # React components
│   ├── lib/
│   │   ├── prisma.ts         # Database client
│   │   ├── stripe.ts         # Stripe client
│   │   ├── tracking.ts       # TrackingMore client
│   │   ├── auth.ts           # NextAuth config
│   │   └── utils.ts          # Utilities
│   └── types/
│       └── index.ts          # TypeScript types
├── .env.example              # Environment template
├── next.config.ts            # Next.js config
├── tailwind.config.ts        # Tailwind config
└── package.json              # Dependencies
```

## Next Steps

1. **Read README.md** for full feature overview
2. **Review DEPLOYMENT.md** for production deployment
3. **Check src/app/api/** to understand API endpoints
4. **Explore prisma/schema.prisma** for data models
5. **Test the escrow flow** end-to-end

## Getting Help

- Check documentation files in root directory
- Review code comments in `src/lib/` files
- Test API endpoints with Postman/Insomnia
- Check Prisma Studio: `npx prisma studio`

## Useful Commands

```bash
# Development
npm run dev                 # Start dev server
npm run build              # Build for production
npm run start              # Start production server
npm run type-check         # Run TypeScript checks
npm run lint               # Run ESLint

# Database
npx prisma studio          # Open database GUI
npx prisma db push         # Push schema changes
npx prisma generate        # Generate Prisma Client
npx prisma migrate dev     # Create migration

# Stripe
stripe listen              # Listen to webhooks
stripe trigger payment_intent.succeeded  # Trigger test event
```

---

**Happy Coding!** 🚀
