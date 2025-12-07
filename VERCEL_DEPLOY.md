# 🚀 Vercel Deployment Guide

## ✅ Everything is Ready!

All code is committed and pushed to GitHub. Vercel will handle the deployment automatically.

---

## 📋 **Pre-Deployment Checklist**

Before deploying, make sure you have:

### **1. Database (Choose One)**

**Option A: Vercel Postgres (Easiest)**
- Go to your Vercel Dashboard
- Storage → Create Database → Postgres
- Copy connection string
- It auto-adds to your project's env vars

**Option B: Supabase (Recommended)**
```bash
1. Go to supabase.com → Create Project
2. Wait 2 minutes for setup
3. Settings → Database → Connection String → URI
4. Copy: postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres
```

**Option C: Railway**
```bash
1. Go to railway.app → New Project
2. Add PostgreSQL
3. Variables tab → Copy DATABASE_URL
```

### **2. Stripe Account**
```bash
1. Go to stripe.com → Sign in
2. Switch to Test Mode (toggle top-right)
3. Developers → API keys
4. Copy:
   - Publishable key: pk_test_...
   - Secret key: sk_test_...
5. Connect → Get Started → Copy Client ID: ca_...
```

### **3. Generate Secrets**
```bash
# On your terminal:
openssl rand -base64 32
# Copy this for NEXTAUTH_SECRET

openssl rand -base64 32
# Copy this for CRON_SECRET
```

---

## 🎯 **Step-by-Step Vercel Deployment**

### **Step 1: Import to Vercel**

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"Add New..."** → **"Project"**
4. Find `stripe_escrow_market`
5. Click **"Import"**

### **Step 2: Configure Build Settings**

Vercel should auto-detect Next.js. Verify:

```
Framework Preset: Next.js
Build Command: npm run build  (auto-detected)
Output Directory: .next  (auto-detected)
Install Command: npm install  (auto-detected)
Root Directory: ./
```

**Don't click "Deploy" yet!** First, add environment variables.

### **Step 3: Add Environment Variables**

Click **"Environment Variables"** and add these:

```bash
# Database (REQUIRED)
DATABASE_URL
postgresql://user:pass@host:5432/dbname

# NextAuth (REQUIRED)
NEXTAUTH_SECRET
<paste output from: openssl rand -base64 32>

NEXTAUTH_URL
https://your-app-name.vercel.app
# (You'll update this after first deploy)

# Stripe (REQUIRED)
STRIPE_SECRET_KEY
sk_test_your_key_here

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
pk_test_your_key_here

STRIPE_WEBHOOK_SECRET
whsec_your_webhook_secret
# (Add after setting up webhooks)

STRIPE_CONNECT_CLIENT_ID
ca_your_connect_id

# TrackingMore (OPTIONAL)
TRACKINGMORE_API_KEY
your_api_key

# Cron Jobs
CRON_SECRET
<paste output from: openssl rand -base64 32>

# Fees (DEFAULTS)
PLATFORM_FEE_PERCENTAGE
2

BANK_FEE_PERCENTAGE
3
```

**Important:** Set environment for **All** (Production, Preview, Development)

### **Step 4: Deploy!**

1. Click **"Deploy"**
2. Wait 2-3 minutes for build
3. You'll get a URL like: `https://stripe-escrow-market-abc123.vercel.app`

### **Step 5: Update NEXTAUTH_URL**

After first deploy:
1. Copy your Vercel URL
2. Go to: Settings → Environment Variables
3. Find `NEXTAUTH_URL`
4. Update to: `https://your-actual-url.vercel.app`
5. Click **"Redeploy"** (Deployments → Three dots → Redeploy)

### **Step 6: Run Database Migration**

