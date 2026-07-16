import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Trash2 } from 'lucide-react-native';
import { PantryItem } from '../types';
import { colors } from '../utils/theme';
import { ExpiryBadge } from './ExpiryBadge';

export function PantryItemRow({ item, onRemove }: { item: PantryItem; onRemove: () => void }) {
  return <View style={styles.row}><View style={styles.icon}><Text style={styles.iconText}>{item.category === 'Produce' ? '◐' : item.category === 'Dairy & eggs' ? '◌' : '□'}</Text></View><View style={styles.copy}><Text style={styles.name}>{item.name}</Text><Text style={styles.quantity}>{item.quantity} {item.unit} · {item.category}</Text><ExpiryBadge expiryDate={item.expiryDate} /></View><Pressable onPress={onRemove} hitSlop={10} accessibilityLabel={`Remove ${item.name}`}><Trash2 size={18} color={colors.muted} /></Pressable></View>;
}
const styles = StyleSheet.create({ row: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, padding: 14, gap: 12, borderBottomWidth: 1, borderBottomColor: colors.border }, icon: { width: 39, height: 39, borderRadius: 20, backgroundColor: colors.mint, alignItems: 'center', justifyContent: 'center' }, iconText: { color: colors.forest, fontSize: 21, fontWeight: '700' }, copy: { flex: 1, gap: 4 }, name: { color: colors.ink, fontSize: 16, fontWeight: '700' }, quantity: { color: colors.muted, fontSize: 12 }, });
