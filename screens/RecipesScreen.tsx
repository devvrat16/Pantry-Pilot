import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Clock, Sparkles } from 'lucide-react-native';
import { recipes } from '../data/recipes';
import { usePantry } from '../context/PantryContext';
import { ScreenHeader } from '../components/ScreenHeader';
import { getRecipeMatches } from '../utils/recipeMatching';
import { colors } from '../utils/theme';

export function RecipesScreen() {
  const navigation = useNavigation<any>();
  const { pantry } = usePantry();
  const matches = getRecipeMatches(recipes, pantry);
  return <View style={styles.screen}><ScreenHeader eyebrow="Cook from what you have" title="Recipes" />
    <FlatList data={matches} keyExtractor={(item) => item.recipe.id} contentContainerStyle={styles.list} ListHeaderComponent={<View style={styles.explainer}><Sparkles size={19} color={colors.forest}/><Text style={styles.explainerText}>Recipes that use your soon-to-expire food rise to the top.</Text></View>} renderItem={({ item, index }) => <Pressable style={styles.card} onPress={() => navigation.navigate('RecipeDetail', { recipe: item.recipe })}><View style={styles.emoji}><Text style={styles.emojiText}>{item.recipe.emoji}</Text></View><View style={styles.copy}><View style={styles.cardTop}><Text style={styles.name}>{item.recipe.name}</Text>{index < 3 ? <View style={styles.bestBadge}><Text style={styles.bestText}>{index === 0 ? 'BEST MATCH' : 'USE SOON'}</Text></View> : null}</View><Text style={styles.description}>{item.recipe.description}</Text><View style={styles.meta}><Clock size={13} color={colors.muted}/><Text style={styles.metaText}>{item.recipe.prepTime}</Text><Text style={styles.dot}>•</Text><Text style={styles.metaText}>{item.matchedIngredients.length}/{item.recipe.ingredients.length} on hand</Text></View>{item.nearExpiryMatches > 0 ? <Text style={styles.rescue}>{item.nearExpiryMatches} expiring soon {item.nearExpiryMatches === 1 ? 'ingredient' : 'ingredients'} used</Text> : null}</View></Pressable>} />
  </View>;
}
const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: colors.paper }, list: { padding: 20, paddingTop: 0, gap: 10, paddingBottom: 24 }, explainer: { backgroundColor: colors.mint, borderRadius: 6, padding: 12, flexDirection: 'row', gap: 9, marginBottom: 8, alignItems: 'center' }, explainerText: { flex: 1, color: colors.forest, fontWeight: '600', fontSize: 13, lineHeight: 18 }, card: { backgroundColor: colors.white, borderRadius: 8, padding: 14, flexDirection: 'row', gap: 13, borderWidth: 1, borderColor: colors.border }, emoji: { width: 54, height: 54, borderRadius: 6, backgroundColor: '#F6F0E5', alignItems: 'center', justifyContent: 'center' }, emojiText: { fontSize: 27 }, copy: { flex: 1 }, cardTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 }, name: { color: colors.ink, fontSize: 16, fontWeight: '800', flex: 1, lineHeight: 20 }, bestBadge: { backgroundColor: colors.orangeSoft, paddingHorizontal: 5, paddingVertical: 3, borderRadius: 3 }, bestText: { color: colors.orange, fontSize: 8, fontWeight: '900', letterSpacing: 0.3 }, description: { color: colors.muted, fontSize: 12, marginTop: 4, lineHeight: 16 }, meta: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 8 }, metaText: { color: colors.muted, fontSize: 11, fontWeight: '600' }, dot: { color: colors.muted }, rescue: { marginTop: 7, color: colors.red, fontWeight: '800', fontSize: 11 } });
