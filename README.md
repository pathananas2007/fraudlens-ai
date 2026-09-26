# FraudLens AI

### Multimodal AI-Powered Fraud Investigation & Forensic Intelligence Platform

FraudLens AI is a full-stack forensic investigation platform designed to help investigators analyze suspicious financial evidence, detect inconsistencies, investigate transactions, and generate AI-assisted forensic insights.

The platform combines **computer vision, OCR, machine learning, MongoDB, and Gemini AI** into a unified investigation workspace.

---

## 🚀 Features

### 🔍 AI-Powered Investigation Copilot

Ask natural-language questions about an investigation and receive AI-generated forensic analysis based on the available case evidence.

Examples:

- Explain key visual inconsistencies
- Analyze merchant and amount divergence
- Recommend immediate fraud mitigation steps
- Summarize investigation findings
- Analyze evidence relationships

---

### 🖼️ Multimodal Evidence Analysis

Analyze financial documents and receipts using multiple forensic techniques:

- OCR extraction
- Visual analysis
- Layout analysis
- Image inspection
- Evidence metadata
- Document comparison
- Visual inconsistency detection
- Tampering indicators

---

### 📊 Investigation Dashboard

The executive dashboard provides a centralized overview of:

- Evidence analyzed
- Visual inconsistencies
- Amount mismatches
- Duplicate receipts
- Investigation status
- Risk indicators
- Case activity

---

### 🗂️ Evidence Vault

Centralized evidence management for investigation cases.

Capabilities include:

- Evidence upload
- Evidence metadata
- Evidence categorization
- Evidence timeline
- Forensic viewer
- Investigation-linked evidence
- Cross-evidence analysis

---

### 🔬 Forensic Viewer

Investigators can inspect evidence through multiple analysis views:

- Normal view
- Visual forensic analysis
- OCR information
- Layout information
- Image characteristics
- Evidence annotations

---

### 🔗 Cross-Evidence Investigation

Connect multiple pieces of evidence inside an investigation to identify relationships and inconsistencies.

---

### 💳 Transaction Analysis

Analyze transaction records and identify suspicious patterns involving:

- Merchant information
- Transaction amounts
- Authorization data
- Transaction status
- Fraud indicators

---

### 📑 Investigation Reports

Generate structured investigation reports containing relevant forensic findings and case information.

---

## 🧠 Technology Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Recharts
- Framer Motion

### Backend

- Node.js
- Express
- TypeScript
- REST API

### AI & Machine Learning

- Google Gemini API
- Computer Vision
- OCR
- Layout Analysis
- Decision Tree
- Support Vector Machine
- XGBoost
- Isolation Forest

### Database

- MongoDB Atlas
- MongoDB Node.js Driver

### Authentication

- Firebase Authentication

### Infrastructure

- Docker
- Docker Compose
- Vercel
- Render
- MongoDB Atlas

---

# 🏗️ Architecture

