# 🔐 Google Sign-In Fix for Wallet Connect

## 🚨 **Why Google Sign-In Isn't Working**

The Google sign-in for wallet connection isn't working because you're currently using a **placeholder Project ID**. Social logins (Google, Twitter, etc.) require a real, properly configured Project ID from Reown.

## ✅ **How to Fix It (5 Minutes)**

### **Step 1: Get Your Real Project ID**
1. Visit [dashboard.reown.com](https://dashboard.reown.com)
2. Sign up or log in
3. Create a new project
4. Copy your **Project ID**

### **Step 2: Configure Domain Settings**
In your Reown project dashboard:
- Add `http://localhost:8080` to allowed origins
- Add `http://localhost:8081` to allowed origins
- Enable social logins (Google, Twitter, etc.)

### **Step 3: Update Environment**
```bash
# Edit your .env file
VITE_PROJECT_ID=your_real_project_id_here
```

### **Step 4: Restart Server**
```bash
npm run dev
```

## 🎯 **What's Already Set Up**

Your app is already configured with:
- ✅ Google, Twitter, GitHub, Discord, Apple, Facebook login
- ✅ Email authentication
- ✅ Dark theme styling
- ✅ Proper social login UI

## 🔍 **Current App Status**

- **Yellow warning banner** will show when using placeholder
- **Alert popup** when clicking "Try Now" with placeholder
- **Wallet modal opens** but social logins won't work
- **Everything else works perfectly**

## 🚀 **After Fixing**

Once you add your real Project ID:
1. **Google sign-in will work** ✅
2. **All social logins will work** ✅
3. **Warning banner disappears** ✅
4. **Full wallet functionality** ✅

## 🛠️ **Technical Details**

The app now includes:
```javascript
features: {
  socials: ['google', 'x', 'github', 'discord', 'apple', 'facebook'],
  email: true,
  emailShowWallets: true
}
```

This enables all major social login providers, but they need a real Project ID to function.

## 📞 **Still Having Issues?**

If Google sign-in still doesn't work after setting up your Project ID:

1. **Check browser console** for errors
2. **Verify domain whitelist** in Reown dashboard  
3. **Try a different social login** to test
4. **Clear browser cache** and try again

The placeholder ID is only for demo purposes - social authentication requires a real, configured project from Reown!
