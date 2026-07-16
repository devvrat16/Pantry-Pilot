import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { BookOpen, Home, ShoppingCart } from 'lucide-react-native';

import { PantryProvider } from './context/PantryContext';
import { AddItemScreen } from './screens/AddItemScreen';
import { PantryScreen } from './screens/PantryScreen';
import { RecipeDetailScreen } from './screens/RecipeDetailScreen';
import { RecipesScreen } from './screens/RecipesScreen';
import { ShoppingListScreen } from './screens/ShoppingListScreen';
import { Recipe } from './types';
import { colors } from './utils/theme';

export type RootStackParamList = {
  MainTabs: undefined;
  AddItem: undefined;
  RecipeDetail: { recipe: Recipe };
};

export type TabParamList = {
  Pantry: undefined;
  Recipes: undefined;
  Shopping: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.forest,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: { borderTopColor: colors.border, height: 66, paddingTop: 7 },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarIcon: ({ color, size }) => {
          const Icon = route.name === 'Pantry' ? Home : route.name === 'Recipes' ? BookOpen : ShoppingCart;
          return <Icon color={color} size={size} strokeWidth={2} />;
        },
      })}
    >
      <Tab.Screen name="Pantry" component={PantryScreen} />
      <Tab.Screen name="Recipes" component={RecipesScreen} />
      <Tab.Screen name="Shopping" component={ShoppingListScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <PantryProvider>
        <NavigationContainer>
          <StatusBar style="dark" />
          <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="AddItem" component={AddItemScreen} />
            <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PantryProvider>
    </SafeAreaProvider>
  );
}
