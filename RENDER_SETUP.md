# 🚨 CRITICAL: Render Environment Variables Setup

## **The Error You're Seeing:**
```
🚨 LOGIN ERROR: Error: secretOrPrivateKey must have a value
```

## **Root Cause:**
Your `JWT_SECRET` environment variable is **NOT SET** on Render.

---

## **🔧 Fix NOW (2 Minutes):**

### **Step 1: Go to Render Dashboard**
1. Open https://dashboard.render.com
2. Click on your **sentinel-prime** service
3. Click **Environment** tab (left sidebar)

### **Step 2: Add Environment Variables**

Click **Add Environment Variable** and add these:

| Key | Value | Example |
|-----|-------|---------|
| `JWT_SECRET` | A long random string (32+ chars) | `your-super-secret-jwt-key-min-32-chars-long-12345` |
| `MONGO_URI` | Your MongoDB Atlas connection string | `mongodb+srv://username:password@cluster.mongodb.net/sentinel` |
| `NODE_ENV` | `production` | `production` |
| `PORT` | `10000` | `10000` |

### **Step 3: Generate a Secure JWT_SECRET**

**Option A - Use this command in your terminal:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Option B - Use this online (copy the result):**
```bash
openssl rand -hex 32
```

**Option C - Just use a long random string:**
```
sentinel-prime-jwt-secret-2025-secure-key-production-xyz123456789
```

### **Step 4: Save and Redeploy**
1. Click **Save Changes** (bottom of page)
2. Render will **automatically redeploy** (wait 2-3 minutes)
3. Watch the logs for: `✅ Environment variables validated`

---

## **🧪 Verify It's Working:**

### Check Render Logs:
You should see:
```
✅ Environment variables validated
Attempting DB Connection...
✅ MongoDB Connected: ...
Server running on port 10000
```

### Test Login:
```bash
curl -X POST https://sentinel-prime-1a28.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@gmail.com","password":"Test@123"}'
```

Expected response:
```json
{
  "_id": "...",
  "username": "sentinel_admin",
  "email": "test@gmail.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## **📋 Complete Environment Variables Checklist:**

```env
# Required (App will crash without these)
JWT_SECRET=your-super-secret-jwt-key-min-32-chars-long-12345
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/sentinel

# Optional (has defaults)
NODE_ENV=production
PORT=10000
```

---

## **🔴 If Login Still Fails After Setting JWT_SECRET:**

### 1. Check if user exists in database:
On Render Shell tab:
```bash
node -e "require('dotenv').config(); const mongoose = require('mongoose'); const User = require('./models/User'); mongoose.connect(process.env.MONGO_URI).then(() => User.find({}).then(users => { console.log('Users:', users); process.exit(0); }));"
```

### 2. If no users found, seed database:
```bash
node scripts/seedUser.js
```

### 3. Verify JWT_SECRET is set:
On Render Shell tab:
```bash
echo $JWT_SECRET
```
Should print your secret key (not empty).

---

## **✅ After Fix - Expected Behavior:**

1. **Registration:**
   - User fills form → Submits
   - Backend creates user
   - Frontend shows: "Registration successful! Please login."
   - Switches to Login tab
   - User must login manually

2. **Login:**
   - User enters email/password
   - Backend validates credentials
   - Returns JWT token
   - Frontend stores token
   - Redirects to dashboard

---

## **🆘 Still Broken?**

**Error:** `trust proxy setting is false`
- **Fixed:** ✅ Already added `app.set('trust proxy', 1);` in server.js

**Error:** `secretOrPrivateKey must have a value`
- **Fix:** Set `JWT_SECRET` environment variable on Render (see Step 2 above)

**Error:** `User not found`
- **Fix:** Run `node scripts/seedUser.js` on Render Shell

**Error:** `Invalid email or password`
- **Credentials:** Use `test@gmail.com` / `Test@123` (case-sensitive)

---

## **🚀 Quick Deploy After Adding JWT_SECRET:**

```bash
# Commit the trust proxy and registration flow fixes
git add .
git commit -m "fix: add trust proxy and JWT_SECRET validation"
git push
```

Render will auto-deploy in 2-3 minutes.

---

**🎯 After you add JWT_SECRET to Render, your login will work immediately!**
