import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { PantryItem, ShoppingListItem } from '../types';
import { samplePantryItems } from '../data/seedData';

type PantryContextValue = {
  pantry: PantryItem[];
  shoppingList: ShoppingListItem[];
  hydrated: boolean;
  addPantryItem: (item: PantryItem) => void;
  removePantryItem: (id: string) => void;
  addShoppingItems: (items: Omit<ShoppingListItem, 'id' | 'checked'>[]) => void;
  toggleShoppingItem: (id: string) => void;
  removeShoppingItem: (id: string) => void;
};

const PantryContext = createContext<PantryContextValue | null>(null);
const STORAGE_KEY = 'pantry-pilot-v1';

export function PantryProvider({ children }: { children: ReactNode }) {
  const [pantry, setPantry] = useState<PantryItem[]>(samplePantryItems);
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => { (async () => {
    const saved = await AsyncStorage.getItem(STORAGE_KEY);
    if (saved) { const parsed = JSON.parse(saved); setPantry(parsed.pantry ?? samplePantryItems); setShoppingList(parsed.shoppingList ?? []); }
    setHydrated(true);
  })(); }, []);
  useEffect(() => { if (hydrated) AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ pantry, shoppingList })); }, [pantry, shoppingList, hydrated]);

  const value = useMemo(() => ({
    pantry, shoppingList, hydrated,
    addPantryItem: (item: PantryItem) => setPantry((items) => [...items, item]),
    removePantryItem: (id: string) => setPantry((items) => items.filter((item) => item.id !== id)),
    addShoppingItems: (items: Omit<ShoppingListItem, 'id' | 'checked'>[]) => setShoppingList((current) => [...current, ...items.filter((item) => !current.some((existing) => existing.name.toLowerCase() === item.name.toLowerCase())).map((item) => ({ ...item, id: `${Date.now()}-${item.name}`, checked: false }))]),
    toggleShoppingItem: (id: string) => setShoppingList((items) => items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item)),
    removeShoppingItem: (id: string) => setShoppingList((items) => items.filter((item) => item.id !== id)),
  }), [pantry, shoppingList, hydrated]);
  return <PantryContext.Provider value={value}>{children}</PantryContext.Provider>;
}

export function usePantry() { const context = useContext(PantryContext); if (!context) throw new Error('usePantry must be used within PantryProvider'); return context; }
