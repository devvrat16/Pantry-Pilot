import { PantryItem, Recipe, RecipeMatch } from '../types';
import { daysUntil } from './date';

const normalize = (value: string) => value.toLowerCase().trim().replace(/s$/, '');

export const pantryHas = (ingredientName: string, pantry: PantryItem[]) =>
  pantry.some((item) => {
    const ingredient = normalize(ingredientName);
    const itemName = normalize(item.name);
    return itemName === ingredient || itemName.includes(ingredient) || ingredient.includes(itemName);
  });

export function getRecipeMatches(recipes: Recipe[], pantry: PantryItem[]): RecipeMatch[] {
  return recipes.map((recipe) => {
    const matchedItems = pantry.filter((item) => recipe.ingredients.some((ingredient) => pantryHas(ingredient.name, [item])));
    const nearExpiryMatches = matchedItems.filter((item) => daysUntil(item.expiryDate) <= 3).length;
    // Near-expiry matches count double: this deliberately surfaces recipes that rescue food first,
    // while the regular match count keeps recipes with a fuller ingredient overlap competitive.
    const score = nearExpiryMatches * 2 + matchedItems.length;
    return { recipe, matchedIngredients: matchedItems.map((item) => item.name), nearExpiryMatches, score };
  }).sort((a, b) => b.score - a.score || b.matchedIngredients.length - a.matchedIngredients.length);
}
