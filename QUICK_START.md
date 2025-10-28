# Quick Start: Firebase Push Notifications Setup

## 🚀 5-Minute Setup

### Step 1: Install Dependencies (2 minutes)

```bash
cd /Users/shahzada.salman/WebProjects/zain-food-apps/BiteVendor
npm install
cd ios && pod install && cd ..
```

### Step 2: Add Firebase Config Files (2 minutes)

**Android:**

1. Go to https://console.firebase.google.com
2. Select/Create "Bite Vendor" project
3. Add Android app → Download `google-services.json`
4. Place at: `android/app/google-services.json`

**iOS (Optional):**

1. Add iOS app → Download `GoogleService-Info.plist`
2. Place at: `ios/GoogleService-Info.plist`

### Step 3: Rebuild App (1 minute)

```bash
# For Android
npx react-native run-android

# For iOS
npx react-native run-ios
```

## ✅ That's It!

The app is now ready to receive push notifications!

## 🧪 Quick Test

1. Run app on physical device
2. Login as vendor
3. Check console for:
   ```
   FCM Token: dXY8Xo7k...
   ✅ Device token sent successfully
   ```
4. Copy the FCM token
5. Go to Firebase Console → Cloud Messaging → Send test message
6. Paste token and send!

## 📱 What's Changed?

- ❌ Removed: Pusher real-time notifications
- ✅ Added: Firebase Cloud Messaging (FCM)
- ✅ Enhanced: Rich notifications with Notifee
- ✅ Added: Automatic token registration
- ✅ Added: Deep linking to orders

## 📚 Need More Details?

- **MIGRATION_SUMMARY.md** - What changed
- **FCM_SETUP_GUIDE.md** - Complete setup guide
- **@PUSH_NOTIFICATIONS_QUICK_START.md** - Technical details

## 🎯 Notification Types Supported

All these work automatically:

- 🛒 New orders
- ❌ Order cancellations
- 🚴 Rider assignments
- ⚠️ Low stock alerts
- 💰 Payment confirmations

## 🐛 Something Wrong?

**App won't build?**
→ Make sure `google-services.json` is at `android/app/google-services.json`

**No FCM token?**
→ Make sure you're testing on a real device, not emulator

**Token not sent to backend?**
→ Check internet connection and backend API endpoint

---

**Need Help?** Read the full FCM_SETUP_GUIDE.md
