# 🚀 Quick Debug Steps - Why Notifications Aren't Working

## 📱 STEP 1: Add Debug Component to Your App

### Open any screen (e.g., HomeScreen.js) and add:

```javascript
// Add this import at the top
import NotificationDebugger from '../components/NotificationDebugger';

// Add this to your screen's render method
<NotificationDebugger />;
```

### Or create a dedicated test screen:

**Option A:** Add to existing screen temporarily:

```javascript
// src/screens/Home/HomeScreen.js
import NotificationDebugger from '../../components/NotificationDebugger';

// Inside your render/return:
return (
  <View style={{ flex: 1 }}>
    <NotificationDebugger />
  </View>
);
```

---

## 🔍 STEP 2: Run the Debug Tests

1. **Click "1. Check Permission"**

   - Should show: `Permission: GRANTED`
   - ❌ If DENIED → Click "2. Request Permission"

2. **Click "3. Get FCM Token"**

   - Token will be copied to clipboard automatically
   - ✅ Save this token - you'll need it!
   - Format: starts with `e`, `d`, or `f` and is ~150+ characters

3. **Click "🧪 Test Notification"**
   - Should immediately show a notification
   - ✅ If you see it: **Local notifications work!**
   - ❌ If you don't: **Permission/setup issue**

---

## 📋 STEP 3: Diagnose the Problem

### If Test Notification Works ✅

**Your app setup is correct!** The problem is likely:

- ❌ Wrong FCM token being used
- ❌ Wrong Firebase project (mismatch between app and backend)
- ❌ Wrong message format from backend/Firebase Console

### If Test Notification Fails ❌

**Local setup issue:**

- Check Android emulator has Google Play Services
- Check permissions are granted
- Check logs for errors

---

## 🔥 STEP 4: Test from Firebase Console

### A. Get Your Firebase Server Key

1. Go to: https://console.firebase.google.com/
2. Select: **aivoxagency-2b9d1** (your current project)
3. Click: ⚙️ Settings → Project settings
4. Click: **Cloud Messaging** tab
5. Find: **Server key** (starts with `AAAA...`)
6. Copy this key

### B. Send Test Message from Firebase Console

**Method 1: Using Firebase Console UI (Easiest)**

1. Go to: Firebase Console → **Engage** → **Cloud Messaging**
2. Click: **"Send your first message"** or **"Create campaign"**
3. Fill in:
   - **Notification title**: `Test from Console`
   - **Notification text**: `If you see this, FCM works!`
4. Click: **"Send test message"**
5. Paste your FCM token (from Step 2)
6. Click: **"Test"**

**Expected Result:**

- ✅ Notification appears on your device/emulator
- ✅ Console logs show: `📱 Foreground notification received!`

**Method 2: Using cURL (More Control)**

Replace `YOUR_SERVER_KEY` and `YOUR_DEVICE_TOKEN` with your actual values:

```bash
SERVER_KEY="AAAA..."  # From Firebase Console
DEVICE_TOKEN="eNdK7..."  # From debugger (Step 2)

curl -X POST https://fcm.googleapis.com/fcm/send \
  -H "Authorization: key=$SERVER_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"to\": \"$DEVICE_TOKEN\",
    \"notification\": {
      \"title\": \"Test from cURL 🚀\",
      \"body\": \"If you see this, FCM is working!\",
      \"sound\": \"default\"
    },
    \"data\": {
      \"type\": \"new_order\",
      \"order_id\": \"12345\",
      \"test\": \"true\"
    },
    \"priority\": \"high\"
  }"
```

**Expected Result:**

- ✅ Response: `"success": 1`
- ✅ Notification appears on device

---

## ⚠️ STEP 5: Common Issues & Solutions

### Issue 1: No FCM Token (Step 2 Fails)

**Error in logs:**

```
❌ Error getting FCM token
⚠️ TIP: Make sure you are using an emulator with Google Play Services
```

**Solution:**

- ✅ Use Android emulator with **Google Play** (not just "Android")
- ✅ Or use physical device
- ✅ Check emulator has internet connection

