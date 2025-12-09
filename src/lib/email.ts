import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 'placeholder_for_build');

const FROM_EMAIL = process.env.NEXT_PUBLIC_FROM_EMAIL || 'notifications@secureescrow.com';
const SUPPORT_EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@secureescrow.com';
const APP_URL = process.env.NEXTAUTH_URL || 'https://secureescrow.com';

// Email template wrapper
function createEmailHTML(content: string) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
    .container { max-width: 600px; margin: 0 auto; background: white; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; }
    .header h1 { color: white; margin: 0; font-size: 28px; }
    .content { padding: 40px 30px; }
    .button { display: inline-block; padding: 14px 28px; background: #667eea; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 20px 0; }
    .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; }
    .status-badge { display: inline-block; padding: 6px 12px; border-radius: 4px; font-weight: 600; font-size: 14px; }
    .badge-success { background: #d4edda; color: #155724; }
    .badge-warning { background: #fff3cd; color: #856404; }
    .badge-info { background: #d1ecf1; color: #0c5460; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🛡️ SecureEscrow.com</h1>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <p>Need help? Contact us at <a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a></p>
      <p>© ${new Date().getFullYear()} SecureEscrow.com - Safe transactions for everyone</p>
    </div>
  </div>
</body>
</html>
  `;
}

// 1. Transaction Created - To Seller
export async function sendTransactionCreatedEmail(
  sellerEmail: string,
  sellerName: string,
  buyerName: string,
  productName: string,
  amount: number,
  transactionId: string
) {
  const content = `
    <h2>New Transaction Request</h2>
    <p>Hi ${sellerName},</p>
    <p><strong>${buyerName}</strong> has created a new escrow transaction for:</p>
    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <p style="margin: 5px 0;"><strong>Product:</strong> ${productName}</p>
      <p style="margin: 5px 0;"><strong>Amount:</strong> $${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
      <p style="margin: 5px 0;"><strong>Transaction ID:</strong> ${transactionId}</p>
    </div>
    <p><strong>Next step:</strong> Review the transaction details and confirm if everything looks correct.</p>
    <a href="${APP_URL}/transactions/${transactionId}" class="button">Review & Confirm Transaction</a>
    <p style="color: #666; font-size: 14px;">Once you confirm, the buyer will be notified to make payment.</p>
  `;

  return resend.emails.send({
    from: `SecureEscrow.com <${FROM_EMAIL}>`,
    to: sellerEmail,
    subject: `New transaction request - Review & Confirm`,
    html: createEmailHTML(content),
  });
}

// 2. Transaction Confirmed - To Buyer
export async function sendTransactionConfirmedEmail(
  buyerEmail: string,
  buyerName: string,
  sellerName: string,
  productName: string,
  amount: number,
  transactionId: string
) {
  const content = `
    <h2>✅ Seller Confirmed Transaction</h2>
    <p>Hi ${buyerName},</p>
    <p>Great news! <strong>${sellerName}</strong> has confirmed the transaction details.</p>
    <div style="background: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
      <p style="margin: 5px 0;"><strong>Product:</strong> ${productName}</p>
      <p style="margin: 5px 0;"><strong>Amount:</strong> $${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
      <p style="margin: 5px 0;"><strong>Status:</strong> <span class="status-badge badge-success">Ready for Payment</span></p>
    </div>
    <p><strong>Next step:</strong> Complete your payment to secure the funds in escrow.</p>
    <a href="${APP_URL}/transactions/${transactionId}" class="button">Pay Now - Funds Held Safely</a>
    <p style="color: #666; font-size: 14px;">💡 Your payment will be held securely and only released to the seller after delivery is confirmed.</p>
  `;

  return resend.emails.send({
    from: `SecureEscrow.com <${FROM_EMAIL}>`,
    to: buyerEmail,
    subject: `Seller confirmed - Ready to pay`,
    html: createEmailHTML(content),
  });
}

// 3. Payment Received - To Both
export async function sendPaymentReceivedEmail(
  recipientEmail: string,
  recipientName: string,
  isBuyer: boolean,
  productName: string,
  amount: number,
  transactionId: string
) {
  const content = isBuyer ? `
    <h2>💰 Payment Secured in Escrow</h2>
    <p>Hi ${recipientName},</p>
    <p>Your payment of <strong>$${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong> has been successfully secured in escrow.</p>
    <div style="background: #d1ecf1; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #17a2b8;">
      <p style="margin: 5px 0;"><strong>Product:</strong> ${productName}</p>
      <p style="margin: 5px 0;"><strong>Amount Held:</strong> $${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
      <p style="margin: 5px 0;"><strong>Status:</strong> <span class="status-badge badge-info">🔒 Funds Protected</span></p>
    </div>
    <p><strong>What happens next:</strong></p>
    <ul>
      <li>The seller ships your item with tracking</li>
      <li>You'll receive shipping updates automatically</li>
      <li>Funds release to seller after delivery is confirmed</li>
    </ul>
    <a href="${APP_URL}/transactions/${transactionId}" class="button">Track Transaction</a>
  ` : `
    <h2>💰 Payment Received & Held in Escrow</h2>
    <p>Hi ${recipientName},</p>
    <p>The buyer's payment of <strong>$${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong> is now secured in escrow!</p>
    <div style="background: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
      <p style="margin: 5px 0;"><strong>Product:</strong> ${productName}</p>
      <p style="margin: 5px 0;"><strong>Amount Secured:</strong> $${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
      <p style="margin: 5px 0;"><strong>Status:</strong> <span class="status-badge badge-success">✅ Payment Confirmed</span></p>
    </div>
    <p><strong>Next step:</strong> Ship the item with a tracking number.</p>
    <a href="${APP_URL}/transactions/${transactionId}" class="button">Add Tracking Number</a>
    <p style="color: #666; font-size: 14px;">💡 Funds will be released to you automatically after delivery is confirmed.</p>
  `;

  return resend.emails.send({
    from: `SecureEscrow.com <${FROM_EMAIL}>`,
    to: recipientEmail,
    subject: `Payment secured in escrow - $${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })} held safely`,
    html: createEmailHTML(content),
  });
}

// 4. Item Shipped - To Both
export async function sendItemShippedEmail(
  recipientEmail: string,
  recipientName: string,
  isBuyer: boolean,
  productName: string,
  trackingNumber: string,
  carrier: string,
  transactionId: string
) {
  const trackingUrl = getTrackingUrl(carrier, trackingNumber);

  const content = `
    <h2>📦 Item Shipped!</h2>
    <p>Hi ${recipientName},</p>
    <p>${isBuyer ? 'Great news! Your item has been shipped.' : 'Your shipment has been confirmed.'}</p>
    <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
      <p style="margin: 5px 0;"><strong>Product:</strong> ${productName}</p>
      <p style="margin: 5px 0;"><strong>Tracking Number:</strong> ${trackingNumber}</p>
      <p style="margin: 5px 0;"><strong>Carrier:</strong> ${carrier}</p>
      <p style="margin: 5px 0;"><strong>Status:</strong> <span class="status-badge badge-warning">🚚 In Transit</span></p>
    </div>
    ${trackingUrl ? `<a href="${trackingUrl}" class="button">Track Shipment</a>` : ''}
    <a href="${APP_URL}/transactions/${transactionId}" class="button">View Transaction</a>
    <p style="color: #666; font-size: 14px;">📬 You'll receive automatic updates as the package moves.</p>
  `;

  return resend.emails.send({
    from: `SecureEscrow.com <${FROM_EMAIL}>`,
    to: recipientEmail,
    subject: `Item shipped - Track: ${trackingNumber}`,
    html: createEmailHTML(content),
  });
}

// 5. Tracking Update - To Both
export async function sendTrackingUpdateEmail(
  recipientEmail: string,
  recipientName: string,
  productName: string,
  status: string,
  location: string,
  trackingNumber: string,
  carrier: string,
  transactionId: string
) {
  const trackingUrl = getTrackingUrl(carrier, trackingNumber);

  const content = `
    <h2>📍 Delivery Update</h2>
    <p>Hi ${recipientName},</p>
    <p>Your package has a new update:</p>
    <div style="background: #d1ecf1; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #17a2b8;">
      <p style="margin: 5px 0;"><strong>Product:</strong> ${productName}</p>
      <p style="margin: 5px 0;"><strong>Status:</strong> ${status}</p>
      <p style="margin: 5px 0;"><strong>Location:</strong> ${location}</p>
      <p style="margin: 5px 0;"><strong>Tracking:</strong> ${trackingNumber}</p>
    </div>
    ${trackingUrl ? `<a href="${trackingUrl}" class="button">Track Package</a>` : ''}
    <a href="${APP_URL}/transactions/${transactionId}" class="button">View Transaction</a>
  `;

  return resend.emails.send({
    from: `SecureEscrow.com <${FROM_EMAIL}>`,
    to: recipientEmail,
    subject: `Delivery update: ${status}`,
    html: createEmailHTML(content),
  });
}

// 6. Delivered - To Both
export async function sendDeliveredEmail(
  recipientEmail: string,
  recipientName: string,
  isBuyer: boolean,
  productName: string,
  amount: number,
  transactionId: string
) {
  const content = isBuyer ? `
    <h2>✅ Package Delivered!</h2>
    <p>Hi ${recipientName},</p>
    <p>Great news! Your package has been delivered.</p>
    <div style="background: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
      <p style="margin: 5px 0;"><strong>Product:</strong> ${productName}</p>
      <p style="margin: 5px 0;"><strong>Status:</strong> <span class="status-badge badge-success">✅ Delivered</span></p>
      <p style="margin: 5px 0;"><strong>Payment:</strong> $${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
    </div>
    <p><strong>What's next:</strong></p>
    <ul>
      <li>Inspect your item to make sure everything is as expected</li>
      <li>Funds will automatically release to the seller in 24 hours</li>
      <li>If there's an issue, you can open a dispute within this time</li>
    </ul>
    <a href="${APP_URL}/transactions/${transactionId}" class="button">View Transaction</a>
  ` : `
    <h2>✅ Package Delivered!</h2>
    <p>Hi ${recipientName},</p>
    <p>Your item has been successfully delivered to the buyer.</p>
    <div style="background: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
      <p style="margin: 5px 0;"><strong>Product:</strong> ${productName}</p>
      <p style="margin: 5px 0;"><strong>Status:</strong> <span class="status-badge badge-success">✅ Delivered</span></p>
      <p style="margin: 5px 0;"><strong>Payment:</strong> $${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
    </div>
    <p><strong>Payment release:</strong> Funds will automatically transfer to your account in 24 hours!</p>
    <a href="${APP_URL}/transactions/${transactionId}" class="button">View Transaction</a>
  `;

  return resend.emails.send({
    from: `SecureEscrow.com <${FROM_EMAIL}>`,
    to: recipientEmail,
    subject: `Item delivered - Funds releasing in 24h`,
    html: createEmailHTML(content),
  });
}

// 7. Funds Released - To Seller
export async function sendFundsReleasedToSellerEmail(
  sellerEmail: string,
  sellerName: string,
  productName: string,
  amount: number,
  platformFee: number,
  sellerReceives: number,
  transactionId: string
) {
  const content = `
    <h2>💸 Payment Released!</h2>
    <p>Hi ${sellerName},</p>
    <p>Great news! The funds from your sale have been released and are on their way to you.</p>
    <div style="background: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
      <p style="margin: 5px 0;"><strong>Product:</strong> ${productName}</p>
      <p style="margin: 5px 0;"><strong>Transaction Amount:</strong> $${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
      <p style="margin: 5px 0;"><strong>Platform Fee (2%):</strong> -$${platformFee.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
      <p style="margin: 5px 0; font-size: 18px; color: #28a745;"><strong>You Receive:</strong> $${sellerReceives.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
    </div>
    <p><strong>What's next:</strong></p>
    <ul>
      <li>Funds should appear in your account within 2-7 business days</li>
      <li>Check your Stripe dashboard for transfer details</li>
    </ul>
    <a href="${APP_URL}/transactions/${transactionId}" class="button">View Transaction</a>
    <p style="color: #666; font-size: 14px;">Thank you for using SecureEscrow.com! 🎉</p>
  `;

  return resend.emails.send({
    from: `SecureEscrow.com <${FROM_EMAIL}>`,
    to: sellerEmail,
    subject: `Payment released - $${sellerReceives.toLocaleString('en-US', { minimumFractionDigits: 2 })} on its way`,
    html: createEmailHTML(content),
  });
}

// 7b. Transaction Complete - To Buyer
export async function sendTransactionCompleteEmail(
  buyerEmail: string,
  buyerName: string,
  productName: string,
  amount: number,
  transactionId: string
) {
  const content = `
    <h2>✅ Transaction Complete!</h2>
    <p>Hi ${buyerName},</p>
    <p>Your escrow transaction has been successfully completed!</p>
    <div style="background: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
      <p style="margin: 5px 0;"><strong>Product:</strong> ${productName}</p>
      <p style="margin: 5px 0;"><strong>Amount:</strong> $${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
      <p style="margin: 5px 0;"><strong>Status:</strong> <span class="status-badge badge-success">✅ Complete</span></p>
    </div>
    <p><strong>Thank you for using SecureEscrow.com!</strong></p>
    <p>Your payment has been released to the seller and the transaction is now complete.</p>
    <a href="${APP_URL}/transactions/${transactionId}" class="button">View Transaction</a>
    <p style="color: #666; font-size: 14px;">We hope to serve you again soon! 🎉</p>
  `;

  return resend.emails.send({
    from: `SecureEscrow.com <${FROM_EMAIL}>`,
    to: buyerEmail,
    subject: `Transaction complete - Thank you!`,
    html: createEmailHTML(content),
  });
}

// 8. Dispute Opened - To Both + Admin
export async function sendDisputeOpenedEmail(
  recipientEmail: string,
  recipientName: string,
  productName: string,
  disputeReason: string,
  caseId: string,
  transactionId: string
) {
  const content = `
    <h2>⚖️ Dispute Opened</h2>
    <p>Hi ${recipientName},</p>
    <p>A dispute has been opened for this transaction.</p>
    <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
      <p style="margin: 5px 0;"><strong>Product:</strong> ${productName}</p>
      <p style="margin: 5px 0;"><strong>Case ID:</strong> ${caseId}</p>
      <p style="margin: 5px 0;"><strong>Reason:</strong> ${disputeReason}</p>
      <p style="margin: 5px 0;"><strong>Status:</strong> <span class="status-badge badge-warning">Under Review</span></p>
    </div>
    <p><strong>What happens next:</strong></p>
    <ul>
      <li>Our team will review the case within 24-48 hours</li>
      <li>Both parties can submit evidence and messages</li>
      <li>Funds remain securely held until resolution</li>
    </ul>
    <a href="${APP_URL}/transactions/${transactionId}" class="button">View Dispute</a>
    <p style="color: #666; font-size: 14px;">Need help? Contact ${SUPPORT_EMAIL}</p>
  `;

  return resend.emails.send({
    from: `SecureEscrow.com <${FROM_EMAIL}>`,
    to: recipientEmail,
    subject: `Dispute opened - Case #${caseId}`,
    html: createEmailHTML(content),
  });
}

// Helper: Get tracking URL
function getTrackingUrl(carrier: string, trackingNumber: string): string {
  const carrierLower = carrier.toLowerCase();

  if (carrierLower.includes('nz post') || carrierLower.includes('nzpost')) {
    return `https://www.nzpost.co.nz/tools/tracking?trackid=${trackingNumber}`;
  }
  if (carrierLower.includes('courierpost') || carrierLower.includes('courier post')) {
    return `https://www.courierpost.co.nz/track/${trackingNumber}`;
  }
  if (carrierLower.includes('usps')) {
    return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${trackingNumber}`;
  }
  if (carrierLower.includes('fedex')) {
    return `https://www.fedex.com/fedextrack/?trknbr=${trackingNumber}`;
  }
  if (carrierLower.includes('ups')) {
    return `https://www.ups.com/track?tracknum=${trackingNumber}`;
  }
  if (carrierLower.includes('dhl')) {
    return `https://www.dhl.com/en/express/tracking.html?AWB=${trackingNumber}`;
  }

  return `https://www.trackingmore.com/${trackingNumber}`;
}

// Email Verification
export async function sendVerificationEmail(email: string, name: string, token: string) {
  const verifyUrl = `${APP_URL}/auth/verify-email?token=${token}`;

  const content = `
    <h2>Verify Your Email</h2>
    <p>Hi ${name},</p>
    <p>Welcome to SecureEscrow.com! Please verify your email address to activate your account.</p>
    <a href="${verifyUrl}" class="button">Verify Email Address</a>
    <p style="color: #666; font-size: 14px;">This link will expire in 24 hours.</p>
    <p style="color: #666; font-size: 14px;">If you didn't create an account, you can safely ignore this email.</p>
  `;

  return resend.emails.send({
    from: `SecureEscrow.com <${FROM_EMAIL}>`,
    to: email,
    subject: 'Verify your email - SecureEscrow.com',
    html: createEmailHTML(content),
  });
}

// Password Reset
export async function sendPasswordResetEmail(email: string, name: string, token: string) {
  const resetUrl = `${APP_URL}/auth/reset-password?token=${token}`;

  const content = `
    <h2>Reset Your Password</h2>
    <p>Hi ${name},</p>
    <p>We received a request to reset your password. Click the button below to create a new password:</p>
    <a href="${resetUrl}" class="button">Reset Password</a>
    <p style="color: #666; font-size: 14px;">This link will expire in 1 hour.</p>
    <p style="color: #666; font-size: 14px;">If you didn't request a password reset, you can safely ignore this email.</p>
  `;

  return resend.emails.send({
    from: `SecureEscrow.com <${FROM_EMAIL}>`,
    to: email,
    subject: 'Reset your password - SecureEscrow.com',
    html: createEmailHTML(content),
  });
}
