# 🧪 Complete Escrow Transaction Testing Guide

This guide walks you through testing the full escrow transaction lifecycle.

---

## **Prerequisites**

### 1. Get Stripe Test Keys
1. Go to https://dashboard.stripe.com/test/apikeys
2. Copy your **Publishable key** (starts with `pk_test_`)
3. Copy your **Secret key** (starts with `sk_test_`)

### 2. Set Up Environment Variables in Vercel
```bash
# Required for testing
DATABASE_URL=your_postgres_connection_string
NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32
NEXTAUTH_URL=https://your-app.vercel.app
STRIPE_SECRET_KEY=sk_test_your_test_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_test_key
STRIPE_CONNECT_CLIENT_ID=ca_your_connect_id (optional for now)
TRACKINGMORE_API_KEY=your_key (optional for now)
CRON_SECRET=generate_with_openssl_rand_base64_32
```

### 3. Run Database Migration
```bash
# In Vercel terminal or locally
npx prisma db push
```

---

## **Test Flow: Complete Transaction**

### **Phase 1: User Registration**

#### Register Buyer Account
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "Test Buyer",
  "email": "buyer@test.com",
  "password": "testpass123"
}
```

#### Register Seller Account
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "Test Seller",
  "email": "seller@test.com",
  "password": "testpass123"
}
```

**✅ Success:** You should receive user objects with IDs

---

### **Phase 2: Create Transaction (as Buyer)**

1. **Login as buyer** at `/login`
2. **Go to** `/buy`
3. **Fill in the form:**
   - Product Name: `Vintage Guitar`
   - Product URL: `https://example.com/guitar`
   - Amount: `1000`
   - Seller Email: `seller@test.com`
4. **Click** "Create Escrow Transaction"

**API Call (if testing via API):**
```bash
POST /api/transactions/create
Authorization: Bearer {buyer_jwt_token}
Content-Type: application/json

{
  "productName": "Vintage Guitar",
  "productUrl": "https://example.com/guitar",
  "amount": 1000,
  "currency": "usd",
  "sellerEmail": "seller@test.com"
}
```

**✅ Expected Result:**
- Transaction created with status: `PENDING_CONFIRMATION`
- Transaction ID returned (save this!)
- Seller receives email notification (if configured)

---

### **Phase 3: Seller Confirms Transaction**

1. **Logout and login as seller**
2. **Go to** `/sell` (should see pending transaction)
3. **Click** "Confirm Transaction"
4. **Review details and confirm**

**API Call:**
```bash
POST /api/transactions/{transaction_id}/confirm
Authorization: Bearer {seller_jwt_token}
Content-Type: application/json

{
  "passcode": "optional_verification_code"
}
```

**✅ Expected Result:**
- Transaction status: `PENDING_CONFIRMATION` → `CONFIRMED`
- Both parties can now see confirmed transaction
- Ready for payment

---

### **Phase 4: Buyer Makes Payment**

1. **Login as buyer**
2. **Go to transaction page** `/transactions/{id}`
3. **Click** "Pay Now"
4. **Use Stripe test card:**
   - Card: `4242 4242 4242 4242`
   - Expiry: Any future date (e.g., `12/25`)
   - CVC: Any 3 digits (e.g., `123`)
   - ZIP: Any 5 digits (e.g., `12345`)

**API Call:**
```bash
POST /api/transactions/{transaction_id}/pay
Authorization: Bearer {buyer_jwt_token}
Content-Type: application/json

{
  "paymentMethodId": "pm_card_visa"
}
```

**✅ Expected Result:**
- Transaction status: `CONFIRMED` → `PAYMENT_HELD`
- Stripe Payment Intent created
- Funds held in escrow (not captured yet!)
- Check Stripe dashboard: Payment should be "Uncaptured"

---

### **Phase 5: Seller Ships Product**

1. **Login as seller**
2. **Go to transaction page**
3. **Click** "Add Tracking"
4. **Enter:**
   - Tracking Number: `9400100000000000000000` (USPS test)
   - Carrier: `USPS`

