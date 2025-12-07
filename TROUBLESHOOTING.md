# 🔧 Deployment Verification & Troubleshooting Guide

## ⚠️ Current Status

Your repo has **all the escrow marketplace components**, but deployment may be broken due to:
- Missing environment variables
- Database not migrated
- Stripe webhooks not configured
- Dependencies not installed

---

## ✅ Step-by-Step Verification Checklist

### **1. Verify Environment Variables**

Go to your Vercel project → Settings → Environment Variables and check:

#### **Required Variables:**
```bash
# Database (CRITICAL)
DATABASE_URL=postgresql://user:pass@host:5432/dbname

# NextAuth (CRITICAL)
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>

# Stripe (CRITICAL)
STRIPE_SECRET_KEY=sk_live_... (or sk_test_...)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_... (or pk_test_...)
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_CONNECT_CLIENT_ID=ca_...

# TrackingMore (OPTIONAL but recommended)
TRACKINGMORE_API_KEY=your_key

# Cron Jobs
CRON_SECRET=<generate with: openssl rand -base64 32>

# Fees
PLATFORM_FEE_PERCENTAGE=2
BANK_FEE_PERCENTAGE=3
```

#### **How to Check:**
```bash
# In Vercel Dashboard:
# 1. Go to your project
# 2. Settings → Environment Variables
# 3. Ensure ALL variables from .env.example are set
# 4. Set for "Production", "Preview", and "Development"
```

---

### **2. Database Setup & Migration**

#### **Option A: Using Vercel Postgres (Easiest)**
```bash
# In Vercel Dashboard:
# 1. Storage → Create Database → Postgres
# 2. Copy connection string
# 3. Add to Environment Variables as DATABASE_URL
```

#### **Option B: Using Supabase (Recommended)**
```bash
# 1. Go to supabase.com
# 2. Create new project
# 3. Settings → Database → Connection String (URI)
# 4. Copy and add to Vercel env vars
```

#### **Run Migrations:**
```bash
# Locally with production DATABASE_URL:
npm install
npx prisma generate
npx prisma db push

# Or use Vercel CLI:
vercel env pull .env.local
npx prisma generate
npx prisma db push
```

---

### **3. Check Vercel Build Logs**

#### **Where to Look:**
```
Vercel Dashboard → Your Project → Deployments → Latest Deployment → Build Logs
```

#### **Common Errors:**

**Error: "Cannot find module '@prisma/client'"**
```bash
# Fix: Ensure prisma is in dependencies (not devDependencies)
# In package.json:
"dependencies": {
  "@prisma/client": "^5.20.0"
}
"devDependencies": {
  "prisma": "^5.20.0"
}
```

**Error: "DATABASE_URL is not defined"**
```bash
# Fix: Add DATABASE_URL to Vercel environment variables
# Then redeploy
```

**Error: "Module not found: Can't resolve 'next-auth'"**
```bash
# Fix: Ensure all dependencies are installed
# Delete node_modules and package-lock.json
# Run: npm install
# Commit and push
```

---

### **4. Test Locally in Production Mode**

```bash
# 1. Clone the repo fresh
git clone https://github.com/gadgetboy27/stripe_escrow_market.git
cd stripe_escrow_market

# 2. Switch to the correct branch
git checkout claude/stripe-escrow-marketplace-01TFJvpcDBT8sGnEdMxyJsn3

# 3. Install dependencies
npm install

# 4. Set up environment variables
cp .env.example .env
# Edit .env with your real credentials

# 5. Generate Prisma client
npx prisma generate

# 6. Push database schema
npx prisma db push

# 7. Build for production
npm run build

# 8. Run in production mode
npm start

# 9. Test at http://localhost:3000
```

#### **Expected Output:**
- ✅ Build completes without errors
- ✅ Server starts on port 3000
- ✅ Homepage loads with all sections
- ✅ /escrow page loads
- ✅ No console errors in browser

---

### **5. Stripe Webhook Configuration**

#### **Setup Webhooks:**

1. **Go to Stripe Dashboard**
   - Dashboard → Developers → Webhooks
   - Click "Add endpoint"

2. **Endpoint URL:**
   ```
   https://your-app.vercel.app/api/stripe/webhooks
   ```

3. **Select Events:**
   ```
   ✓ payment_intent.succeeded
   ✓ payment_intent.payment_failed
   ✓ account.updated
   ✓ transfer.created
   ✓ transfer.updated
   ✓ charge.refunded
   ```

4. **Get Signing Secret:**
   - After creating, click on the webhook
   - Click "Reveal" under "Signing secret"
   - Copy the `whsec_...` value

5. **Add to Vercel:**
   - Vercel → Environment Variables
   - Add `STRIPE_WEBHOOK_SECRET=whsec_...`
   - Redeploy

#### **Test Webhook:**
```bash
# Use Stripe CLI to test locally
stripe listen --forward-to localhost:3000/api/stripe/webhooks
stripe trigger payment_intent.succeeded
```

---

### **6. Test Full Transaction Flow**

#### **Step-by-Step Test:**

**A. Register Accounts**
```
1. Go to /register
2. Create BUYER account: buyer@test.com / password123
3. Create SELLER account: seller@test.com / password123
```

