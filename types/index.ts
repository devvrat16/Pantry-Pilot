export type PantryItem = {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  expiryDate: string;
  category: string;
  addedDate: string;
};

export type RecipeIngredient = {
  name: string;
  quantity: string;
  unit: string;
};

export type Recipe = {
  id: string;
  name: string;
  description: string;
  ingredients: RecipeIngredient[];
  instructions: string[];
  prepTime: string;
  emoji: string;
};

export type ShoppingListItem = {
  id: string;
  name: string;
  quantity: string;
  checked: boolean;
};

export type RecipeMatch = {
  recipe: Recipe;
  matchedIngredients: string[];
  nearExpiryMatches: number;
  score: number;
};
