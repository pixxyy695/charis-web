# CHARIS

CHARIS is a luxury AI gift concierge that helps users discover, curate, and save memorable gifting ideas through a polished conversational workflow.

The project is split into two apps:

- `frontend/` — Next.js 15 application for the landing page, auth, dashboard, chat, recommendations, and premium product experience
- `backend/` — Express + TypeScript + MongoDB API that powers authentication, consultations, saved gifts, dashboard summaries, and AI-backed recommendation flows

## What this project does

CHARIS combines a premium marketing experience with a real backend-powered product flow:

- anonymous landing page demo with a scripted consultation experience
- authenticated consultation flow with persisted conversation history
- AI-generated gift recommendations and product storytelling
- saved gifts and gift-message workflow
- protected account dashboard with live summary data
- dark/light theme and responsive account navigation

## Tech stack

### Frontend
- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- Zustand for auth state
- Framer Motion for UI transitions

### Backend
- Express
- TypeScript
- MongoDB via Mongoose
- JWT authentication
- Rate limiting and CORS protection
- AI provider support for Groq and Ollama

## Project structure

```text
charis-fullstack-checked/
├── frontend/          # Next.js frontend
├── backend/           # Express API
├── render.yaml        # Render deployment config for the backend
└── README.md          # Project overview
```

## Key product flow

1. A visitor lands on the public showroom experience.
2. They can try the demo consultation anonymously.
3. If they choose to sign in or register, the app moves into the protected authenticated flow.
4. The authenticated chat persists data through the backend and surfaces recommendations and saved items.

## Local development

### Prerequisites

- Node.js 18+
- MongoDB server or MongoDB Atlas connection
- Optional: Ollama running locally for real AI responses

### Backend setup

```bash
cd backend
npm install
npm run seed
npm run dev
```

The API runs on:

- http://localhost:4000

Backend environment variables expected in `.env`

### Frontend setup

```bash
cd frontend
npm install
npm run dev
```

The app runs on:

- http://localhost:3000

## Production and deployment

### Backend deployment

This repository includes a Render configuration file at [`render.yaml`](render.yaml) for the backend service.

Use the following deployment variables in Render:

- `MONGODB_URI` — your MongoDB Atlas or MongoDB-hosted connection string
- `JWT_SECRET` — a long secure secret
- `CLIENT_ORIGIN` — your deployed frontend origin
- `GROQ_API_KEY` — if using the Groq provider
- `OLLAMA_BASE_URL` — if using Ollama in production
- `OLLAMA_MODEL` — the model name to use

### Frontend deployment

The frontend is designed to be deployed on Vercel using the supplied configuration. Set the frontend runtime environment variables in Vercel to match the deployed backend URL.

## Notes on AI behavior

- If the user is not authenticated, the UI can still run a lightweight demo experience.
- If the user is authenticated, the frontend talks to the live backend API and can call Ollama or another supported AI provider.
- The app is built so both demo mode and live mode can coexist in the same experience.

## Verification

The repo is intended to be verified with:

```bash
cd frontend && npm run test && npm run build
cd backend && npm test && npm run build
```
