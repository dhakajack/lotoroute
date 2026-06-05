# Lotoroute

Mobile-first road bingo for French department numbers and practical European registration codes.

## Features

- 5x5 seeded bingo cards
- France, country-code, and mixed modes
- Location-aware difficulty using dynamic rarity scoring
- Local-only state persistence
- Undoable win highlighting
- Confirmation-protected reset and new-card actions
- French-first UI with English available
- PWA manifest and offline service worker

## Difficulty and Location Model

Lotoroute scores each code relative to the player's selected location. The scoring model uses geographic distance, graph distance, shared-border bonuses, population, and small tuning adjustments to feed three card-generation profiles: Cake walk, Average, and Insane. Cake walk strongly favors nearby/common plates, Average is weighted toward the middle with more easy than hard picks, and Insane favors rare plates while keeping the whole pool eligible.

The connection graph is mostly based on direct land borders between departments and countries. A few practical ferry and tunnel links are included because they materially affect the license plates a player is likely to see:

- Corsica (`2A`, `2B`) connects to `13`, `83`, `06`, and Italy (`I`) for major ferry routes.
- Iceland (`IS`) connects to Denmark (`DK`).
- Cyprus (`CY`) connects to Greece (`GR`).
- Malta (`M`) connects to Italy (`I`).
- The United Kingdom codes (`GB`, `UK`) connect only to `62` / Pas-de-Calais for France-facing travel. Other UK-France and Ireland-France ferry routes exist, but the Calais/Channel Tunnel corridor dominates practical plate flow strongly enough that the model keeps the French connection focused there.

`GB` and `UK` both represent the United Kingdom because both older `GB` markings and newer `UK` markings may be encountered in real traffic.

## Development

Install Node.js 20 or newer, then run:

```bash
npm install
npm run dev
```

## Debug Diagnostics

The app has an opt-in console diagnostic mode for tuning the location-aware scoring model:

```bash
VITE_LOTOROUTE_DEBUG=true npm run dev
VITE_LOTOROUTE_DEBUG=true npm run build
```

When enabled, tapping a grid square prints scoring details to the browser console. The output includes player and destination coordinates, the graph route such as `33->40->64->E->P`, graph and Haversine distance components, shared-border and population components, pair adjustment, raw score, normalized rating, inferred difficulty band, and the selected game difficulty.

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

## License

Lotoroute is available under the MIT License. See `LICENSE` for details.

Third-party fonts, images, regional logos, and public data sources are credited separately in `THIRD_PARTY_NOTICES.md` and remain subject to their own terms.
