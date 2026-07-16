import { PantryItem } from '../types';

const isoDaysFromToday = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
};

export const samplePantryItems: PantryItem[] = [
  { id: 'seed-eggs', name: 'Eggs', quantity: '6', unit: '', expiryDate: isoDaysFromToday(1), category: 'Dairy & eggs', addedDate: isoDaysFromToday(-5) },
  { id: 'seed-spinach', name: 'Spinach', quantity: '1', unit: 'bag', expiryDate: isoDaysFromToday(2), category: 'Produce', addedDate: isoDaysFromToday(-2) },
  { id: 'seed-tomatoes', name: 'Tomatoes', quantity: '4', unit: '', expiryDate: isoDaysFromToday(3), category: 'Produce', addedDate: isoDaysFromToday(-3) },
  { id: 'seed-basil', name: 'Basil', quantity: '1', unit: 'bunch', expiryDate: isoDaysFromToday(3), category: 'Produce', addedDate: isoDaysFromToday(-1) },
  { id: 'seed-cheddar', name: 'Cheddar', quantity: '180', unit: 'g', expiryDate: isoDaysFromToday(9), category: 'Dairy & eggs', addedDate: isoDaysFromToday(-4) },
  { id: 'seed-chickpeas', name: 'Chickpeas', quantity: '2', unit: 'cans', expiryDate: isoDaysFromToday(180), category: 'Canned goods', addedDate: isoDaysFromToday(-10) },
  { id: 'seed-pasta', name: 'Pasta', quantity: '500', unit: 'g', expiryDate: isoDaysFromToday(365), category: 'Dry goods', addedDate: isoDaysFromToday(-14) },
];
