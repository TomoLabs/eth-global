# Google Sign-In Setup for Wallet Connect

## 🚨 **Current Issue**
Google sign-in is not working because you're using a placeholder Project ID. Here's how to fix it:

## ✅ **Step-by-Step Fix**

### 1. **Get a Real Reown Project ID**
1. Go to [dashboard.reown.com](https://dashboard.reown.com)
2. Sign up/login to your account
3. Create a new project or select existing one
4. Copy your **Project ID**

### 2. **Configure Your Project**
In the Reown dashboard:
1. **Add your domain** to allowed origins:
   - `http://localhost:8080`
   - `http://localhost:8081`
   - Your production domain (if any)

2. **Enable Social Logins:**
   - Go to project settings
   - Enable Google, X (Twitter), GitHub, etc.
   - Configure OAuth settings if required

### 3. **Update Environment Variables**
Replace placeholder in `.env`:
```bash
# Replace this placeholder:
VITE_PROJECT_ID=sample_project_id_placeholder

# With your real Project ID:
VITE_PROJECT_ID=your_actual_project_id_from_dashboard
```

### 4. **Restart Development Server**
```bash
npm run dev
```

## 🎯 **What's Already Configured**

The app is already set up with:
- ✅ Social login options: Google, X, GitHub, Discord, Apple, Facebook
- ✅ Email login enabled
- ✅ Dark theme matching your app
- ✅ Custom styling with your brand colors
- ✅ Proper metadata configuration

## 🔍 **Testing Google Sign-In**

After setting up the real Project ID:

1. **Click "Try Now"** or the wallet button
2. **Select "Continue with Google"** option
3. **Follow Google OAuth flow**
4. **Wallet should connect successfully**

## ⚠️ **Common Issues**

### **"Invalid Project ID" Error**
- Make sure you copied the Project ID correctly
- No spaces or extra characters
- Restart the dev server after changing .env

### **"Origin not allowed" Error**
- Add your localhost URL to allowed origins in Reown dashboard
- Include both port 8080 and 8081

### **Google OAuth Issues**
- Make sure Google login is enabled in Reown dashboard
- Check if you need to configure Google OAuth credentials
- Verify domain is properly configured

## 🔗 **Supported Social Logins**

Once properly configured, users can connect with:
- 🟢 Google
- 🟢 X (Twitter)  
- 🟢 GitHub
- 🟢 Discord
- 🟢 Apple
- 🟢 Facebook
- 🟢 Email + Password

## 📞 **Need Help?**

If Google sign-in still doesn't work after following these steps:
1. Check browser console for errors
2. Verify Project ID in Reown dashboard
3. Ensure domain is whitelisted
4. Try with a different social login to test

The placeholder Project ID currently in use won't support social logins - you need a real one from the Reown dashboard!