**Verify your emulator:**

```bash
# Check if Google Play Services is available
adb shell pm list packages | grep google
# Should show: com.google.android.gms
```

### Issue 2: Permission Denied

**Error in logs:**

```
❌ Notification permission denied
⚠️ FCM not initialized - permission denied
```

**Solution:**

- Click "Request Permission" in debugger
- Or manually enable in device Settings → Apps → BiteVendor → Notifications

### Issue 3: Firebase Console Message Not Received

**Possible Causes:**

**A. Wrong Firebase Project**

```
Your App: aivoxagency-2b9d1
Backend:  ??? (might be different!)
```

**To Check:**

- Ask backend team: "Which Firebase project are you using?"
- They should provide: `google-services.json` and `GoogleService-Info.plist`

**B. Wrong Token Used**

- Make sure you copied the FULL token (150+ characters)
- Token should start with: `e`, `d`, or `f`

**C. Wrong Message Format**
❌ **Data-only messages** might not show in background:

```json
{
  "data": {
    "title": "Test",
    "body": "Message"
  }
}
```

✅ **Correct format** (with notification object):

```json
{
  "notification": {
    "title": "Test",
    "body": "Message"
  },
  "data": {
    "type": "new_order"
  }
}
```

### Issue 4: Works Locally, Not from Backend

**This means Firebase project mismatch!**

Your app is configured with: `aivoxagency-2b9d1`
Backend is likely using: Different Firebase project

**Solution:**

1. Ask backend team for their Firebase config files:
   - `google-services.json` (Android)
   - `GoogleService-Info.plist` (iOS)
2. Replace current files
3. Rebuild app: `npm run android` or `npm run ios`

---

## 📊 Expected Console Logs (When Working)

When you launch the app, you should see:

```
🚀 Setting up FCM for vendor...
📋 Auth status: { isSignedIn: true, hasAuthToken: true, ... }
🚀 Initializing FCM...
📱 Requesting notification permission...
✅ Notification permission granted
✅ Notification channels created
🔑 Requesting FCM token...
✅ FCM Token obtained successfully!
🔑 FCM Token: eNdK7abc123...xyz
🔔 Setting up notification listeners...
📱 Notification listeners setup complete
✅ FCM initialization complete
📤 Sending device token to backend...
✅ Device token sent successfully to backend
```

When you receive a notification:

```
📱 Foreground notification received!
📱 Full message: { notification: {...}, data: {...} }
📱 Notification: { title: "...", body: "..." }
📱 Data: { type: "new_order", ... }
🔔 displayNotification called: { ... }
🔔 Using channel: new_orders
✅ Notification displayed with ID: abc123...
```

---

## 🎯 Quick Checklist

Before asking for help, verify:

- [ ] App is running (foreground or background)
- [ ] User is logged in
- [ ] FCM token is displayed in logs (150+ characters)
- [ ] Permission is GRANTED (check with debugger)
- [ ] Test notification works (local test)
- [ ] Google Play Services is available (Android)
- [ ] Using correct Firebase project
- [ ] Token sent to backend successfully
- [ ] Message format includes `notification` object

---

## 🆘 Still Not Working?

Share these details:

1. **Your FCM Token** (from Step 2)
2. **Console logs** (from app startup)
3. **Which test passed/failed:**
   - [ ] Test Notification (local) - Step 2
   - [ ] Firebase Console - Step 4
   - [ ] Backend notification
4. **Device info:**
   - Platform: Android/iOS
   - Physical device or emulator?
   - Android version or iOS version
5. **Error messages** (if any)

---

## 🔑 Key Points

1. **Test Notification works** = Your app setup is fine
2. **Firebase Console works** = FCM integration is fine
3. **Backend doesn't work** = Firebase project mismatch

**Most likely issue:** Your `google-services.json` is from your personal Firebase project (`aivoxagency-2b9d1`), but backend is using a different Firebase project!

**Solution:** Get production Firebase config files from backend team.
