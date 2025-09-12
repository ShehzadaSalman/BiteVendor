import React from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import { COLORS, FONTS } from '../../constants';
import { FONT_SIZE, rh } from '../../utils/spacing';
export default function OrderRequestComponent() {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Order Request</Text>
      <View style={styles.orderNoteRow}>
        <Image source={require('../../assets/images/Cart/note.png')} />
        <Text style={styles.orderNoteLabel}>Order note</Text>
      </View>
      <TextInput
        style={styles.textInput}
        placeholder="Add Special Request"
        placeholderTextColor={COLORS.grayText}
      />
      <Text style={styles.noteText}>No refunds and cancellations</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    padding: 16,
    borderBottomColor: COLORS.gray,
    borderBottomWidth: rh(0.8),
  },
  sectionTitle: {
    fontSize: FONT_SIZE.medium,
    fontFamily: FONTS.bold700,
    marginBottom: 6,
    fontWeight: 'bold',
    color: COLORS.text,
  },

  orderNoteRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },

  orderNoteLabel: {
    fontSize: FONT_SIZE.xSmall,
    fontFamily: FONTS.medium500,
    fontWeight: '500',
    marginLeft: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: COLORS.grayText,
    borderRadius: 6,
    padding: 8,
    marginBottom: 6,
    fontFamily: FONTS.semiBold600,
    fontWeight: '600',
    fontSize: FONT_SIZE.xSmall,
  },
  noteText: {
    fontFamily: FONTS.medium500,
    fontWeight: '500',
    fontSize: FONT_SIZE.small,
    color: COLORS.grayText,
  },
});
