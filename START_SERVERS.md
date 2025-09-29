# 🚀 TOMO-LABS Server Startup Guide

## ✅ **Current Status: WORKING!**

Your NeonDB is connected and saving friends successfully!

## 🖥️ **How to Start Both Servers**

### **Option 1: Two Terminal Windows (Recommended)**

**Terminal 1 - API Server:**
```bash
node start-api.cjs
```
Expected output:
```
🚀 Starting TOMO-LABS API Server...
📊 Database URL: ✅ Configured
🔗 Database URL: ✅ Configured
🔄 Testing database connection...
✅ Database connection successful!
🚀 API Server running on http://localhost:3001
📊 Database: Connected to NeonDB
🔗 Health check: http://localhost:3001/api/health
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```
Expected output:
```
> creator-conomy-hooks@0.0.0 dev
> vite

  VITE v5.3.1  ready in XXX ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

### **Option 2: PowerShell Auto-Start**
```bash
# Start API server in background
node start-api.cjs &

# Start frontend in new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$pwd'; npm run dev"
```

## 🎯 **Test Your Setup**

1. **API Health Check:** http://localhost:3001/api/health
   - Should show: `{"status":"OK","database":"Connected"}`

2. **Frontend:** http://localhost:3000
   - Should load your TOMO-LABS app

3. **Database Test:**
   - Connect wallet
   - Go to `/dashboard`
   - Add ENS friend (e.g., `vitalik.eth`)
   - Friend should save to NeonDB immediately!

## 🔧 **Your Database Connection**
```
Database: NeonDB (PostgreSQL)
URL: postgresql://neondb_owner:***@ep-floral-grass-adasu1nj-pooler.c-2.us-east-1.aws.neon.tech/neondb
Status: ✅ Connected and Working
Tables: ✅ Created via Prisma
```

## 🎊 **What's Working Now**

✅ **NeonDB Connected:** Friends save directly to database  
✅ **API Server:** Running on port 3001 with health checks  
✅ **Frontend:** Running on port 3000 (changed from 8080)  
✅ **ENS Resolution:** Works with Alchemy integration  
✅ **Error Handling:** Shows "Unable to add friend" if DB fails  
✅ **Real-time Updates:** Data persists across refreshes  

## 🚨 **If Something Breaks**

1. **API Server Issues:**
   ```bash
   # Check if database tables exist
   npx prisma db push
   
   # Restart API server
   node start-api.cjs
   ```

2. **Frontend Issues:**
   ```bash
   # Clear cache and restart
   npm run dev
   ```

3. **Database Issues:**
   - Check your NeonDB dashboard: https://console.neon.tech
   - Ensure database is not sleeping

Your app is now fully database-powered! 🎉
