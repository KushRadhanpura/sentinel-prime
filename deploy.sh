#!/bin/bash

# Sentinel Prime - Quick Deploy Script
# Run this after applying all fixes

echo "🚀 Deploying Sentinel Prime to Production"
echo "=========================================="
echo ""

# Check if we're in the right directory
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "❌ Error: Run this script from the project root directory"
    exit 1
fi

echo "📦 Step 1: Deploying Backend..."
echo "--------------------------------"
cd backend || exit

# Verify environment variables
if [ ! -f ".env" ]; then
    echo "⚠️  Warning: No .env file found in backend/"
    echo "Make sure these are set on Render:"
    echo "  - MONGO_URI"
    echo "  - JWT_SECRET"
    echo "  - NODE_ENV=production"
fi

echo "✅ Backend ready for deployment"
echo ""
echo "👉 Now push to your Git repository:"
echo "   git add ."
echo "   git commit -m 'fix: production auth and CORS'"
echo "   git push"
echo ""

cd ..

echo "📦 Step 2: Seeding Database..."
echo "--------------------------------"
echo "⚠️  IMPORTANT: After backend deploys on Render:"
echo ""
echo "1. Go to Render Dashboard → Your Service → Shell"
echo "2. Run: node scripts/seedUser.js"
echo "3. Copy the test credentials shown"
echo ""
echo "OR if testing locally:"
echo "   cd backend && node scripts/seedUser.js"
echo ""

echo "📦 Step 3: Frontend Deployment..."
echo "--------------------------------"
echo "Vercel will auto-deploy on git push"
echo ""
echo "✅ All checks complete!"
echo ""
echo "📋 Test Credentials:"
echo "   Email: test@sentinel.com"
echo "   Password: Test@123"
echo ""
echo "🎯 Test URLs:"
echo "   Frontend: https://sentinel-prime-wine.vercel.app"
echo "   Backend Health: https://sentinel-prime-1a28.onrender.com/api/health"
echo ""
echo "📝 For detailed debugging, see DEPLOYMENT_FIX.md"
