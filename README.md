# Lotoroute

Mobile-first road bingo for French department numbers and practical European registration codes.

## Features

- 5x5 seeded bingo cards
- France, country-code, and mixed modes
- Local-only state persistence
- Undoable win highlighting
- Confirmation-protected reset and new-card actions
- French-first UI with English available
- PWA manifest and offline service worker

## Development

Install Node.js 20 or newer, then run:

```bash
npm install
npm run dev
```

## Checks

```bash
npm run test
npm run build
```

## Static Deployment

Build the app and deploy the generated `dist/` directory to any static host:

```bash
npm run build
```

The app has no backend, accounts, analytics, or runtime network dependency.
