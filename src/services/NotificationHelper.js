/**
 * NotificationHelper.js - Legacy wrapper for FCM
 * This file is kept for backward compatibility
 * All notification logic now handled by fcmHelper
 */

import {
  displayNotification,
  initializeFCM,
  sendTestNotification,
  checkNotificationPermission,
  requestUserPermission,
} from '../utils/fcmHelper';

/**
 * @deprecated Use initializeFCM from fcmHelper instead
 */
export async function ensureNotificationSetup() {
  console.log(
    '⚠️ ensureNotificationSetup is deprecated. Use initializeFCM from fcmHelper.',
  );
}

/**
 * Show new order notification
 * @param {Object} params
 * @param {string} params.orderId - The order ID
 * @param {string} params.orderNumber - The order number (optional)
 * @param {string} params.amount - The order amount (optional)
 */
export async function showNewOrderNotification({
  orderId,
  orderNumber,
  amount,
}) {
  try {
    const title = 'New Order Received! 🛒';
    const body = orderNumber
      ? `Order #${orderNumber}${amount ? ` - ₨${amount}` : ''}`
      : `Order #${orderId}`;

    await displayNotification(title, body, {
      type: 'new_order',
      order_id: orderId,
      order_number: orderNumber,
      amount: amount,
    });
  } catch (e) {
    console.error('Error showing new order notification:', e);
  }
}

// Re-export useful functions
export {
  initializeFCM,
  sendTestNotification,
  checkNotificationPermission,
  requestUserPermission,
};
