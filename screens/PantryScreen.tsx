import { useMemo } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Camera, ChevronRight, Plus } from 'lucide-react-native';
import { TabParamList } from '../App';
import { usePantry } from '../context/PantryContext';
import { PantryItemRow } from '../components/PantryItemRow';
import { ScreenHeader } from '../components/ScreenHeader';
import { colors } from '../utils/theme';
import { daysUntil } from '../utils/date';

type Props = BottomTabScreenProps<TabParamList, 'Pantry'>;
export function PantryScreen({ navigation }: Props) {
  const { pantry, removePantryItem } = usePantry();
  const items = useMemo(() => [...pantry].sort((a, b) => a.expiryDate.localeCompare(b.expiryDate)), [pantry]);
  const urgentCount = pantry.filter((item) => daysUntil(item.expiryDate) <= 3).length;
  return <View style={styles.screen}><ScreenHeader eyebrow="Your kitchen" title="Pantry" action={<Pressable style={styles.addButton} onPress={() => navigation.getParent()?.navigate('AddItem')}><Plus size={18} color={colors.white}/><Text style={styles.addText}>Add</Text></Pressable>} />
    <FlatList data={items} keyExtractor={(item) => item.id} contentContainerStyle={styles.list} ListHeaderComponent={<><View style={styles.rescue}><View><Text style={styles.rescueEyebrow}>{urgentCount ? `${urgentCount} ingredients need attention` : 'Everything is looking fresh'}</Text><Text style={styles.rescueTitle}>{urgentCount ? 'Use what is closest to expiry.' : 'Your pantry is in good shape.'}</Text></View><View style={styles.rescueCircle}><Text style={styles.rescueNumber}>{urgentCount}</Text><Text style={styles.rescueLabel}>soon</Text></View></View><Pressable style={styles.cookButton} onPress={() => navigation.navigate('Recipes')}><View style={styles.cookIcon}><Camera size={21} color={colors.forest}/></View><View style={styles.cookCopy}><Text style={styles.cookTitle}>What can I cook?</Text><Text style={styles.cookSub}>Start with what needs using</Text></View><ChevronRight size={20} color={colors.forest}/></Pressable><Text style={styles.sectionTitle}>BY EXPIRY DATE</Text></>} renderItem={({ item }) => <PantryItemRow item={item} onRemove={() => removePantryItem(item.id)} />} ListEmptyComponent={<Text style={styles.empty}>Your pantry is ready for its first ingredient.</Text>} />
  </View>;
}
const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: colors.paper }, addButton: { flexDirection: 'row', gap: 5, alignItems: 'center', backgroundColor: colors.forest, paddingHorizontal: 13, height: 38, borderRadius: 5 }, addText: { color: colors.white, fontWeight: '800', fontSize: 14 }, list: { paddingHorizontal: 20, paddingBottom: 24 }, rescue: { backgroundColor: colors.ink, borderRadius: 8, padding: 18, marginBottom: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, rescueEyebrow: { color: '#B9DDBF', fontSize: 12, fontWeight: '700', marginBottom: 5 }, rescueTitle: { color: colors.white, fontSize: 19, fontWeight: '800', maxWidth: 210 }, rescueCircle: { backgroundColor: colors.yellow, width: 58, height: 58, borderRadius: 29, alignItems: 'center', justifyContent: 'center' }, rescueNumber: { color: colors.ink, fontSize: 20, fontWeight: '800', lineHeight: 21 }, rescueLabel: { color: colors.ink, fontSize: 10, fontWeight: '700' }, cookButton: { backgroundColor: colors.mint, minHeight: 75, borderRadius: 7, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 23 }, cookIcon: { backgroundColor: colors.white, width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' }, cookCopy: { flex: 1 }, cookTitle: { color: colors.ink, fontWeight: '800', fontSize: 16, marginBottom: 3 }, cookSub: { color: colors.forest, fontSize: 12, fontWeight: '600' }, sectionTitle: { color: colors.muted, fontSize: 11, fontWeight: '800', marginBottom: 8, letterSpacing: 0.5 }, empty: { color: colors.muted, textAlign: 'center', padding: 30 } });
