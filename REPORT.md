# Project Report — UDStudios

Generated: (automatic)

## Snapshot
- Repository root: `UDStudios`
- Stack: MERN (MongoDB, Express, React, Node) + Passport OAuth
- Frontend: `client/` (Create React App style)
- Backend: `server/` (Express + Mongoose + Passport OAuth)

## High-level summary
This repository implements an Image Search web application using the Unsplash API, with session-based OAuth authentication (Google, Facebook, GitHub). Users can search images, multi-select results, view personal search history and global top searches.

## Top-level files and folders
- `README.md` — full project README and API documentation (present).
- `SETUP.md` — quick setup guide and troubleshooting (present).
- `postman_collection.json` — Postman collection (present).
- `client/` — React frontend
  - `package.json` — client scripts & deps
  - `public/index.html`
  - `src/` — React app: `App.js`, `index.js`, `components/*` (Login, Dashboard, HistoryPage, Navigation, etc.)
- `server/` — Express backend
  - `package.json` — server scripts & deps
  - `server.js` — Express entry, session config, route mounting
  - `config/passport.js` — Passport strategies for Google/Facebook/GitHub
  - `middleware/auth.js` — authentication middleware
  - `models/` — `User.js`, `Search.js`
  - `routes/` — `auth.js`, `search.js`, `topSearches.js`, `history.js`

## Important files (short notes)
- `server/server.js` — sets up CORS, sessions, passport, connects to MongoDB, mounts routes, health endpoint at `/api/health`.
- `server/config/passport.js` — implements Google/Facebook/GitHub strategies only if corresponding ENV vars exist; serializes user by MongoDB _id.
- `server/routes/auth.js` — OAuth route flows and endpoints for `/api/auth/*`, `/api/auth/user`, `/api/auth/logout`.
- `server/routes/search.js` — `POST /api/search` (protected) — persists Search record then calls Unsplash API; includes enhanced error handling and helpful messages for Unsplash API errors.
- `server/models/Search.js` — Mongoose schema with indexes on `{ userId, timestamp }` and `{ term }`.
- `client/src/App.js` — React Router setup and auth check via `GET /api/auth/user`; axios configured with `withCredentials = true`.
- `client/src/components/Login.js` — simple OAuth buttons redirecting to backend auth endpoints.

## Dependencies
### Server (`server/package.json`) main dependencies
- express
- mongoose
- passport
- passport-google-oauth20
- passport-facebook
- passport-github2
- express-session
- dotenv
- cors
- axios
- dev: nodemon

### Client (`client/package.json`) main dependencies
- react, react-dom
- react-router-dom
- axios
- dev: react-scripts

## Scripts found
- Server:
  - `npm start` -> `node server.js`
  - `npm run dev` -> `nodemon server.js`
- Client:
  - `npm start` -> `react-scripts start`
  - `npm run build` -> `react-scripts build`
  - `npm test` -> `react-scripts test`

## Environment variables (used / expected)
Add these to `server/.env` (or environment):
- `PORT` (default 5000)
- `MONGODB_URI` (e.g., mongodb://localhost:27017/)
- `SESSION_SECRET`
- `UNSPLASH_ACCESS_KEY`
- `CLIENT_URL` (e.g., http://localhost:3000)
- `SERVER_URL` (optional, used in passport callback URLs)
- OAuth credentials for enabled providers:
  - `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
  - `FACEBOOK_APP_ID`, `FACEBOOK_APP_SECRET`
  - `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`

## How to run (local dev)
1. Backend
   - cd server
   - create `.env` (see env vars above)
   - npm install
   - npm run dev
2. Frontend
   - cd client
   - npm install
   - npm start

The frontend expects the backend at `http://localhost:5000` (proxy set in client `package.json`).

## API overview (key endpoints)
- `GET /api/auth/google|facebook|github` — start OAuth
- `GET /api/auth/*/callback` — OAuth callback
- `GET /api/auth/user` — get current user (requires session cookie)
- `POST /api/auth/logout` — logout
- `POST /api/search` — protected; query body { term }
- `GET /api/top-searches` — top 5 terms aggregate
- `GET /api/history` — user-specific history (protected)
- `GET /api/health` — health check

## Notable implementation details & observations
- Session-based auth using `express-session` with `cookie.secure = false` (OK for local dev; must be `true` behind HTTPS in production).
- Passport strategies register only if env vars are present — flexible for partial provider support.
- Search route validates Unsplash key and returns helpful messages for invalid or rate-limited responses.
- `Search` model has helpful indexes for expected queries.
- Client communicates with server using axios and credentials; login flow depends on session cookie set by server (OAuth redirect flow).

## Quick security & production notes
- Set `cookie.secure: true` and `trust proxy` behind TLS/reverse proxy in production.
- Consider using `helmet` to harden headers and `rate-limit` on search endpoints to avoid API abuse.
- Store sessions in a persistent store (Redis, MongoDB session store) for multi-instance deployments.
- Ensure `SESSION_SECRET` is strong and not checked into source control.
- Limit response data and sanitize user inputs where relevant (server currently trims term but minimal validation exists).

## Quality gates (scoped to repository state, NOT executed runs)
- Build: PASS (build scripts exist for client and server) — note: I did not execute builds here.
- Lint / Typecheck: FAIL (no lint script configured, client has basic `eslintConfig` but no global lint step; no TypeScript present)
- Tests: FAIL (no unit/integration tests or test scripts beyond CRA's default `test` script which is present but no tests included)

## Recommended enhancements (prioritized)
1. Add tests (server: small supertest suites; client: React Testing Library + basic component tests).
2. Add linting & formatting (ESLint + Prettier) and a `lint` script.
3. Use a session store (connect-mongo or Redis) for production reliability.
4. Add helmet and rate-limiter middleware on server.
5. Add CI workflow to run lint, build, and tests on push/PR (GitHub Actions).
6. Improve error handling: standardize error response shape and add request logging (morgan/winston).

## Files inspected (representative)
- `README.md`, `SETUP.md`
- `client/package.json`, `client/public/index.html`, `client/src/index.js`, `client/src/App.js`, `client/src/components/*`
- `server/package.json`, `server/server.js`, `server/config/passport.js`, `server/middleware/auth.js`, `server/models/User.js`, `server/models/Search.js`, `server/routes/*`

## Next steps (suggested, optional)
- I can:
  - add a simple `reports/REPORT.md` (done) and open a PR
  - add a basic GitHub Actions workflow that runs `npm --prefix server install && npm --prefix server run lint` and `npm --prefix client install && npm --prefix client run build` to validate builds
  - implement a `server` health tests and a small `client` smoke test

---

Report saved as `REPORT.md` in project root.

Verification: I read the key files listed above and used those contents to build this report. I did not run `npm install`, build processes, or start processes; if you want I can run local checks (install + build) — say so and I will execute them in the workspace (I will create a terminal session and run the commands on your behalf).