**API Call:**
```bash
POST /api/transactions/{transaction_id}/ship
Authorization: Bearer {seller_jwt_token}
Content-Type: application/json

{
  "trackingNumber": "9400100000000000000000",
  "trackingCarrier": "USPS"
}
```

**✅ Expected Result:**
- Transaction status: `PAYMENT_HELD` → `SHIPPED`
- Tracking number saved
- Auto-release timer started (7 days default)

---

### **Phase 6: Delivery Confirmation**

**Option A: Automatic (if TrackingMore API configured)**
- Cron job runs hourly: `/api/tracking/check`
- Checks tracking status
- Auto-updates to `DELIVERED` when confirmed

**Option B: Manual Testing**
```bash
# Manually mark as delivered (for testing)
# Update database directly or create admin endpoint
UPDATE Transaction
SET status = 'DELIVERED',
    deliveredAt = NOW(),
    autoReleaseAt = NOW() + INTERVAL '24 hours'
WHERE id = '{transaction_id}';
```

**✅ Expected Result:**
- Transaction status: `SHIPPED` → `DELIVERED`
- Auto-release scheduled for 24 hours later

---

### **Phase 7: Funds Release**

**Option A: Automatic (after auto-release timer)**
- Cron job runs: `/api/cron/auto-release`
- Automatically releases funds

**Option B: Manual Release (Buyer can release early)**
```bash
POST /api/transactions/{transaction_id}/release
Authorization: Bearer {buyer_jwt_token}
```

**API Processing:**
1. Captures the Stripe Payment Intent
2. Calculates fees:
   - Platform fee (2%): $20
   - Processing fee (~3%): $30
   - Seller receives: $950
3. Creates Stripe Transfer to seller
4. Updates status to `FUNDS_RELEASED`

**✅ Expected Result:**
- Transaction status: `DELIVERED` → `FUNDS_RELEASED`
- Check Stripe dashboard:
  - Payment captured
  - Transfer to seller created
- Seller account credited (if Connect set up)

---

## **Quick Test Checklist**

```
□ Register buyer account
□ Register seller account
□ Create transaction (buyer)
□ Confirm transaction (seller)
□ Make payment with test card (buyer)
□ Verify payment held in Stripe
□ Add tracking number (seller)
□ Mark as delivered (manual or wait for tracking)
□ Release funds (automatic or manual)
□ Verify transfer in Stripe dashboard
```

---

## **Stripe Test Cards**

**Successful payments:**
- `4242 4242 4242 4242` - Visa
- `5555 5555 5555 4444` - Mastercard
- `3782 822463 10005` - Amex

**Failed payments:**
- `4000 0000 0000 0002` - Card declined
- `4000 0000 0000 9995` - Insufficient funds

---

## **Checking Results**

### In Stripe Dashboard (Test Mode)
1. **Payments** → See Payment Intent (uncaptured)
2. **Balance** → See transfers after release
3. **Logs** → See API calls

### In Your Database
```sql
-- Check transaction
SELECT id, status, amount, productName, createdAt
FROM Transaction
WHERE id = '{transaction_id}';

-- Check confirmations
SELECT * FROM Confirmation
WHERE transactionId = '{transaction_id}';

-- Check tracking updates
SELECT * FROM TrackingUpdate
WHERE transactionId = '{transaction_id}';
```

---

## **Common Issues**

### Payment Fails
- Check Stripe keys are in environment variables
- Verify using test mode keys (sk_test_)
- Check browser console for errors

### Tracking Not Working
- TrackingMore API key not set = Expected!
- Can skip this by manually updating status

### Funds Not Releasing
- Check auto-release timer: `autoReleaseAt` in database
- Manually trigger: `POST /api/transactions/{id}/release`

---

## **Next Steps After Testing**

1. ✅ **Verified full flow works**
2. 🔄 **Add real Stripe Connect** (for actual transfers)
3. 📧 **Set up email notifications** (SendGrid/Resend)
4. 🔔 **Add webhook listeners** (Stripe webhooks)
5. 🎨 **Build transaction detail pages**
6. 📱 **Add real-time status updates**

---

**Need help with any step? Let me know!** 🚀
