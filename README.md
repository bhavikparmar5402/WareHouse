# Warehouse Management System (MERN)

Modernized Warehouse Management dashboard built with the MERN stack. The React client reproduces the original single-page experience with modular components, camera barcode scanning, reusable toasts/modals, and live data fetched from an Express + MongoDB backend.

## Tech Stack

- **Frontend:** React (Vite), axios, html5-qrcode
- **Backend:** Node.js, Express, express-session, Mongoose
- **Database:** MongoDB (self-managed or Atlas)

## Prerequisites

- Node.js 18+
- npm 8+
- MongoDB connection string (local instance or cloud cluster)

## Quick Start

1. Install dependencies for both apps:

   ```bash
   cd server
   npm install

   cd ../client
   npm install
   ```

2. Configure the database connection string once:

   - Edit `server/.env` and replace the value of `MONGO_URI` with your MongoDB URI.
   - Optional: adjust `SESSION_SECRET` if you prefer a different session secret.

   > The remainder of the code is environment-agnostic—only the connection string needs to change when deploying.

3. Seed the database with demo data (optional but recommended on first run):

   ```bash
   cd server
   npm run seed
   ```

4. Start the backend API:

   ```bash
   cd server
   npm start
   ```

   The server listens on `http://localhost:5000`.

5. Start the React frontend:

   ```bash
   cd client
   npm start
   ```

   Vite serves the client at `http://localhost:5173` and proxies `/api` calls to the Express server.

## Environment Variables

| File          | Variable       | Description                                |
|---------------|----------------|--------------------------------------------|
| `server/.env` | `MONGO_URI`    | MongoDB connection string (required)       |
|               | `SESSION_SECRET` | Secret used for express-session cookies |
| `client/.env` (optional) | `VITE_API_BASE_URL` | Override API URL (defaults to `http://localhost:5000/api`) |

## API Overview

- `POST /api/auth/login` — validates credentials stored in MongoDB (seed user: `admin / admin`) and creates a session.
- `POST /api/auth/logout` — destroys the session.
- `GET /api/items` — fetch all inventory items.
- `POST /api/items` — create a new item.
- `PUT /api/items/:id` — update an existing item.
- `DELETE /api/items/:id` — remove an item.
- `GET /api/activities` — retrieve recent warehouse activity (seeded).
- `POST /api/activities` — add an activity entry.

## Frontend Highlights

- Login gate that persists auth state using the session-aware API.
- Dashboard statistics and activity feed sourced from MongoDB.
- Inventory module with search, brand filtering, edit/delete, and add workflows.
- Barcode scanner page that leverages `html5-qrcode` for camera input.
- Reusable modal and toast components for consistent UX.
- Settings, inbound, and outbound sections retain the original layouts.

## Realtime Phone-to-PC Scanner Demo

Need a dedicated sample that links a phone scanner to a desktop dashboard through Socket.io? Check out `examples/realtime-scanner/`. It contains:

- Minimal Express + Socket.io backend (`server/`) that logs connections and rebroadcasts `barcodeScanned` payloads as `barcodeReceived`.
- Vite + React frontend (`client/`) with two routes: `/dashboard` (desktop modal) and `/scanner` (mobile `html5-qrcode` camera).
- Optional pairing code so only the intended dashboard receives scans.

Follow the README in that folder for install/run steps.

## Testing & Deployment Notes

- For production deployment, host the Express server and React bundle separately or behind the same domain. Update `VITE_API_BASE_URL` (or configure a reverse proxy) accordingly.
- The provided `.env` can be copied directly to production; only the `MONGO_URI` value needs to change.
- Sessions currently use the in-memory store suitable for demos. Configure a production-ready session store (e.g., connect-mongo) before going live.

## Scripts Reference

| Location | Command          | Description                              |
|----------|------------------|------------------------------------------|
| `server` | `npm start`      | Run Express API                          |
|          | `npm run dev`    | Run API with nodemon                     |
|          | `npm run seed`   | Seed MongoDB with demo data and admin user |
| `client` | `npm start`      | Launch Vite dev server                   |
|          | `npm run build`  | Build production assets                  |
|          | `npm run preview`| Preview production build                 |

Enjoy managing your warehouse with a full MERN experience! 🎉
