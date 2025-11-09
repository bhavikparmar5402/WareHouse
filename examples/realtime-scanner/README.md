## Realtime Scanner Demo

This self-contained MERN + Socket.io example shows how to scan a barcode on a phone and pop a modal on a desktop dashboard. The folder includes both a backend (`server`) and a frontend (`client`). Keep this separate from the main warehouse app unless you intend to merge functionality.

### Features
- Express + Socket.io backend (port `5000`)
- React + Material UI frontend with two routes:
  - `/dashboard` – open on PC, listens for `barcodeReceived` and shows a modal with action buttons.
  - `/scanner` – open on phone, uses `html5-qrcode` to read barcodes and emits `barcodeScanned`.
- Optional pairing: dashboard displays a 6-character code; phone sends scans tagged with that code so only the paired dashboard reacts.

### Backend Quickstart
```bash
cd server
npm install
npm run dev  # or npm start
```

### Frontend Quickstart
```bash
cd client
npm install
npm run dev -- --host  # expose Vite dev server to LAN for phone access
```

Update `client/.env` (or `VITE_SOCKET_URL`) if the Socket.io server is exposed via a different host, e.g. `http://192.168.1.50:5000` or an `ngrok` URL.

> **Camera note:** Mobile browsers usually require HTTPS or the local network flag plus explicit permission to use the camera. When testing remotely, tunnel both frontend and backend via `ngrok`.
