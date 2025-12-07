# Deployment Guide - Secure Escrow Marketplace

## Prerequisites

1. **GitHub Account**: For repository hosting
2. **Vercel Account**: For hosting (recommended) or other Next.js hosting platform
3. **PostgreSQL Database**: Railway, Supabase, Neon, or AWS RDS
4. **Stripe Account**: With Connect enabled
5. **TrackingMore Account**: For package tracking API
6. **Domain Name** (optional): For custom domain

## Step-by-Step Deployment

### 1. Database Setup

#### Option A: Supabase (Recommended for beginners)

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Copy the "Connection String" from Settings → Database
4. Format: `postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres`

#### Option B: Railway

1. Go to [railway.app](https://railway.app)
2. Create new project → Add PostgreSQL
3. Copy connection string from Variables tab

#### Option C: Neon

1. Go to [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string

### 2. Stripe Setup

1. **Create Stripe Account**
   - Go to [stripe.com](https://stripe.com)
   - Complete account setup

2. **Enable Stripe Connect**
   - Dashboard → Connect → Get started
   - Fill in platform profile details
   - Select "Express" account type

3. **Get API Keys**
   - Dashboard → Developers → API keys
   - Copy "Publishable key" and "Secret key"
   - Save both securely

4. **Create Webhook**
   - Dashboard → Developers → Webhooks
   - Add endpoint: `https://yourdomain.com/api/stripe/webhooks`
   - Select events to listen for:
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
     - `account.updated`
     - `transfer.created`
   - Copy webhook signing secret

### 3. TrackingMore Setup

1. Go to [trackingmore.com](https://www.trackingmore.com)
2. Sign up for free account
3. Get API key from Dashboard → API

### 4. Environment Variables

Create `.env` file with the following:

```bash
# App
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://yourdomain.com

# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=  # Generate with: openssl rand -base64 32

# Stripe
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_CONNECT_CLIENT_ID=ca_...

# TrackingMore
TRACKINGMORE_API_KEY=...

# Email (Optional - for SendGrid/Mailgun/etc)
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=...
SMTP_FROM=noreply@yourdomain.com

# Security
CRON_SECRET=  # Generate with: openssl rand -base64 32
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_WINDOW_MS=900000

# Fees
PLATFORM_FEE_PERCENTAGE=2
BANK_FEE_PERCENTAGE=3
```

### 5. Deploy to Vercel

#### Via Vercel Dashboard

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables from `.env`
   - Click "Deploy"

#### Via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

4. **Add Environment Variables**
   ```bash
   vercel env add NEXTAUTH_SECRET
   vercel env add DATABASE_URL
   # ... add all env vars
   ```

### 6. Database Migration

After deployment, run database migration:

```bash
# If you have Vercel CLI
vercel env pull .env.local
npx prisma generate
npx prisma db push

# Or via Vercel dashboard
# Go to Project → Settings → Environment Variables
# Then run migrations locally with production DATABASE_URL
```

### 7. Set Up Cron Jobs

For tracking updates and auto-release of funds:

#### Option A: Vercel Cron (Recommended)

Create `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/tracking/check",
      "schedule": "0 * * * *"
    },
    {
      "path": "/api/cron/auto-release",
      "schedule": "0 */6 * * *"
    }
  ]
}
```

#### Option B: External Cron (e.g., cron-job.org)

1. Go to [cron-job.org](https://cron-job.org)
2. Create free account
3. Add new cron job:
   - URL: `https://yourdomain.com/api/tracking/check`
   - Schedule: Every hour
   - Add header: `Authorization: Bearer YOUR_CRON_SECRET`
4. Add second job:
   - URL: `https://yourdomain.com/api/cron/auto-release`
   - Schedule: Every 6 hours

### 8. Custom Domain (Optional)

1. **In Vercel**
   - Project → Settings → Domains
   - Add your domain
   - Copy DNS records

2. **In Domain Registrar**
   - Add DNS records provided by Vercel
   - Wait for DNS propagation (5-30 minutes)

3. **Update Environment**
   - Update `NEXT_PUBLIC_APP_URL` to your domain
   - Update `NEXTAUTH_URL` to your domain
   - Redeploy

### 9. SSL Certificate

Vercel automatically provisions SSL certificates. Verify:
- Visit `https://yourdomain.com`
- Check for padlock icon
- Certificate should be valid

### 10. Post-Deployment Checklist

- [ ] Test user registration
- [ ] Test login/logout
- [ ] Create test transaction
- [ ] Test payment flow (use Stripe test cards)
- [ ] Test shipping/tracking
- [ ] Verify email notifications work
- [ ] Test dispute creation
- [ ] Check Stripe webhook receiving events
- [ ] Verify cron jobs running
- [ ] Test on mobile devices
- [ ] Run security audit: `npm audit`
- [ ] Check performance: [PageSpeed Insights](https://pagespeed.web.dev/)

## Monitoring

### Vercel Analytics

1. Enable Analytics in Vercel dashboard
2. Monitor traffic, errors, and performance

### Stripe Dashboard

1. Monitor transactions in real-time
2. Set up email alerts for:
   - Failed payments
   - Disputes
   - Large transactions

### Error Tracking (Optional)

Consider adding [Sentry](https://sentry.io):

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

## Scaling Considerations

### Database

- Start with free tier
- Upgrade when you reach 10,000+ transactions
- Enable connection pooling for better performance

### Caching

Add Redis for session storage and caching:

```bash
npm install ioredis
```

### CDN

Vercel includes CDN by default for static assets.

## Security Hardening

1. **Enable 2FA** on all service accounts (Vercel, Stripe, etc.)
2. **Rotate secrets** every 90 days
3. **Monitor logs** for suspicious activity
4. **Set up alerts** for:
   - Failed login attempts
   - Large transactions
   - API errors
5. **Regular backups** of database
6. **Keep dependencies updated**: `npm audit fix`

## Backup Strategy

### Database Backups

**Supabase**: Automatic daily backups (paid plan)

**Manual Backup**:
```bash
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql
```

### Code Backups

- GitHub repository (primary)
- Download monthly archives

## Rollback Plan

If deployment fails:

1. **Vercel**: Click "Rollback" to previous deployment
2. **Database**: Restore from backup if migrations failed
3. **Secrets**: Keep previous versions of `.env` file

## Support

- **Vercel**: [vercel.com/support](https://vercel.com/support)
- **Stripe**: [support.stripe.com](https://support.stripe.com)
- **Next.js**: [nextjs.org/docs](https://nextjs.org/docs)

## Cost Estimate

**Monthly costs for ~1,000 transactions**:

- Vercel Hobby: $0 (free tier sufficient for start)
- Database (Supabase/Railway): $0-25
- Stripe fees: 2.9% + $0.30 per transaction
- TrackingMore: $0-49 (free tier: 100 shipments/month)
- Domain: $10-15/year

**Total**: ~$0-50/month initially

## Production Checklist

- [ ] All environment variables set
- [ ] Database migrated successfully
- [ ] Stripe webhooks configured
- [ ] Cron jobs active
- [ ] SSL certificate valid
- [ ] Custom domain configured (if applicable)
- [ ] Error monitoring setup
- [ ] Backup strategy in place
- [ ] Security headers verified
- [ ] Performance optimized
- [ ] Mobile responsive tested
- [ ] Terms of Service added
- [ ] Privacy Policy added
- [ ] GDPR compliance reviewed (if EU users)

---

**Last Updated**: December 2025
