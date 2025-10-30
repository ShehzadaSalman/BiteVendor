# Firebase Cloud Messaging (FCM) Setup Guide for BiteVendor

## ✅ What's Been Done

Your BiteVendor app has been successfully migrated from Pusher to **Firebase Cloud Messaging (FCM)**!

### Changes Made:

1. ✅ **Removed Pusher Setup**

   - Deleted `src/services/PusherService.js`
   - Deleted `src/services/pusherConfig.js`
   - Deleted `src/index.events.js`
   - Removed `pusher-js` from package.json
   - Removed `react-native-dotenv` plugin usage for Pusher

2. ✅ **Added Firebase Packages**

   - `@react-native-firebase/app: ^23.4.0`
   - `@react-native-firebase/messaging: ^23.4.0`
   - Kept `@notifee/react-native: ^9.1.8` for rich notifications

3. ✅ **Created FCM Helper** (`src/utils/fcmHelper/index.js`)

   - Complete FCM initialization
   - Permission handling (iOS & Android)
   - Token management
   - Notification display with Notifee
   - Deep linking/navigation handling
   - Background & foreground message handling

4. ✅ **Updated App.js**

   - Replaced Pusher subscription with FCM initialization
   - Auto-registers device token to backend
   - Handles token refresh automatically
   - Background message handler setup

5. ✅ **Updated NotificationHelper.js**
   - Now acts as a wrapper for FCM
   - Backward compatibility maintained
   - Uses FCM displayNotification underneath

## 🚀 Next Steps - Complete Firebase Setup

### Step 1: Install Dependencies

```bash
cd /Users/shahzada.salman/WebProjects/zain-food-apps/BiteVendor

# Install new packages
npm install

# For iOS
cd ios && pod install && cd ..
```

### Step 2: Firebase Project Setup

1. **Go to Firebase Console**: https://console.firebase.google.com
2. **Create/Select Project**: "Bite Vendor" or create new
3. **Add Android App**:

   - Package name: `com.bite.vendor`
   - Download `google-services.json`
   - Place it at: `android/app/google-services.json`

4. **Add iOS App** (if needed):

   - Bundle ID: Check in Xcode (likely `com.bitevendor`)
   - Download `GoogleService-Info.plist`
   - Place it at: `ios/GoogleService-Info.plist`
   - Add to Xcode project

5. **Enable Cloud Messaging API**:
   - Go to: Project Settings → Cloud Messaging
   - Enable Cloud Messaging API
   - Copy **Server Key** (needed for backend)

### Step 3: Android Configuration

Verify these files exist and have the correct configuration:

**`android/build.gradle`** - Add Google Services classpath:

```gradle
buildscript {
    dependencies {
        // Add this line
        classpath 'com.google.gms:google-services:4.4.0'
    }
}
```

**`android/app/build.gradle`** - Add plugin at the bottom:

```gradle
// At the bottom of the file
apply plugin: 'com.google.gms.google-services'
```

**`android/app/src/main/AndroidManifest.xml`** - Verify permissions:

```xml
<manifest>
    <!-- FCM Permissions -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS"/>
    <uses-permission android:name="android.permission.VIBRATE" />

    <application>
        <!-- FCM default notification channel -->
        <meta-data
            android:name="com.google.firebase.messaging.default_notification_channel_id"
            android:value="new_orders" />
    </application>
</manifest>
```

### Step 4: iOS Configuration (Mac Only)

**`ios/Podfile`** - Ensure these lines exist:

```ruby
# Add at the top (outside target)
$RNFirebaseAsStaticFramework = true

target 'BiteVendor' do
  # Your other pods...

  # Firebase pods (should be auto-linked)
  pod 'Firebase/Messaging'
end
```

**Add Push Notification Capability in Xcode**:

1. Open `ios/BiteVendor.xcworkspace` in Xcode
2. Select project → Target → Signing & Capabilities
3. Click "+ Capability"
4. Add "Push Notifications"
5. Add "Background Modes" → Check "Remote notifications"

**Upload APNs Key to Firebase**:

1. Go to Apple Developer Portal
2. Create APNs Auth Key
3. Download .p8 file
4. Upload to Firebase Console → Project Settings → Cloud Messaging → iOS

