import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Clipboard,
} from 'react-native';
import {
  sendTestNotification,
  getFCMToken,
  checkNotificationPermission,
  requestUserPermission,
} from '../utils/fcmHelper';

/**
 * Notification Debugger Component
 * Add this to any screen to test notifications
 *
 * Usage:
 * import NotificationDebugger from '../components/NotificationDebugger';
 * <NotificationDebugger />
 */
const NotificationDebugger = () => {
  const [token, setToken] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState('unknown');
  const [logs, setLogs] = useState([]);

  const addLog = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    const emoji = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    setLogs(prev => [`${emoji} [${timestamp}] ${message}`, ...prev]);
  };

  const handleGetToken = async () => {
    addLog('Getting FCM token...');
    const fcmToken = await getFCMToken();
    if (fcmToken) {
      setToken(fcmToken);
      addLog(`Token obtained: ${fcmToken.substring(0, 20)}...`, 'success');
      // Copy to clipboard
      Clipboard.setString(fcmToken);
      Alert.alert(
        'Token Copied!',
        'FCM token has been copied to clipboard.\n\nUse this token in Firebase Console to send test notifications.',
        [{ text: 'OK' }],
      );
    } else {
      addLog('Failed to get FCM token', 'error');
      Alert.alert(
        'Error',
        'Failed to get FCM token. Check if:\n- Emulator has Google Play Services\n- Permissions are granted',
      );
    }
  };

  const handleCheckPermission = async () => {
    addLog('Checking notification permission...');
    const hasPermission = await checkNotificationPermission();
    setPermissionStatus(hasPermission ? 'granted' : 'denied');
    addLog(
      `Permission: ${hasPermission ? 'GRANTED' : 'DENIED'}`,
      hasPermission ? 'success' : 'error',
    );
  };

  const handleRequestPermission = async () => {
    addLog('Requesting notification permission...');
    const granted = await requestUserPermission();
    setPermissionStatus(granted ? 'granted' : 'denied');
    addLog(
      `Permission request: ${granted ? 'GRANTED' : 'DENIED'}`,
      granted ? 'success' : 'error',
    );
  };

  const handleTestNotification = async () => {
    addLog('Sending test notification...');
    const success = await sendTestNotification();
    if (success) {
      addLog('Test notification sent successfully!', 'success');
      Alert.alert(
        'Success!',
        'If you see a notification, the system is working correctly.',
      );
    } else {
      addLog('Failed to send test notification', 'error');
      Alert.alert(
        'Error',
        'Failed to send test notification. Check permissions and setup.',
      );
    }
  };

  const handleClearLogs = () => {
    setLogs([]);
    addLog('Logs cleared');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔔 Notification Debugger</Text>

      {/* Status Section */}
      <View style={styles.statusContainer}>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Permission:</Text>
          <Text
            style={[
              styles.statusValue,
              permissionStatus === 'granted'
                ? styles.statusSuccess
                : styles.statusError,
            ]}
          >
            {permissionStatus.toUpperCase()}
          </Text>
        </View>
        {token && (
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Token:</Text>
            <Text style={styles.statusValue}>{token.substring(0, 15)}...</Text>
          </View>
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={handleCheckPermission}
        >
          <Text style={styles.buttonText}>1. Check Permission</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={handleRequestPermission}
        >
          <Text style={styles.buttonText}>2. Request Permission</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={handleGetToken}
        >
          <Text style={styles.buttonText}>3. Get FCM Token</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.successButton]}
          onPress={handleTestNotification}
        >
          <Text style={styles.buttonText}>🧪 Test Notification</Text>
        </TouchableOpacity>
      </View>

      {/* Instructions */}
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsTitle}>Quick Test Steps:</Text>
        <Text style={styles.instructionsText}>
          1. Click "Check Permission" - Should show GRANTED{'\n'}
          2. If DENIED, click "Request Permission"{'\n'}
          3. Click "Get FCM Token" - Copies to clipboard{'\n'}
          4. Click "Test Notification" - Should show notification{'\n'}
          {'\n'}
          <Text style={styles.highlight}>
            If Test Notification works: ✅ Local setup is fine{'\n'}
          </Text>
          <Text style={styles.highlight}>
            If Test Notification fails: ❌ Check permissions/setup{'\n'}
          </Text>
          {'\n'}
          <Text style={styles.instructionsText}>
            To test Firebase Cloud Messaging:{'\n'}
            1. Get your FCM token (step 3){'\n'}
            2. Go to Firebase Console{'\n'}
            3. Cloud Messaging → Send test message{'\n'}
            4. Paste your token and send
          </Text>
        </Text>
      </View>

      {/* Logs Section */}
      <View style={styles.logsContainer}>
        <View style={styles.logsHeader}>
          <Text style={styles.logsTitle}>Console Logs</Text>
          <TouchableOpacity onPress={handleClearLogs}>
            <Text style={styles.clearButton}>Clear</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.logsScroll}>
          {logs.length === 0 ? (
            <Text style={styles.noLogs}>No logs yet...</Text>
          ) : (
            logs.map((log, index) => (
              <Text key={index} style={styles.logText}>
                {log}
              </Text>
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  statusContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  statusValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusSuccess: {
    color: '#28a745',
  },
  statusError: {
    color: '#dc3545',
  },
  buttonsContainer: {
    marginBottom: 16,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  primaryButton: {
    backgroundColor: '#007bff',
  },
  successButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  instructionsContainer: {
    backgroundColor: '#fff3cd',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#856404',
  },
  instructionsText: {
    fontSize: 14,
    color: '#856404',
    lineHeight: 20,
  },
  highlight: {
    fontWeight: 'bold',
    color: '#d39e00',
  },
  logsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  logsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  clearButton: {
    color: '#007bff',
    fontSize: 14,
    fontWeight: '600',
  },
  logsScroll: {
    flex: 1,
  },
  noLogs: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },
  logText: {
    fontSize: 12,
    color: '#333',
    marginBottom: 8,
    fontFamily: 'monospace',
  },
});

export default NotificationDebugger;
