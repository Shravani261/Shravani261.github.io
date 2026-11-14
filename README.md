# Shravani Jagtap — Data Analyst Portfolio (Full-stack)

| Layer     | Tech                                   |
|-----------|----------------------------------------|
| Frontend  | React 18 + Vite + TypeScript + React Router (your original design, extended) |
| Backend   | Python, FastAPI, SQLAlchemy 2          |
| Database  | SQL: SQLite by default; PostgreSQL / MySQL via `DATABASE_URL` |

```
portfolio-fullstack/
  frontend/   React app (same components and styles as the original)
  backend/    FastAPI app + SQL models + seed data
```

## 1. Run the backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env               # then edit ADMIN_TOKEN
uvicorn app.main:app --reload --port 8000
```
Tables are created and seeded automatically on first start (projects, skills,
certificates, About text). API docs: http://localhost:8000/docs

## 2. Run the frontend
```bash
cd frontend
npm install
npm run dev                        # http://localhost:5173
```
Vite proxies `/api/*` to `localhost:8000`. If the API is down, the page falls
back to the default content in `src/config/siteConfig.ts`, so it never shows blank.

## What comes from the database
- Hero portrait, About photo, email, LinkedIn, GitHub
- Skills, Projects, Certificates, About text
- Contact form submissions are **stored** in the `contact_messages` table

## Editing content (admin API)
Send header `X-Admin-Token: <ADMIN_TOKEN from .env>`. Easiest via http://localhost:8000/docs
(click Authorize is not wired; add the header in "Try it out" or use curl):

```bash
# update email / links / photos
curl -X PUT localhost:8000/api/admin/profile -H "X-Admin-Token: TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"email":"me@example.com","linkedin":"https://linkedin.com/in/you","portrait":"/portrait.png"}'

# add a project
curl -X POST localhost:8000/api/admin/projects -H "X-Admin-Token: TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"New project","icon":"📈","description":"...","tech":["Python"],"url":"","code":""}'

# read contact messages
curl localhost:8000/api/admin/messages -H "X-Admin-Token: TOKEN"
```
Put portrait images in `frontend/public/` and set `portrait` to e.g. `/portrait.png`.

## API
| Method | Path | Purpose |
|--------|------|---------|
| GET  | `/api/portfolio` | Everything the page needs in one call |
| GET  | `/api/projects`, `/api/certificates` | Lists |
| POST | `/api/contact` | Save a contact message |
| GET  | `/api/admin/messages` | Admin: read messages |
| POST/PUT/DELETE | `/api/admin/projects[/id]`, `/api/admin/certificates[/id]` | Admin CRUD |
| PUT  | `/api/admin/profile` | Admin: update profile/about |

## Switching to PostgreSQL/MySQL
Set `DATABASE_URL` in `backend/.env` and `pip install psycopg2-binary` (or `pymysql`).

## Production
- `cd frontend && npm run build` → serve `dist/` from any static host; set `VITE_API_URL` to the API origin.
- Run the API with `uvicorn app.main:app --host 0.0.0.0 --port 8000` behind a reverse proxy, and set `CORS_ORIGINS` to your site's URL.


---

## v2: multi-page site, journey and playground

Pages (React Router): `/` Home, `/experience`, `/projects`, `/certificates`, `/playground`.
About and Contact stay on the home page (`/#about`, `/#contact`).

**Where to edit your content: `frontend/src/config/siteConfig.ts`**
- `projects` (add as many as you like; `category` is `ml`, `dashboard` or `analytics`; fill `url` and `code` with your links)
- `certs` (add `url` for the verify link, `image` for a file in `public/certs/`)
- `journey` (the Experience path: one object per stop; leave `when` empty to hide a date)
- `site` (email, LinkedIn, GitHub), `skills`, `nav`

Projects and certificates are now read from `siteConfig.ts` (not from the database), so the page looks the same
whether or not the API is running. The contact form still saves to the API.

Playground games live in `frontend/src/components/playground/`.
Animations and styles are at the end of `frontend/src/styles/global.css` (they respect "reduce motion").

**Deploying a multi-page SPA:** the host must serve `index.html` for every path.
`public/_redirects` (Netlify) and `vercel.json` (Vercel) are included. For GitHub Pages, add a `404.html` copy of `index.html`.
