# Pantry Pilot

An Expo MVP for tracking pantry food, rescuing ingredients near expiry, and turning what is already on hand into practical meal ideas.

## Run it

```bash
npm install
npx expo start
```

This project uses Expo SDK 54, which is compatible with the current App Store and Play Store Expo Go app. Use Expo Go to open the QR code on a physical device, or press `i` / `a` for a local iOS or Android simulator. Camera barcode scanning requires a physical device with camera permission enabled.

If you opened an earlier SDK 57 version of this project, stop Metro first and restart with a cleared cache:

```bash
npx expo start --clear
```

## What is included

- Seeded pantry on first launch, saved locally with AsyncStorage thereafter
- Manual add form with name, quantity, category, and expiry date
- Barcode scanning with Open Food Facts product lookup and editable autofill
- Expiry-sorted pantry with prominent 3-day "use soon" flags
- Ten local recipes, ranked to prioritize ingredients closest to expiry
- Recipe ingredient availability and one-tap missing-item shopping list

## Structure

- `components/` reusable presentation components
- `context/` local persisted pantry and shopping-list state
- `data/` seed pantry items and local recipes
- `screens/` navigation screens
- `utils/recipeMatching.ts` matching and priority-scoring logic

No account, backend, notifications, nutrition tracking, or cloud sync is included by design.
# Pantry-Pilot
