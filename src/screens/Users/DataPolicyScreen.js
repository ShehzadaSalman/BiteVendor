import React from 'react';
import { Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { COLORS, FONTS } from '../../constants';
import { FONT_SIZE } from '../../utils/spacing';
import TermsHeaderComponent from '../../components/User/TermsHeaderComponent';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DataPolicyScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}

      <TermsHeaderComponent title="Data Policy" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Section Title */}
        <Text style={styles.subTitleContainer}>
          <Text style={styles.sectionTitle}>Data Policy</Text>
        </Text>

        {/* Main Paragraph */}
        <Text style={styles.paragraph}>
          At Data polic , we value your privacy and are committed to protecting
          your personal information. When you use our food delivery app, we may
          collect information such as your name, contact details, delivery
          address, payment information, and location data to ensure smooth and
          efficient service. We also collect app usage data to better understand
          your preferences and improve your overall experience. Your personal
          information is used to process orders, manage deliveries, send
          notifications, and provide customer support. We may also use it to
          share relevant offers or updates, but you can opt out of promotional
          communications at any time. We do not sell your personal information
          to third parties. However, we may share limited data with delivery
          riders, restaurant partners, and trusted service providers when
          necessary for fulfilling your orders or maintaining our services. All
          partners are required to handle your data with the same level of
          confidentiality and care. To protect your data, we use secure systems
          and encryption methods. Access to your information is strictly
          controlled and limited to authorized personnel only. You have the
          right to view, update, or delete your personal data at any time. You
          may also request to deactivate your account if you no longer wish to
          use our services. Our app may use cookies or similar technologies to
          enhance your browsing experience and analyze usage patterns. These
          tools help us personalize your journey and improve app functionality.
          We may occasionally update this policy to reflect changes in our
          services or legal requirements. If any major changes occur, we will
          notify you through the app or via email. If you have any questions or
          concerns about your privacy or data usage, feel free to contact our
          support team at [Your Support Email] or call us at [Your Contact
          Number].
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DataPolicyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scrollContent: {
    padding: 16,
  },
  sectionTitle: {
    fontFamily: FONTS.bold700,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.medium,
    color: COLORS.primary,
    marginBottom: 10,
  },

  subTitleContainer: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.black,
    paddingBottom: 4, // This adds space between text and line
    alignSelf: 'flex-start', // ensures the underline fits the text length
    marginTop: 12,
    marginBottom: 10,
  },

  paragraph: {
    fontFamily: FONTS.semiBold600,
    fontWeight: '600',
    fontSize: FONT_SIZE.normal,
    color: COLORS.text,
    lineHeight: 20,
  },
});