### Step 5: Rebuild the App

**⚠️ IMPORTANT**: Native changes require a rebuild!

```bash
# For Android
npx react-native run-android

# For iOS
cd ios && pod install && cd ..
npx react-native run-ios
```

### Step 6: Test on Physical Device

Push notifications **only work on real devices**, not emulators!

1. Install app on physical device
2. Login with vendor account
3. Check console logs for:
   ```
   🚀 Setting up FCM for vendor...
   FCM Token: dXY8Xo7kRB2...
   ✅ Device token sent successfully to backend
   📱 Notification listeners setup complete
   ```

## 🧪 Testing Notifications

### Method 1: Firebase Console (Easiest)

1. Go to: https://console.firebase.google.com
2. Select your project
3. Navigate to: **Cloud Messaging** → **Send your first message**
4. Fill in:
   - Title: `New Order! 🍕`
   - Text: `You have a new order #BITE-12345`
5. Click **Send test message**
6. Paste your FCM token from console logs
7. Click **Test**

### Method 2: cURL Command

```bash
# Replace with your values
FCM_TOKEN="your_device_fcm_token"
SERVER_KEY="your_firebase_server_key"

curl -X POST https://fcm.googleapis.com/fcm/send \
  -H "Authorization: key=$SERVER_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "'$FCM_TOKEN'",
    "notification": {
      "title": "New Order! 🛒",
      "body": "New order #BITE-12345 - ₨850",
      "sound": "default"
    },
    "data": {
      "order_id": "5dc82cf9-62e1-479e-88dd-f75582f7ca06",
      "type": "new_order",
      "order_number": "BITE-12345",
      "amount": "850"
    },
    "priority": "high"
  }'
```

## 📱 Notification Types Supported

The app is configured to handle these notification types:

### 1. New Order

```json
{
  "notification": {
    "title": "New Order! 🛒",
    "body": "Order #BITE-12345 - ₨850"
  },
  "data": {
    "type": "new_order",
    "order_id": "uuid",
    "order_number": "BITE-12345",
    "amount": "850"
  }
}
```

**Action**: Navigates to Orders → OrderDetail

### 2. Order Cancelled

```json
{
  "notification": {
    "title": "Order Cancelled ❌",
    "body": "Order #BITE-12345 was cancelled"
  },
  "data": {
    "type": "order_cancelled",
    "order_id": "uuid",
    "order_number": "BITE-12345"
  }
}
```

**Action**: Navigates to Orders → OrderDetail

### 3. Rider Assigned

```json
{
  "notification": {
    "title": "Rider Assigned 🚴",
    "body": "Rider assigned to order #BITE-12345"
  },
  "data": {
    "type": "rider_assigned",
    "order_id": "uuid",
    "rider_name": "Ahmed Ali"
  }
}
```

**Action**: Navigates to Orders → OrderDetail

### 4. Low Stock Alert

```json
{
  "notification": {
    "title": "Low Stock Alert! ⚠️",
    "body": "Chicken Burger - Only 5 left"
  },
  "data": {
    "type": "low_stock",
    "item_id": "uuid",
    "item_name": "Chicken Burger",
    "current_stock": "5"
  }
}
```

### 5. Payment Received

```json
{
  "notification": {
    "title": "Payment Received! 💰",
    "body": "₨850 received for order #BITE-12345"
  },
  "data": {
    "type": "payment_received",
    "order_id": "uuid",
    "amount": "850"
  }
}
```

## 🔧 Backend Integration

### Update Backend API Endpoint

The app sends device tokens to:

```
POST https://development.bite.com.pk/api/device-token
```

**Request Body**:

```json
{
  "device_token": "fcm_token_here",
  "platform": "android", // or "ios"
  "device_type": "vendor",
  "vendor_id": 123
}
```

**Headers**:

```
Authorization: Bearer {user_token}
Content-Type: application/json
```

### Laravel Backend Example

See the detailed Laravel FCM service implementation in the PUSH_NOTIFICATIONS_QUICK_START.md file (lines 1073-1273).

## 📊 How It Works

