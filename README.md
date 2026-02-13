# AI Fluency Dashboard

Company-wide AI implementation tracking & maturity scoring dashboard.

**Live:** https://ai-fluency-dashboard.vercel.app

## Overview

Tracks AI adoption across 9 business functions (SEO, Paid Media, Creative/Design, Client Success, Sales, Brand, Operations, Recruiting, Finance) with automatic maturity scoring across four tiers:

- **Transformative** — AI autonomously manages core workflows
- **Adaptive** — AI integrated into production pipelines with human oversight
- **Capable** — AI assists with tasks, human review required
- **Unacceptable** — No AI adoption

## Features

- **Auto-scoring** — Implementations scored on complexity, ROI, and time saved. Function-level maturity computed from implementation mix + efficiency metrics
- **Manager Override** — Managers can set the official quarterly maturity level, overriding auto-scoring for reporting
- **Maturity Rubrics** — Per-function descriptions for each tier showing what "good" looks like
- **Function Metrics** — Primary (RPE) and Efficiency metrics pre-populated per function
- **Confetti Celebrations** — Level-up animations when a function reaches a new tier; transformative cards always celebrate
- **Dark UI** — Editorial data intelligence aesthetic (DM Sans + JetBrains Mono, Bloomberg-inspired)

## Tech Stack

- **Frontend:** Single-file HTML/CSS/JS (`public/index.html`)
- **Backend:** Express.js serverless function on Vercel (`api/index.js`)
- **Database:** Neon Serverless PostgreSQL
- **Hosting:** Vercel (auto-deploy from GitHub push)
- **Extras:** canvas-confetti for celebrations

## Project Structure

```
├── public/
│   └── index.html          # Full frontend (UI + scoring logic)
├── api/
│   ├── index.js            # Express serverless API
│   ├── db.js               # Neon database connection
│   ├── defaults.js         # Seed data (functions, rubrics, metrics, implementations)
│   └── seed.js             # DB migration & seed script
├── server.local.js         # Local dev server (port 3001)
├── vercel.json             # Vercel routing config
├── package.json            # Dependencies
└── .env.local              # DATABASE_URL (not committed)
```

## Database Schema

**functions** — `key` (PK), `name`, team config fields, `metric_primary`, `metric_primary_level`, `rubric_*` (4 tiers), `default_primary_metric`, `default_efficiency_metric`, `manager_override`

**implementations** — `id` (PK), `function_key` (FK), `name`, `complexity`, `roi`, `owner`, `description`, `impact`, `time_saved`, `unit`, `frequency`, `created_at`

## Auto-Scoring Thresholds

### Individual Implementation
| Dimension | Capable | Adaptive | Transformative |
|-----------|---------|----------|----------------|
| Complexity | 1-4 | 5-7 | 8-10 |
| ROI | <$3K | $3K-$15K | >$15K |
| Time Saved | <2 hrs/wk | 2-8 hrs/wk | >8 hrs/wk |

Average ≥ 2.5 → Transformative, ≥ 1.8 → Adaptive, else Capable

### Function Level
| Level | Requirements |
|-------|-------------|
| Transformative | 3T, or 2T+3A+25pts, or 6A, or efficiency ≥30% |
| Adaptive | 4A, or 1T+2A, or 15pts, or efficiency 15-30% |
| Capable | 2+ impls, or 5pts, or efficiency <15% |

Points: Capable=1, Adaptive=3, Transformative=5

## Local Development

```bash
# Install dependencies
npm install

# Set up .env.local with DATABASE_URL
echo "DATABASE_URL=your_neon_connection_string" > .env.local

# Seed the database
node api/seed.js

# Run locally
node server.local.js
# → http://localhost:3001
```

## Deployment

Push to `main` → Vercel auto-deploys. DATABASE_URL is set as a Vercel environment variable.
