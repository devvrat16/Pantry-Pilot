# Pantry Pilot

A cross-platform pantry management application built with React Native and Expo that helps users organize pantry items, scan barcodes, track expiry dates, and reduce food waste.

## Features

- Manual pantry item management
- Barcode scanning using Expo Camera
- Product lookup with Open Food Facts API
- Expiry date tracking
- Pantry inventory management
- Cross-platform support (Android, iOS, Web)

## Tech Stack

- React Native
- Expo
- TypeScript
- React Navigation
- Expo Camera
- Open Food Facts API
- React Context API
- AsyncStorage

## Getting Started

### Install dependencies

```bash
npm install
```

### Run on Android / iOS

```bash
npx expo start
```

### Run on Web

```bash
npx expo start --web
```

## Project Structure

```
assets/
components/
context/
data/
screens/
types/
utils/
App.tsx
package.json
```

# How Codex & GPT-5.6 Were Used

OpenAI Codex and GPT-5.6 were used as development assistants throughout the project.

### Codex

Codex accelerated implementation by helping with:

- Generating React Native components
- Building the barcode scanning workflow
- Creating reusable UI components
- Refactoring TypeScript code
- Debugging Expo and React Native issues
- Improving project structure
- Writing documentation and README files

### GPT-5.6

GPT-5.6 supported the development process by:

- Explaining React Native and Expo concepts
- Troubleshooting TypeScript and dependency issues
- Helping integrate the Open Food Facts API
- Improving application architecture
- Generating project documentation
- Assisting with Git and GitHub workflows
- Reviewing and improving code quality

The AI tools were used as development assistants while all project decisions, integration, testing, customization, and validation were completed by the project developer.

## Challenges

- Reliable barcode scanning across platforms
- Camera permission handling
- Managing application state
- API integration and error handling
- Creating a clean, beginner-friendly user experience

## Future Improvements

Future versions may include:

- AI-powered recipe recommendations
- Smart shopping list generation
- Nutrition insights
- Receipt scanning
- Cloud synchronization
- Family pantry sharing
- Push notifications for expiring food

## License

MIT License