### App Flow:

```
1. User logs in
2. App initializes FCM
3. Requests notification permission
4. Gets FCM token
5. Sends token to backend
6. Backend stores token in database
7. Backend sends notifications via FCM
8. App receives and displays notification
9. User taps notification
10. App navigates to relevant screen
```

### Notification Channels (Android):

The app creates 4 notification channels:

- **new_orders**: High priority with special sound/vibration
- **order_updates**: Medium priority for status changes
- **alerts**: High priority for important alerts
- **general**: Low priority for general notifications

## 🐛 Troubleshooting

### Issue: "google-services.json not found"

**Solution**: Download from Firebase Console and place in `android/app/`

### Issue: "FCM token not generated"

**Checklist**:

- ✅ `google-services.json` in correct location
- ✅ App rebuilt after adding Firebase
- ✅ Testing on physical device (not emulator)
- ✅ Internet connection active
- ✅ Google Play Services installed (Android)

### Issue: "Permission denied"

**Solution**:

- Check device settings → Apps → BiteVendor → Notifications
- For Android 13+, permission request should show automatically
- Uninstall and reinstall if needed

### Issue: "Notifications not appearing"

**Debug**:

1. Check console logs for FCM token
2. Test via Firebase Console first
3. Verify backend endpoint is correct
4. Check notification channels are created

### Issue: "Navigation not working when tapping notification"

**Solution**:

- Ensure `navigationRef` is properly set up
- Verify target screens exist in navigation structure
- Check `handleNotificationNavigation` in fcmHelper

## 📚 File Structure

```
BiteVendor/
├── App.js                          # FCM initialization & token registration
├── src/
│   ├── utils/
│   │   └── fcmHelper/
│   │       └── index.js           # Complete FCM implementation
│   ├── services/
│   │   └── NotificationHelper.js  # Legacy wrapper (for compatibility)
│   └── navigation/
│       └── navigationRef.js       # Navigation reference for deep linking
```

## 🎯 Key Features Implemented

✅ **Permission Handling**: iOS & Android 13+ support  
✅ **Token Management**: Auto-registration & refresh  
✅ **Rich Notifications**: Using Notifee for better UX  
✅ **Deep Linking**: Navigate to specific screens on tap  
✅ **Background Messages**: Handled automatically by FCM  
✅ **Foreground Notifications**: Displayed via Notifee  
✅ **Multiple Channels**: Different priorities for different types  
✅ **Token Refresh**: Automatic backend sync on token change

## 📝 Important Notes

1. **Physical Device Required**: Push notifications don't work on emulators
2. **Rebuild Required**: After adding Firebase config files, you must rebuild
3. **Google Play Services**: Required for Android FCM (pre-installed on most devices)
4. **APNs Certificate**: Required for iOS (upload to Firebase Console)
5. **Backend Support**: Backend must support FCM and store device tokens

## 🚀 Production Checklist

Before going to production:

- [ ] Firebase project created and configured
- [ ] `google-services.json` added (Android)
- [ ] `GoogleService-Info.plist` added (iOS)
- [ ] APNs certificate uploaded to Firebase (iOS)
- [ ] Backend API endpoint implemented
- [ ] Device token storage in database
- [ ] FCM sending logic in backend
- [ ] Tested on physical Android device
- [ ] Tested on physical iOS device
- [ ] Background notifications working
- [ ] Foreground notifications working
- [ ] Deep linking/navigation working
- [ ] Token refresh working

## 🔗 Resources

- **Firebase Console**: https://console.firebase.google.com
- **FCM Documentation**: https://firebase.google.com/docs/cloud-messaging
- **Notifee Documentation**: https://notifee.app/react-native/docs/overview
- **React Native Firebase**: https://rnfirebase.io/

## 💡 Next Steps

1. Install dependencies: `npm install`
2. Add `google-services.json` to `android/app/`
3. Rebuild: `npx react-native run-android`
4. Test on physical device
5. Send test notification via Firebase Console
6. Integrate with backend

---

**Setup Date**: October 28, 2025  
**Status**: ✅ Ready for Firebase Configuration  
**Migration**: Pusher → Firebase FCM Complete