**Option A: Using Vercel CLI (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Link to your project
vercel link

# Pull environment variables
vercel env pull .env.local

# Run Prisma migration
npx prisma generate
npx prisma db push
```

**Option B: Manually with Database URL**
```bash
# Temporarily set DATABASE_URL
export DATABASE_URL="postgresql://..." # Your production DB

# Run migration
npx prisma generate
npx prisma db push
```

### **Step 7: Set Up Stripe Webhooks**

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Developers → Webhooks → Add endpoint
3. Endpoint URL: `https://your-app.vercel.app/api/stripe/webhooks`
4. Select events:
   - ✓ payment_intent.succeeded
   - ✓ payment_intent.payment_failed
   - ✓ account.updated
   - ✓ transfer.created
5. Click "Add endpoint"
6. Click "Reveal" signing secret
7. Copy `whsec_...`
8. Go to Vercel → Environment Variables
9. Update `STRIPE_WEBHOOK_SECRET`
10. Redeploy

### **Step 8: Verify Deployment**

Visit these URLs to verify:

```bash
# Main homepage
https://your-app.vercel.app/

# Escrow page
https://your-app.vercel.app/escrow

# Health check
https://your-app.vercel.app/api/health
# Should return: {"status":"connected","database":"healthy"}

# Environment check
https://your-app.vercel.app/api/env-check
# Should return: {"status":"healthy","missingCount":0}
```

---

## 🔧 **If Deployment Fails**

### **Check Build Logs**
```
Vercel Dashboard → Deployments → Latest → Build Logs
```

**Common errors:**

**1. "Cannot find module '@prisma/client'"**
```bash
# Fix: Prisma needs to be in dependencies
# Check package.json - it should be there already
# If not, add and commit:
npm install @prisma/client
git add package.json package-lock.json
git commit -m "fix: ensure prisma client in dependencies"
git push
```

**2. "DATABASE_URL is not defined"**
```bash
# Fix: Add DATABASE_URL to Vercel env vars
# Then redeploy
```

**3. "Build failed"**
```bash
# Fix: Clear cache and redeploy
# Deployments → Three dots → Redeploy
# Uncheck "Use existing Build Cache"
```

### **Check Runtime Logs**
```
Vercel Dashboard → Your Project → Functions → View logs
```

---

## 🎉 **Success Checklist**

After deployment, verify:

- [ ] `/` loads (homepage)
- [ ] `/escrow` loads (escrow page)
- [ ] `/api/health` returns `{"status":"connected"}`
- [ ] `/api/env-check` returns `{"missingCount":0}`
- [ ] No errors in browser console
- [ ] Can click "Get Started" button
- [ ] Styles load correctly (Tailwind CSS)

---

## 🔄 **Enable Auto-Deploy**

Vercel automatically redeploys when you push to GitHub:

```bash
# Make any changes locally
git add .
git commit -m "your changes"
git push origin claude/stripe-escrow-marketplace-01TFJvpcDBT8sGnEdMxyJsn3

# Vercel automatically deploys! 🎉
```

---

## 🚨 **Quick Fixes**

**Homepage shows blank/white screen:**
```bash
# Check browser console for errors
# Check /api/health - if fails, DB issue
# Check Vercel function logs
```

**Styles not loading:**
```bash
# Clear Vercel cache:
# Deployments → Redeploy → Uncheck cache
```

**Database connection failed:**
```bash
# Verify DATABASE_URL is correct
# Check database is accepting connections
# Try connecting with Prisma Studio locally
```

---

## 📞 **Need Help?**

1. Check `/api/health` - tells you if DB is connected
2. Check `/api/env-check` - tells you what's missing
3. Check Vercel build logs - shows build errors
4. Check Vercel function logs - shows runtime errors
5. Read TROUBLESHOOTING.md in the repo

---

## 🎯 **Expected Result**

After deployment, you should see:

**Homepage (`/`):**
- Modern landing page
- Hero with "Buy & Sell Without Risk"
- Animated stats bar
- Problem/solution section
- How it works (4 steps)
- Use cases (6 scenarios)
- Interactive pricing calculator
- FAQ section
- CTAs throughout

**Escrow Page (`/escrow`):**
- Video placeholder
- "What is Escrow" explanation
- 5-step working model
- Money flow diagram
- Dispute scenarios

---

## 🚀 **You're All Set!**

All code is pushed to:
```
Branch: claude/stripe-escrow-marketplace-01TFJvpcDBT8sGnEdMxyJsn3
Repo: gadgetboy27/stripe_escrow_market
```

**Just import to Vercel, add env vars, and deploy!**

---

**Questions? Check:**
- `TROUBLESHOOTING.md` - Detailed debugging
- `DEPLOYMENT.md` - Full deployment guide
- `/api/health` - Quick health check
- `/api/env-check` - Env var verification
