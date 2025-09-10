import React, { useState } from 'react';
import { Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { COLORS, FONTS } from '../../constants';
import { FONT_SIZE } from '../../utils/spacing';
import TermsHeaderComponent from '../../components/User/TermsHeaderComponent';
import LoginModal from '../../components/Authentication/LoginModal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TermsConditionsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const insets = useSafeAreaInsets();
  return (
    <>
      <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
        {/* Header */}

        <TermsHeaderComponent
          onPress={() => setModalVisible(true)}
          title="Terms & conditions"
        />

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Section Title */}
          <Text style={styles.subTitleContainer}>
            <Text style={styles.sectionTitle}>Terms & conditions</Text>
          </Text>

          {/* Main Paragraph */}
          <Text style={styles.paragraph}>
            These Terms and Conditions (“Terms”) govern your use of the Bite
            food delivery mobile application and website (the “Platform”)
            operated by [Your Company Name] (“Company”, “we”, “us”, or “our”).
            By accessing or using our services, you agree to be bound by these
            Terms.
          </Text>

          {/* Terms Sections */}
          {/* <Text style={styles.subTitle}>1. User Eligibility</Text> */}
          <Text style={styles.subTitleContainer}>
            <Text style={styles.subTitle}>1. User Eligibility</Text>
          </Text>

          <Text style={styles.paragraph}>
            You must be at least 18 years old and capable of forming a binding
            contract to use our Platform. By registering, you confirm that all
            account information provided is accurate and up to date.
          </Text>
          <Text style={styles.subTitleContainer}>
            <Text style={styles.subTitle}>2. Services</Text>
          </Text>
          <Text style={styles.paragraph}>
            Bite connects users (“Customers”) with restaurants and food vendors
            (“Vendors”) for food ordering and delivery through a network of
            delivery riders (“Riders”).
          </Text>

          <Text style={styles.subTitleContainer}>
            <Text style={styles.subTitle}>3. User Accounts</Text>
          </Text>
          <Text style={styles.paragraph}>
            Bite connects users (“Customers”) with restaurants and food vendors
            (“Vendors”) for food ordering and delivery through a network of
            delivery riders (“Riders”).
          </Text>

          <Text style={styles.subTitleContainer}>
            <Text style={styles.subTitle}>4. Order & Payments</Text>
          </Text>
          <Text style={styles.paragraph}>
            Bite connects users (“Customers”) with restaurants and food vendors
            (“Vendors”) for food ordering and delivery through a network of
            delivery riders (“Riders”).
          </Text>
        </ScrollView>
      </SafeAreaView>
      <LoginModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};

export default TermsConditionsScreen;

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
    marginBottom: 4,
  },

  subTitle: {
    fontFamily: FONTS.bold700,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.medium,
    color: COLORS.primary,
  },

  paragraph: {
    fontFamily: FONTS.semiBold600,
    fontWeight: '600',
    fontSize: FONT_SIZE.normal,
    color: COLORS.text,
    lineHeight: 20,
  },
});
