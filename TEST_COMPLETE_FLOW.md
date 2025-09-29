# Complete Database Integration Test Guide

## 🚀 **Setup Your Database First**

### 1. Create NeonDB Database
1. Go to [Neon Console](https://console.neon.tech/)
2. Create a new project/database
3. Copy the connection string

### 2. Update Your `.env` File
```env
# Your existing variables
VITE_PROJECT_ID=your_reown_project_id
VITE_ALCHEMY_API_KEY=your_alchemy_api_key

# ADD THIS: Your Neon database connection string
VITE_DATABASE_URL="postgresql://username:password@host/database?sslmode=require"
```

### 3. Run Database Migration
```bash
npx prisma migrate dev --name init
```

### 4. Start Both Servers
```bash
# Terminal 1: Frontend
npm run dev

# Terminal 2: API Server
node --loader tsx/esm src/api/server.ts
```

## ✅ **Complete Flow Test**

### **Step 1: Connect Wallet**
- Open the app (http://localhost:5173)
- Click "Try Now"
- Connect your wallet using the wallet widget
- Navigate to `/dashboard`

### **Step 2: Add Friends**
1. **Add ENS Friend:**
   - In the Friends section (left panel), click the "+" button
   - Enter an ENS name (e.g., `vitalik.eth`)
   - Click Save
   - ✅ **Expected:** Friend appears in the list immediately with resolved address

2. **Add Wallet Address Friend:**
   - Click "+" again
   - Enter a wallet address (e.g., `0x742d35Cc6635C8532FD6bD8c`)
   - Click Save
   - ✅ **Expected:** Friend appears in the list immediately

3. **Verify Database Storage:**
   - Refresh the page
   - ✅ **Expected:** All friends still appear (data persisted)

### **Step 3: Create Groups**
1. **Select Friends:**
   - Check the checkboxes next to 2+ friends
   - Click "Create Group" button

2. **Verify Group Creation:**
   - ✅ **Expected:** New group appears in the right panel as a button
   - ✅ **Expected:** Group contains selected members
   - ✅ **Expected:** Group persists after page refresh

### **Step 4: Create Splits**
1. **Open Split Modal:**
   - Click on a group button in the right panel
   - Split modal opens

2. **Create Split:**
   - Enter total amount (e.g., `100`)
   - Choose equal or custom split
   - Click "Create Split"
   - ✅ **Expected:** Loading animation shows "Split is being created"
   - ✅ **Expected:** Modal closes on success

3. **Create Multiple Splits:**
   - Click the same group again
   - Create another split with different amount
   - ✅ **Expected:** Multiple splits can be created per group

### **Step 5: Verify Real-time Profile Data**
1. **Check Profile Dropdown:**
   - Click the profile icon (top right)
   - ✅ **Expected:** Shows correct number of groups (settled/unsettled)
   - ✅ **Expected:** Shows correct pending dues from database
   - ✅ **Expected:** Real-time data updates immediately after creating splits

2. **Database Verification:**
   - Open a new browser tab/incognito window
   - Connect the same wallet
   - ✅ **Expected:** All data appears immediately (friends, groups, splits)

## 🎯 **Expected Database Behavior**

### **Friends:**
- Save with ENS names and resolved addresses
- Display immediately in Friends list
- Persist across page refreshes
- Support both ENS and wallet addresses

### **Groups:**
- Created with selected friends
- Show as clickable buttons
- Persist across sessions
- Support multiple members

### **Splits:**
- Multiple splits per group supported
- Store payer information (who paid)
- Track member amounts and payment status
- Calculate dues correctly

### **Profile:**
- Real-time dues calculation
- Group status tracking (settled/unsettled)
- Immediate updates after split creation
- Accurate financial summaries

## 🔧 **Troubleshooting**

### **Database Not Connected:**
```bash
# Check if migration ran successfully
npx prisma db push

# Open Prisma Studio to view data
npx prisma studio
```

### **API Server Issues:**
```bash
# Check if API server is running on port 3001
curl http://localhost:3001/api/health

# Check server logs for errors
```

### **Friend Not Saving:**
- Check browser console for API errors
- Verify wallet is connected
- Check ENS resolution logs

### **Groups Not Creating:**
- Ensure friends are selected (checkboxes checked)
- Check API server logs
- Verify database connection

## 🎉 **Success Indicators**

✅ **Complete Success When:**
1. Friends save to database and display immediately
2. Groups create with selected members and persist
3. Multiple splits can be created per group
4. Profile shows real-time data from database
5. All data persists across page refreshes
6. No TypeScript errors in console
7. API calls succeed (check Network tab)

Your TOMO-LABS bill splitting app is now fully database-powered! 🚀
