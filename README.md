# Pantry Pilot

A simple cross-platform pantry management application built with React Native and Expo.

## Features

- Add pantry items manually
- Barcode scanning
- Automatic product lookup
- Expiry date tracking
- Food categorization
- Pantry inventory
- Local storage
- Android, iOS, and Web support

## Tech Stack

- React Native
- Expo
- TypeScript
- React Navigation
- Expo Camera
- Open Food Facts API
- AsyncStorage

## Installation

Clone the repository.

```bash
git clone <repository-url>
```

Move into the project.

```bash
cd PantryPilot
```

Install dependencies.

```bash
npm install
```

## Run the project

### Android

```bash
npx expo start
```

Press **a** to open Android.

### iOS

```bash
npx expo start
```

Press **i** to open iOS Simulator.

### Web

```bash
npx expo start --web
```

## Project Structure

```
app/
components/
context/
hooks/
utils/
assets/
```

## Barcode Scanner

The application uses **Expo Camera** for barcode scanning and retrieves product information from the **Open Food Facts API**.

If a product is unavailable, users can manually add the item.

## Future Improvements

- AI recipe recommendations
- Smart shopping lists
- Receipt scanning
- Nutrition analysis
- Cloud backup
- Family sharing
- Push notifications

## License

MIT
