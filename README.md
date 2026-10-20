# StressIQ Frontend (React + Vite)

## Run it
1. Install Node.js (LTS) from nodejs.org
2. In this folder:
   ```
   npm install
   npm run dev
   ```
3. Open http://localhost:5173

The app works on its own in **demo mode** (scores are calculated in the browser and saved in browser storage).
When the Flask backend runs on port 5000, the app uses it automatically (Vite forwards /api to it).

## Backend API the frontend expects
| Method | Path | Body | Response |
|---|---|---|---|
| POST | /api/login | `{ name, email, password }` | `{ id, name, email }` |
| POST | /api/submit | `{ userId, answers: { "1": 0-4, ... "10": 0-4 } }` | `{ score, level, topFactors: [{ category, impact }] }` |
| GET | /api/history/:userId | | `[{ score, level, date }]` |

`level` is "Low", "Moderate" or "High".

## Folder structure
- `src/pages` Login, Dashboard, Questionnaire, Result, History
- `src/components` Navbar, StressGauge, TrendChart
- `src/services/api.js` all backend calls (with demo-mode fallback)
- `src/data/questions.js` the 10 questions; edit or add questions here
- `src/utils/scoring.js` local scoring used in demo mode
