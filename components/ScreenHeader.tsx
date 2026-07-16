import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../utils/theme';

export function ScreenHeader({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: ReactNode }) {
  return <View style={styles.row}><View>{eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}<Text style={styles.title}>{title}</Text></View>{action}</View>;
}
const styles = StyleSheet.create({ row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 14, paddingBottom: 16 }, eyebrow: { color: colors.forest, fontSize: 12, fontWeight: '800', letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 3 }, title: { color: colors.ink, fontSize: 30, fontWeight: '800', letterSpacing: 0 } });
