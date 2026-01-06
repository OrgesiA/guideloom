# Guideloom

Scaffold for mentor-intern AI assistant platform (Django REST + Celery + PostgreSQL/pgvector + Next.js).

## Structure
- `backend/` – Django project with DRF and JWT auth (SQLite by default for easy local run).
- `frontend/` – Next.js + Tailwind starter with protected-page stubs.

## Quickstart
1) Copy `.env.example` to `.env` and fill secrets.
2) Backend (Windows):
	- `cd backend`
	- `python -m venv .venv`
	- `.\.venv\Scripts\activate`
	- `pip install -r requirements.txt`
	- `python manage.py migrate`
	- `python manage.py createsuperuser`
	- `python manage.py runserver`
3) Frontend: `cd frontend && npm install && npm run dev` (uses `NEXT_PUBLIC_API_BASE` from `.env`).

Auth (dev):
- Backend admin: `admin` / `admin` at `http://127.0.0.1:8000/admin`.
- App login page: `http://localhost:3000/login` (tokens stored in `localStorage`).
- Sign up page: `http://localhost:3000/signup` (creates mentor or intern via `/api/auth/signup/`).

## Notes
- Do **not** commit secrets. Set `OPENAI_API_KEY` in env (never hardcode).
- RAG retrieval must prefer company-scoped knowledge, fall back to general (theory only), and escalate when confidence is low.
- For local-only use, embeddings are stored as JSON; when ready for production, switch to Postgres with pgvector and background workers.

## Next steps
- Wire real auth flow (JWT issuance and refresh).
- Implement AI calls and retrieval ordering tests.
- Flesh out UI flows for tasks, submissions, Q&A, and knowledge approval.
