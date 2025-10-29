# 🔍 Notification Debugging Guide

## Step 1: Check FCM Token

### Run the app and check logs for:

```
✅ FCM Token obtained successfully!
🔑 FCM Token: [LONG TOKEN STRING]
```

**If you DON'T see this:**

- ❌ No token = Can't receive notifications
- Check if emulator has Google Play Services (required for Android)
- Check if permissions were granted

### Copy Your FCM Token

Look for this in logs:

```
🔑 FCM Token: eNdK7... (starts with e, d, or f)
```

---

## Step 2: Verify App Is Running

### The app MUST be:

- ✅ Currently running (foreground or background)
- ✅ Logged in
- ✅ FCM initialized
- ✅ Permissions granted

### Check for these logs:

```
🚀 Initializing FCM...
✅ Notification permission granted
✅ FCM initialization complete
📱 Notification listeners setup complete
```

---

## Step 3: Check Firebase Cloud Messaging Format

### ⚠️ CRITICAL: Use the correct message format

#### ✅ CORRECT Format (Notification + Data):

```json
{
  "message": {
    "token": "YOUR_DEVICE_TOKEN_HERE",
    "notification": {
      "title": "New Order Received! 🛒",
      "body": "Order #BITE-12345 - ₨650"
    },
    "data": {
      "type": "new_order",
      "order_id": "12345",
      "order_number": "BITE-12345",
      "amount": "650"
    },
    "android": {
      "priority": "high",
      "notification": {
        "sound": "default",
        "channel_id": "new_orders"
      }
    },
    "apns": {
      "payload": {
        "aps": {
          "sound": "default",
          "badge": 1
        }
      }
    }
  }
}
```

#### ❌ WRONG Format (Data-only messages):

Data-only messages might not show notifications in background on Android.

---

## Step 4: Test from Firebase Console

### Go to Firebase Console:

1. Open: https://console.firebase.google.com/
2. Select project: **aivoxagency-2b9d1**
3. Go to: **Engage → Cloud Messaging**
4. Click: **"Send your first message"** or **"New campaign"**

### Fill in:

- **Notification title**: "Test Notification"
- **Notification text**: "Testing push notifications"
- Click **"Send test message"**
- **Paste your FCM token**
- Click **"Test"**

### Watch logs for:

```
📱 Foreground notification received!
📱 Full message: {...}
🔔 Displaying notification: Test Notification
✅ Notification displayed with ID: ...
```

---

## Step 5: Common Issues & Solutions

### Issue 1: No FCM Token in Logs

**Cause**: Google Play Services missing (Android Emulator)
**Solution**:

- Use emulator with Google APIs (not just Android)
- Or use physical device

**Check logs for**:

```
❌ Error getting FCM token
⚠️ TIP: Make sure you are using an emulator with Google Play Services
```

### Issue 2: Permission Denied

**Cause**: User denied notification permission
**Solution**:

- Check app settings
- Re-request permission
- On Android 13+, need POST_NOTIFICATIONS permission

**Check logs for**:

```
❌ Notification permission denied
⚠️ FCM not initialized - permission denied
```

### Issue 3: Token Not Sent to Backend

**Cause**: Not logged in or vendor ID missing
**Solution**: Make sure user is logged in

**Check logs for**:

```
⚠️ Cannot send device token
hasApiToken: false
hasVendorId: false
```

### Issue 4: Wrong Firebase Project

**Cause**: App's Firebase config doesn't match backend's
**Solution**:

- Get production `google-services.json` from backend team
- Replace current file
- Rebuild app

**Your current Firebase project**: `aivoxagency-2b9d1`
**Backend might use**: Different project (ask backend team)

### Issue 5: App in Background/Killed

**Cause**: Different handlers for different states
**Solution**: Test in all states:

- ✅ Foreground (app open)
- ✅ Background (app minimized)
- ✅ Killed (app closed)

---

## Step 6: Enable Debug Logging

### Add to your test:

```javascript
import { sendTestNotification } from './src/utils/fcmHelper';

// Call this from a button in your app
await sendTestNotification();
```

This will:

- Test if Notifee is working
- Test if notification channels work
- Verify local notifications work

---

## Step 7: Check Device/Emulator Requirements

### Android Requirements:

- ✅ Emulator with **Google Play Services**
- ✅ Android API 21+ (Lollipop or higher)
- ✅ Internet connection
- ✅ Google Play Services up to date

### iOS Requirements:

- ✅ Physical device (simulators can't receive push)
- ✅ Valid provisioning profile with push enabled
- ✅ Internet connection

---

## Quick Test Commands

### From your Firebase project console, use this curl command:

```bash
# Replace with your values:
SERVER_KEY="YOUR_FIREBASE_SERVER_KEY"
DEVICE_TOKEN="YOUR_DEVICE_FCM_TOKEN"

curl -X POST https://fcm.googleapis.com/fcm/send \
  -H "Authorization: key=$SERVER_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "'$DEVICE_TOKEN'",
    "notification": {
      "title": "Test from cURL",
      "body": "If you see this, FCM is working!",
      "sound": "default"
    },
    "data": {
      "type": "new_order",
      "test": "true"
    },
    "priority": "high"
  }'
```

### Get your Server Key:

1. Firebase Console → Project Settings
2. Cloud Messaging tab
3. Find "Server key" (starts with "AAAA...")

---

## What to Check in Logs RIGHT NOW

Run your app and look for these specific log messages:

### 1. FCM Initialization:

```
🚀 Initializing FCM...
```

### 2. Permission Status:

```
✅ Notification permission granted
```

### 3. FCM Token:

```
🔑 FCM Token: [COPY THIS TOKEN]
```

### 4. Listeners Setup:

```
🔔 Setting up notification listeners...
📱 Notification listeners setup complete
```

### 5. Token Sent to Backend:

```
📤 Sending device token to backend...
✅ Device token sent successfully to backend
```

---

## Test Sequence

### Test 1: Local Notification (Easiest)

Add this button to your app:

```javascript
import { sendTestNotification } from './src/utils/fcmHelper';

<Button
  title="Test Local Notification"
  onPress={async () => {
    const result = await sendTestNotification();
    console.log('Test result:', result);
  }}
/>;
```

**Expected**: You should see a notification immediately.
**If this fails**: Notifee setup is broken.

### Test 2: Firebase Console Test (Medium)

Send from Firebase Console (see Step 4 above)

**Expected**: Notification appears on device
**If this fails**: FCM configuration issue

### Test 3: Backend Test (Hardest)

Ask backend to send notification to your token

**Expected**: Notification appears on device
**If this fails**: Firebase project mismatch

---

## Need Help?

Share these logs with the team:

1. Full app startup logs (from app launch)
2. The FCM token you're using
3. The exact message format you're sending
4. Which test failed (Local, Firebase Console, or Backend)
