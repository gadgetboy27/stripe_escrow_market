#!/bin/bash

# 🔍 Deployment Verification Script
# Run this to check if your environment is properly configured

echo "🔍 SecureEscrow Deployment Verification"
echo "========================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node version
echo "1️⃣  Checking Node.js version..."
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -ge 18 ]; then
    echo -e "${GREEN}✓${NC} Node.js version: $(node -v)"
else
    echo -e "${RED}✗${NC} Node.js version too old: $(node -v) (need 18+)"
fi
echo ""

# Check if .env exists
echo "2️⃣  Checking environment file..."
if [ -f .env ]; then
    echo -e "${GREEN}✓${NC} .env file exists"
else
    echo -e "${YELLOW}⚠${NC}  .env file not found"
    echo "   Creating from .env.example..."
    cp .env.example .env
    echo -e "${YELLOW}⚠${NC}  Please edit .env with your credentials"
fi
echo ""

# Check required env vars
echo "3️⃣  Checking environment variables..."
source .env 2>/dev/null

check_env() {
    if [ -z "${!1}" ]; then
        echo -e "${RED}✗${NC} $1 is not set"
        return 1
    else
        echo -e "${GREEN}✓${NC} $1 is set"
        return 0
    fi
}

check_env "DATABASE_URL"
check_env "NEXTAUTH_SECRET"
check_env "NEXTAUTH_URL"
check_env "STRIPE_SECRET_KEY"
check_env "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
echo ""

# Check if node_modules exists
echo "4️⃣  Checking dependencies..."
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} node_modules exists"
else
    echo -e "${YELLOW}⚠${NC}  node_modules not found"
    echo "   Running npm install..."
    npm install
fi
echo ""

# Check Prisma
echo "5️⃣  Checking Prisma setup..."
if [ -f "node_modules/.prisma/client/index.js" ]; then
    echo -e "${GREEN}✓${NC} Prisma client generated"
else
    echo -e "${YELLOW}⚠${NC}  Prisma client not generated"
    echo "   Generating Prisma client..."
    npx prisma generate
fi
echo ""

# Try to connect to database
echo "6️⃣  Testing database connection..."
npx prisma db execute --stdin <<EOF
SELECT 1;
EOF

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} Database connection successful"
else
    echo -e "${RED}✗${NC} Database connection failed"
    echo "   Check your DATABASE_URL in .env"
fi
echo ""

# Check if .next exists (built)
echo "7️⃣  Checking build status..."
if [ -d ".next" ]; then
    echo -e "${GREEN}✓${NC} Project has been built"
else
    echo -e "${YELLOW}⚠${NC}  Project not built yet"
    echo "   Run: npm run build"
fi
echo ""

# Summary
echo "========================================"
echo "📋 Summary"
echo "========================================"
echo ""
echo "Next steps:"
echo "1. If any ✗ errors above, fix them first"
echo "2. Run: npx prisma db push (to create tables)"
echo "3. Run: npm run dev (to start development)"
echo "4. Visit: http://localhost:3000"
echo ""
echo "For deployment:"
echo "1. Set all env vars in Vercel"
echo "2. Deploy with: vercel --prod"
echo "3. Run Prisma migration on production DB"
echo ""