```text
                    ┌──────────────────────┐
                    │      FraudLens AI    │
                    │      React + Vite    │
                    └──────────┬───────────┘
                               │
                               │ REST API
                               ▼
                    ┌──────────────────────┐
                    │   Node.js / Express  │
                    │       Backend        │
                    └──────┬───────┬───────┘
                           │       │
              ┌────────────┘       └─────────────┐
              ▼                                  ▼
     ┌─────────────────┐                ┌─────────────────┐
     │  MongoDB Atlas  │                │   Gemini API    │
     │                 │                │                 │
     │ Investigations  │                │ AI Copilot      │
     │ Evidence        │                │ AI Analysis     │
     │ Transactions    │                │ Multimodal AI   │
     │ Reports         │                └─────────────────┘
     └─────────────────┘

                           │
                           ▼
                 ┌────────────────────┐
                 │ ML / Forensic      │
                 │ Processing         │
                 │                    │
                 │ OCR                │
                 │ Computer Vision    │
                 │ Anomaly Detection │
                 └────────────────────┘
📁 Project Structure
fraudlens-ai/
│
├── backend/
│   └── ml/
│       ├── artifacts/
│       ├── inference/
│       ├── preprocessing/
│       └── training/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── auth/
│   │   ├── common/
│   │   ├── evidence/
│   │   ├── investigation/
│   │   └── layout/
│   │
│   ├── contexts/
│   ├── lib/
│   ├── pages/
│   └── types/
│
├── notebooks/
│
├── Dockerfile
├── docker-compose.yml
├── package.json
├── package-lock.json
├── server.ts
├── tsconfig.json
├── vite.config.ts
└── README.md
⚙️ Local Development
Prerequisites

Make sure you have installed:

Node.js 20+
npm
Git
Docker Desktop (optional)
MongoDB Atlas account
Gemini API key
Firebase project
1. Clone the repository
git clone https://github.com/pathananas2007/fraudlens-ai.git
cd fraudlens-ai
2. Install dependencies
npm install
🔐 Environment Variables

Create a .env file in the project root.

GEMINI_API_KEY=your_gemini_api_key

MONGODB_URI=your_mongodb_atlas_connection_string

JWT_SECRET=your_secure_jwt_secret

For Firebase, configure the required client-side environment variables according to your Firebase configuration.

⚠️ Security

Never commit .env to GitHub.

The repository intentionally ignores environment files.

Use .env.example as the template:

GEMINI_API_KEY=
MONGODB_URI=
JWT_SECRET=
▶️ Run the Application
Development mode
npm run dev

The Vite development server will start locally.

Production build
npm run build

Then start the backend:

npm start

The backend runs on:

http://localhost:3000
🐳 Run with Docker

FraudLens AI can also be run using Docker.

Make sure Docker Desktop is running.

docker compose up --build

Once the container starts:

http://localhost:3000

Check running containers:

docker compose ps

View application logs:

docker compose logs app

Stop the containers:

docker compose down
🍃 MongoDB Atlas

FraudLens AI uses MongoDB Atlas for persistent application data.

The application stores information such as:

Investigations
Evidence
Transactions
Reports
Investigation metadata

Set your Atlas connection string using:

MONGODB_URI=your_mongodb_atlas_uri

Example format:

mongodb+srv://username:password@cluster.mongodb.net/fraudlens

Do not expose the connection string publicly.

🤖 Gemini AI

Gemini powers the AI-assisted investigation capabilities.

The API key is supplied through:

GEMINI_API_KEY=your_key

The backend handles Gemini communication so the API key does not need to be exposed to the browser.

🔐 Authentication

FraudLens AI uses Firebase Authentication for user authentication.

Supported authentication workflows may include:

Email/password authentication
Google authentication
Protected application routes

Firebase configuration should be provided through the appropriate environment variables.

📡 API

The backend exposes REST APIs for major application modules.

Examples:

GET    /api/v1/health
GET    /api/v1/investigations
GET    /api/v1/evidence
GET    /api/v1/transactions
GET    /api/v1/reports
GET    /api/v1/analytics

POST   /api/v1/investigations
POST   /api/v1/evidence/upload
POST   /api/v1/investigations/:id/assistant

Check the backend implementation for the complete API surface.

🧪 Health Check

Verify that the backend is running:

curl http://localhost:3000/api/v1/health

A healthy response should indicate that the API and required services are available.

🚀 Deployment

FraudLens AI is designed to be deployed using:

Frontend → Vercel
Backend  → Render
Database → MongoDB Atlas
AI       → Google Gemini API
Production Architecture
                    Internet
                       │
                       ▼
              ┌─────────────────┐
              │     Vercel      │
              │ React Frontend  │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │     Render      │
              │ Node/Express API│
              └───────┬─────┬───┘
                      │     │
              ┌───────┘     └────────┐
              ▼                      ▼
       ┌──────────────┐       ┌──────────────┐
       │ MongoDB Atlas│       │ Gemini API   │
       └──────────────┘       └──────────────┘
🔄 Continuous Deployment

Once Vercel and Render are connected to the GitHub repository, updates can be deployed automatically.

Local Changes
     │
     ▼
git add .
     │
     ▼
git commit
     │
     ▼
git push
     │
     ▼
GitHub
     │
     ├──────────────► Vercel
     │
     └──────────────► Render
                         │
                         ▼
                    Production
🛡️ Security

FraudLens AI handles potentially sensitive investigation data.

Recommended security practices:

Never commit API keys.
Never commit .env.
Use deployment-platform secrets.
Use strong JWT secrets.
Restrict MongoDB Atlas network access appropriately.
Configure Firebase authorized domains.
Validate uploaded files.
Validate API requests.
Use HTTPS in production.
📈 Current Development Status
Core Platform
 React frontend
 Node.js backend
 REST API
 MongoDB Atlas integration
 Docker support
 Authentication
 Investigation management
 Evidence management
 Transaction analysis
 Reports
 AI Investigation Copilot
 Forensic analysis interface
 ML components
Performance Optimization
 Optimize analytics queries
 Optimize evidence queries
 Evidence pagination
 MongoDB query optimization
 Dashboard request deduplication
 Additional production performance tuning
🧭 Roadmap
Advanced multimodal forensic analysis
Improved document tampering detection
Advanced anomaly detection
Investigation collaboration
Evidence relationship graphs
Automated forensic reports
Advanced audit logging
Production observability
Performance optimization
Scalable file/object storage
⚠️ Disclaimer

FraudLens AI is a software project intended for investigation assistance and research purposes.

AI-generated results and forensic indicators should be reviewed by qualified investigators and should not be treated as definitive proof of fraud without appropriate verification.

👨‍💻 Author

Anas Pathan

AI & Data Science Engineering Student

GitHub:
https://github.com/pathananas2007
