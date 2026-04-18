# 🚌 TARIQI Bus — Smart Public Transport System for Algeria

**TARIQI Bus** (طريقي باص) is a modern, mobile-first web application for navigating Algeria's public transport system. Built with React, Leaflet, and Supabase.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmdouaour%2FTari9i-Bus&env=VITE_SUPABASE_URL,VITE_SUPABASE_ANON_KEY&envDescription=Supabase%20credentials%20(optional%20%E2%80%94%20app%20works%20in%20demo%20mode%20without%20them)&envLink=https%3A%2F%2Fsupabase.com%2Fdashboard%2Fproject%2F_%2Fsettings%2Fapi&project-name=tari9i-bus&repository-name=Tari9i-Bus)

![TARIQI Bus](https://img.shields.io/badge/TARIQI-Bus-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

## ✨ Features

### 🗺️ Interactive Map
- View all bus routes on an interactive OpenStreetMap
- Color-coded route polylines with stop markers
- Click routes to see detailed stop information
- Simulated live bus positions

### 🔍 Smart Search (A → B Navigation)
- Search by stop name or click on the map
- Find best bus routes between two points
- See walking distance, estimated time, and number of stops
- Alternative route suggestions

### 📊 Admin Dashboard
- Create, edit, and delete bus routes
- Manage stops with coordinates
- Manage bus fleet (assign routes, set status)
- Moderate user reviews
- Monitor simulated bus tracking

### ⭐ Ratings & Reviews
- Rate bus lines (1–5 stars)
- Leave comments about service quality
- View average ratings per route

### 🌍 Multilingual (i18n)
- **Français** (default)
- **العربية** (Arabic with full RTL support)
- **English**

### 📱 Mobile-First PWA
- Installable on Android/iPhone
- Offline-capable
- Responsive design with bottom navigation
- Dark mode support

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + Vite 8 |
| Styling | Tailwind CSS 4 |
| Routing | React Router 7 |
| State | Zustand 5 |
| Maps | Leaflet + react-leaflet + OpenStreetMap |
| Backend | Supabase (PostgreSQL + Auth + Realtime) |
| Icons | Lucide React |
| PWA | vite-plugin-pwa |
| Deploy | Vercel (frontend) + Supabase (backend) |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/mdouaour/Tari9i-Bus.git
cd Tari9i-Bus

# Install dependencies
npm install

# Copy and (optionally) fill in environment variables
cp .env.example .env

# Start development server
npm run dev
```

The app runs in **demo mode** by default with sample Algiers bus route data — no Supabase setup required.

### Build for Production

```bash
npm run build
npm run preview
```

## 🔑 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_SUPABASE_URL` | Optional | Your Supabase project URL (`https://xxxx.supabase.co`) |
| `VITE_SUPABASE_ANON_KEY` | Optional | Your Supabase anonymous/public key |

> **Without these variables the app runs in demo mode** — fully functional with built-in sample data. Set them only when you want a live Supabase backend.

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

## 🌐 Deployment

### Option A — One-Click (Vercel + Supabase) ✅ Recommended

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmdouaour%2FTari9i-Bus&env=VITE_SUPABASE_URL,VITE_SUPABASE_ANON_KEY&envDescription=Supabase%20credentials%20(optional%20%E2%80%94%20app%20works%20in%20demo%20mode%20without%20them)&envLink=https%3A%2F%2Fsupabase.com%2Fdashboard%2Fproject%2F_%2Fsettings%2Fapi&project-name=tari9i-bus&repository-name=Tari9i-Bus)

Click the button above, fill in your Supabase credentials (or leave blank for demo mode), and Vercel deploys automatically.

---

### Option B — Manual Step-by-Step

#### Step 1 — Set up Supabase (backend)