**B. Create Transaction**
```
1. Login as BUYER
2. Create transaction with:
   - Seller email: seller@test.com
   - Product: "Test Item"
   - Price: $100
   - Confirmation: PASSCODE
3. Note the passcode
```

**C. Confirm Transaction**
```
1. Login as SELLER
2. Go to transactions
3. Confirm with passcode
4. Login as BUYER
5. Confirm with passcode
```

**D. Process Payment**
```
1. As BUYER, pay with test card
2. Use: 4242 4242 4242 4242
3. Expiry: Any future date
4. CVC: Any 3 digits
5. Check: Payment shows as "PAYMENT_HELD"
```

**E. Ship Product**
```
1. Login as SELLER
2. Mark as shipped
3. Add tracking: TEST123456789
4. Carrier: USPS
```

**F. Verify Auto-Release**
```
1. Manually trigger tracking check:
   POST /api/tracking/check
   Header: Authorization: Bearer YOUR_CRON_SECRET

2. Check transaction status changed to DELIVERED
3. Trigger auto-release:
   POST /api/cron/auto-release
   Header: Authorization: Bearer YOUR_CRON_SECRET

4. Verify funds released to seller
```

---

### **7. Common Issues & Fixes**

#### **Issue: "Page not found" for /escrow**
**Fix:**
```bash
# Ensure file exists at: src/app/escrow/page.tsx
# Rebuild and redeploy
npm run build
git add .
git commit -m "fix: ensure escrow page exists"
git push
```

#### **Issue: Prisma Client errors**
**Fix:**
```bash
# Regenerate Prisma client
npx prisma generate

# Push schema again
npx prisma db push

# Rebuild
npm run build
```

#### **Issue: NextAuth errors**
**Fix:**
```bash
# Ensure NEXTAUTH_SECRET is set
openssl rand -base64 32

# Add to Vercel env vars
# Redeploy
```

#### **Issue: Stripe errors**
**Fix:**
```bash
# Verify Stripe keys are correct
# Use TEST keys first: sk_test_... and pk_test_...
# Ensure webhook secret matches Stripe dashboard
```

#### **Issue: CSS not loading / styles broken**
**Fix:**
```bash
# Ensure Tailwind is configured correctly
# Check tailwind.config.ts exists
# Verify globals.css has @tailwind directives
# Rebuild
```

---

### **8. Debugging Tools**

#### **Check Database Connection:**
```typescript
// Create: src/app/api/test-db/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    await prisma.$connect();
    const userCount = await prisma.user.count();
    return NextResponse.json({
      status: 'connected',
      userCount
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      error: String(error)
    }, { status: 500 });
  }
}
```

**Test:** Visit `https://your-app.vercel.app/api/test-db`

#### **Check Environment Variables:**
```typescript
// Create: src/app/api/test-env/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    hasDatabase: !!process.env.DATABASE_URL,
    hasNextAuth: !!process.env.NEXTAUTH_SECRET,
    hasStripe: !!process.env.STRIPE_SECRET_KEY,
    hasStripePublic: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  });
}
```

**Test:** Visit `https://your-app.vercel.app/api/test-env`

---

### **9. Quick Fix Commands**

```bash
# Fix: Reinstall everything
rm -rf node_modules package-lock.json .next
npm install
npm run build

# Fix: Reset Prisma
npx prisma generate --force
npx prisma db push --force-reset

# Fix: Clear Vercel cache and redeploy
# In Vercel Dashboard:
# Deployments → Three dots → Redeploy (uncheck "Use existing build cache")

# Fix: Check what's actually deployed
# Download deployment from Vercel
vercel pull
cd .vercel/project.json
# Check if all files are there
```

---

## 🎯 **Most Likely Issues (Priority Order)**

1. **DATABASE_URL not set** → Add to Vercel env vars
2. **Prisma not generated** → Run `npx prisma generate && npx prisma db push`
3. **Dependencies not installed** → Run `npm install` and commit
4. **NEXTAUTH_SECRET missing** → Generate and add to Vercel
5. **Stripe keys incorrect** → Verify in Stripe Dashboard
6. **Wrong Node version** → Ensure Node 18+ in Vercel settings

---

## 📞 **Need Help?**

If stuck, check:
- Vercel deployment logs
- Browser console (F12)
- Network tab for failed API calls
- Prisma Studio: `npx prisma studio` to see DB directly

---

## ✅ **Success Checklist**

- [ ] All env vars set in Vercel
- [ ] Database connected and migrated
- [ ] Build succeeds without errors
- [ ] Homepage loads (/)
- [ ] Escrow page loads (/escrow)
- [ ] Can register new user
- [ ] Can login
- [ ] Can create transaction
- [ ] Stripe test payment works
- [ ] No errors in console

**If all checked:** You're good to go! 🚀

---

## 🔄 **Quick Deploy Command**

```bash
# After fixing locally:
git add .
git commit -m "fix: resolve deployment issues"
git push origin claude/stripe-escrow-marketplace-01TFJvpcDBT8sGnEdMxyJsn3

# Vercel auto-deploys on push
# Or manually: vercel --prod
```

---

**Last Updated:** Dec 2025
