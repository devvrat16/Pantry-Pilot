import { StyleSheet, Text, View } from 'react-native';
import { daysUntil, expiryLabel } from '../utils/date';
import { colors } from '../utils/theme';

export function ExpiryBadge({ expiryDate }: { expiryDate: string }) {
  const urgent = daysUntil(expiryDate) <= 3;
  return <View style={[styles.badge, urgent ? styles.urgent : styles.calm]}><Text style={[styles.text, urgent ? styles.urgentText : styles.calmText]}>{expiryLabel(expiryDate)}</Text></View>;
}
const styles = StyleSheet.create({ badge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 }, urgent: { backgroundColor: colors.orangeSoft }, calm: { backgroundColor: colors.mint }, text: { fontSize: 11, fontWeight: '700' }, urgentText: { color: colors.orange }, calmText: { color: colors.forest } });