1. Create a free project at [supabase.com](https://supabase.com)
2. In **SQL Editor**, paste and run the contents of [`supabase/schema.sql`](supabase/schema.sql)  
   → This creates all tables, indexes, RLS policies, and seed data
3. Copy your credentials from **Settings → API**:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon / public key** → `VITE_SUPABASE_ANON_KEY`
4. *(Optional — for live bus tracking)*  
   Go to **Database → Replication** and enable Realtime for the `bus_locations` table

#### Step 2 — Deploy to Vercel (frontend)

1. Push your code to GitHub (already done if you forked/cloned)
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository
3. Vercel auto-detects Vite — no framework config needed
4. Under **Environment Variables**, add:
   | Name | Value |
   |------|-------|
   | `VITE_SUPABASE_URL` | your Supabase project URL |
   | `VITE_SUPABASE_ANON_KEY` | your Supabase anon key |
5. Click **Deploy** — your app is live in ~1 minute

The [`vercel.json`](vercel.json) already handles SPA client-side routing (all paths → `index.html`).

#### Step 3 — Verify the deployment

After deploying, open your Vercel URL and check:

```
✅ Home page loads
✅ Map shows bus routes (demo data or real Supabase data)
✅ Search (A → B) returns route suggestions
✅ Admin dashboard is accessible
✅ Language switcher works (AR / FR / EN)
```

To verify your Supabase connection is live, open the browser DevTools → Network tab and look for requests to `*.supabase.co` returning `200`.

## 🔧 Supabase Setup Details

### Tables overview

```
profiles      → User accounts (extends Supabase Auth)
buses         → Bus fleet management
routes        → Bus route definitions
stops         → Geographic stop locations
route_stops   → Ordered stops per route (junction table)
bus_locations → GPS tracking positions
ratings       → User reviews per route
```

All tables have **Row Level Security (RLS)** enabled with role-based access control (`user` / `admin` / `driver`).

## 📁 Project Structure

```
Tari9i-Bus/
├── public/                     # Static assets (icons, favicon)
├── supabase/
│   └── schema.sql              # Full DB schema + RLS policies + seed data
├── src/
│   ├── components/
│   │   ├── admin/              # Admin dashboard components
│   │   │   ├── BusManager.jsx
│   │   │   ├── CommentModerator.jsx
│   │   │   ├── RouteManager.jsx
│   │   │   └── StopManager.jsx
│   │   ├── layout/             # App shell (header, nav)
│   │   │   ├── Header.jsx
│   │   │   ├── Layout.jsx
│   │   │   └── MobileNav.jsx
│   │   ├── map/                # Interactive map
│   │   │   ├── BusMap.jsx
│   │   │   └── RouteListPanel.jsx
│   │   ├── ratings/            # Ratings & reviews
│   │   │   └── RatingsPanel.jsx
│   │   ├── search/             # A→B search
│   │   │   └── SearchPanel.jsx
│   │   └── tracking/           # Bus tracking panel
│   │       └── TrackingPanel.jsx
│   ├── core/
│   │   ├── services/
│   │   │   ├── cacheService.js     # localStorage caching
│   │   │   ├── demoData.js         # Built-in sample data (wilaya-aware)
│   │   │   ├── routingService.js   # A→B BFS routing algorithm
│   │   │   ├── transportService.js # Supabase ↔ cache ↔ demo data layer
│   │   │   └── wilayas.js          # Algeria wilaya list
│   │   ├── store/
│   │   │   └── useTransportStore.js  # Transport-domain Zustand store
│   │   └── utils/
│   │       └── geo.js              # Haversine distance helper
│   ├── hooks/
│   │   ├── useSimulation.js        # Simulated live bus positions
│   │   └── useTranslation.js       # i18n hook
│   ├── lib/
│   │   ├── supabase.js             # Supabase client (null in demo mode)
│   │   ├── demoData.js             # Legacy demo data used by lib/ components
│   │   └── i18n/                   # Translations (AR / FR / EN)
│   │       ├── index.js
│   │       ├── ar.js
│   │       ├── fr.js
│   │       └── en.js
│   ├── pages/                      # Route-level page components
│   │   ├── AdminPage.jsx
│   │   ├── MapPage.jsx
│   │   ├── RatingsPage.jsx
│   │   ├── RoutesPage.jsx
│   │   └── SearchPage.jsx
│   ├── store/
│   │   └── useAppStore.js          # App-wide Zustand store (UI state, city selection)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example                # Environment variable template
├── vercel.json                 # Vercel SPA rewrite rule
├── vite.config.js              # Vite + PWA configuration
└── package.json
```

## 🇩🇿 Adapted for Algeria

- Works **without** official transport APIs
- Designed for low-bandwidth environments
- Routes are manually managed by admins (no external feed needed)
- Bus tracking starts with simulation (Phase 1), ready for real GPS hardware (Phase 2+)
- Full Arabic (RTL) and French language support
- Uses OpenStreetMap — free, no API key required

## 📋 MVP Phases

- [x] **Phase 1** — Static bus routes on interactive map
- [x] **Phase 2** — Admin route / stop / bus management system
- [x] **Phase 3** — A → B search navigation with walking directions
- [x] **Phase 4** — Simulated bus tracking system
- [x] **Phase 5** — Ratings & comments system
- [x] **Bonus** — i18n (AR / FR / EN), dark mode, PWA

## 📄 License

MIT — see [LICENSE](LICENSE) for details.
