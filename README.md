# AI Resume Bullet Generator

A modern, client-side web application that transforms project descriptions into professional, achievement-oriented resume bullet points. Built as a portfolio project for the Digital Heroes coding assessment.

![App Screenshot](./screenshots/preview.png)

> **Note:** Add a screenshot of the running app to `screenshots/preview.png` before submitting your portfolio.

## Overview

Students and early-career developers often struggle to translate technical project work into concise, ATS-friendly resume language. This tool bridges that gap by generating three polished bullet points from a simple project brief — no API keys, no backend, and no cost.

## Features

- **Smart template engine** — Generates varied, professional bullets using action verbs and sentence patterns (no paid AI APIs)
- **Project input form** — Project name, technologies, build description, and impact/results
- **Three unique bullet styles** — Different phrasing on every generation for fresh output
- **Copy & export** — Copy individual bullets, copy all, or download as `.txt`
- **Character counters** — Real-time feedback on input length (500 char limit per field)
- **Loading animation** — 1-second generation delay with spinner for polished UX
- **Toast notifications** — Success and error feedback for all actions
- **Dark glassmorphism UI** — Modern, responsive design with smooth animations
- **Fully client-side** — Runs entirely in the browser; deployable on Vercel Hobby (free)

## Tech Stack

| Technology | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI framework |
| [Vite 6](https://vite.dev/) | Build tool & dev server |
| [Tailwind CSS 3](https://tailwindcss.com/) | Utility-first styling |
| [Lucide React](https://lucide.dev/) | Icon library |
| JavaScript (ES modules) | Application logic |

## Project Structure

```
src/
├── components/
│   ├── Hero.jsx           # Page header & title
│   ├── ResumeForm.jsx     # Input form with validation
│   ├── BulletCard.jsx     # Individual bullet display + copy
│   ├── OutputSection.jsx  # Generated output + bulk actions
│   ├── Footer.jsx         # Author info & Digital Heroes link
│   └── Toast.jsx          # Notification component
├── utils/
│   ├── bulletGenerator.js # Template-based bullet generation
│   └── downloadTxt.js     # TXT file download helper
├── App.jsx                # Root application component
├── main.jsx               # React entry point
└── index.css              # Tailwind + custom styles
```

## Local Setup

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm (included with Node.js)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd ai-resume

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

The production build outputs to the `dist/` folder.

## Deployment on Vercel

This project is configured for zero-config deployment on Vercel's free Hobby plan.

### Option 1: Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts. Vercel auto-detects Vite and configures build settings.

### Option 2: GitHub Integration

1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click **Add New Project** → import your GitHub repo
4. Vercel auto-detects the framework:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **Deploy**

No environment variables are required.

## Example

**Input:**

| Field | Value |
|---|---|
| Project Name | MedIntel AI |
| Technologies | FastAPI, LangChain, Supabase, PostgreSQL |
| What did you build? | A medical document question-answering system using Retrieval Augmented Generation |
| Impact | Reduced document search time and improved information accessibility |

**Output (sample):**

- Developed MedIntel AI, a Retrieval-Augmented Generation platform using FastAPI, LangChain, Supabase, and PostgreSQL for intelligent medical document question answering.
- Engineered a semantic search pipeline leveraging vector embeddings and contextual retrieval to improve information accessibility across medical documents.
- Designed and implemented an end-to-end document processing workflow that reduced information lookup time and delivered citation-backed responses.

## Portfolio Description

> Built a client-side resume bullet generator using React, Vite, and Tailwind CSS. Designed a template-based generation engine that produces ATS-friendly, achievement-oriented bullet points without external APIs. Features include glassmorphism UI, copy/export functionality, form validation, and toast notifications. Deployed on Vercel.

## Author

**Shruthi Lanka**  
lshruthi120506@gmail.com

Built for [Digital Heroes](https://digitalheroesco.com)

## License

MIT
