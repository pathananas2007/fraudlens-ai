# FraudLens AI — Multimodal Financial Evidence Forensics

> An AI-powered fraud investigation platform that combines document intelligence, computer vision, OCR, anomaly detection, transaction analysis, and AI-assisted investigation into a unified forensic workspace.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-AWS%20CloudFront-orange?style=for-the-badge)](https://d21zw6n2b48e0s.cloudfront.net)
[![AWS](https://img.shields.io/badge/AWS-Deployed-orange?style=for-the-badge&logo=amazon-aws)](https://aws.amazon.com/)
[![Docker](https://img.shields.io/badge/Docker-Containerized-blue?style=for-the-badge&logo=docker)](https://www.docker.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Backend-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-Frontend-blue?style=for-the-badge&logo=react)](https://react.dev/)

---

## 🚀 Live Demo

### Production Application

**https://d21zw6n2b48e0s.cloudfront.net**

FraudLens AI is deployed on AWS and publicly accessible through Amazon CloudFront.

The production deployment provides:

- HTTPS access
- React/Vite frontend
- Node.js/Express backend
- MongoDB Atlas connectivity
- Gemini-powered AI investigation
- Computer-vision forensic analysis
- OCR processing
- Evidence analysis workflows

---

# 🧩 The Problem

Financial fraud investigations often involve fragmented evidence:

- Invoices
- Receipts
- Transaction records
- Signatures
- Identity documents
- Images
- Merchant information
- Terminal records
- Investigator notes

Investigators may need to manually compare information across these sources to discover inconsistencies.

FraudLens AI brings these evidence sources into a unified investigation workflow and uses AI-assisted analysis to surface relationships, anomalies, and potential inconsistencies.

---

# 💡 The Solution

**FraudLens AI** is a multimodal financial evidence forensics platform designed around an investigation-first workflow.

Instead of treating every piece of evidence independently, the platform combines:

```text
Documents
   +
Images
   +
Transactions
   +
OCR
   +
Computer Vision
   +
Anomaly Detection
   +
AI Investigation
        ↓
Cross-Evidence Analysis
        ↓
Investigation Insights

The goal is to help investigators move from raw evidence to structured findings more efficiently.
🔍 Core Capabilities
1. Multimodal Evidence Analysis
FraudLens AI works with multiple evidence types within the same investigation.
Supported workflows include:
- Document analysis
- Image analysis
- OCR extraction
- Transaction analysis
- Visual forensic analysis
- Cross-evidence comparison
- AI-assisted investigation
2. Forensic Image Analysis
The forensic analysis layer provides multiple visual-analysis techniques, including:
- DCT quantization analysis
- Font baseline analysis
- Perceptual hashing
- Edge analysis
- Contrast analysis
- Visual anomaly detection
- Tampering indicators
These techniques help identify suspicious visual inconsistencies within submitted evidence.
3. OCR & Evidence Extraction
OCR processing extracts information from uploaded evidence and makes it available for downstream investigation.
Extracted information can be compared against:
- Transaction records
- Claimed invoice values
- Merchant information
- Other evidence
- Investigation context
4. Cross-Evidence Analysis
Fraud investigations become more useful when evidence is compared rather than analyzed in isolation.
FraudLens AI can examine discrepancies such as:
Invoice Amount
      │
      ├──────────────┐
      ▼              ▼
Terminal Record   Transaction Data
      │              │
      └──────┬───────┘
             ▼
       Evidence Fusion
             │
             ▼
       Investigation Finding

Example investigation signals include:
- Invoice amount vs. transaction amount
- Evidence inconsistencies
- Suspicious merchant categories
- Altered signatures
- PIN bypass indicators
- Conflicting evidence fields
🤖 AI Investigator
FraudLens AI includes an AI-assisted investigation layer designed to help investigators interpret collected evidence.
The AI Investigator can assist with:
- Evidence interpretation
- Investigation questions
- Finding summaries
- Cross-evidence reasoning
- Forensic explanations
- Investigation context
The application integrates the Google Gemini API for AI-powered analysis.
📊 Investigation Workspace
The application provides a unified workspace for managing investigations.
Key areas include:
Executive Overview
Provides high-level investigation information and relevant metrics.
Forensic Viewer
Provides multiple analysis views including:
- Normal view
- Heatmap/tamper overlays
- OCR bounding boxes
- Edge analysis
- Contrast analysis
Evidence Vault
Central location for investigation evidence and documents.
Investigation Workspace
Allows investigators to work with evidence and compare findings.
Cross-Evidence Matrix
Provides a structured view for identifying relationships and inconsistencies across evidence.
🧠 Machine Learning & Detection
FraudLens AI combines multiple approaches rather than depending on a single classifier.
Historical Baselines
The project preserves:
- Decision Tree
- Support Vector Machine (SVM)
as historical baseline models.
Production-Oriented Detection
The platform also uses:
- XGBoost
- Isolation Forest
for supervised and unsupervised fraud/anomaly detection workflows.
🏗️ System Architecture
                         ┌─────────────────────┐
                         │        User         │
                         └──────────┬──────────┘
                                    │
                                  HTTPS
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │  Amazon CloudFront  │
                         │      CDN / HTTPS    │
                         └──────────┬──────────┘
                                    │
                                    ▼
                ┌────────────────────────────────────┐
                │       AWS Elastic Beanstalk         │
                │                                    │
                │       Single EC2 + Docker           │
                │                                    │
                │  ┌────────────┐  ┌──────────────┐ │
                │  │ React/Vite │  │ Node/Express │ │
                │  │ Frontend   │  │ API Backend  │ │
                │  └────────────┘  └───────┬──────┘ │
                └──────────────────────────┼─────────┘
                                           │
                         ┌─────────────────┼─────────────────┐
                         │                 │                 │
                         ▼                 ▼                 ▼
                 ┌─────────────┐   ┌─────────────┐  ┌──────────────┐
                 │ MongoDB     │   │ Gemini API  │  │ Forensic     │
                 │ Atlas       │   │             │  │ Analysis     │
                 │             │   │ AI          │  │ OCR / CV     │
                 └─────────────┘   └─────────────┘  └──────────────┘

☁️ AWS Deployment Architecture
FraudLens AI is deployed as a containerized application on AWS.
                         Kiro
                          │
                          ▼
                    Amazon ECR
                          │
                     Docker Image
                          │
                          ▼
              Elastic Beanstalk
                          │
                          ▼
                   EC2 Instance
                    + Docker
                          │
                          ▼
                  Amazon CloudFront
                          │
                          ▼
                     Public HTTPS
                          │
                          ▼
                       Users

AWS Services Used
AWS Service	Purpose
Amazon CloudFront	Public HTTPS endpoint and content delivery
Elastic Beanstalk	Application deployment and environment management
Amazon EC2	Compute layer running the Docker application
Amazon ECR	Container image registry
Amazon S3	Elastic Beanstalk deployment/application artifacts
AWS Systems Manager Parameter Store	Secure runtime secrets
IAM	AWS resource permissions and deployment access


🔐 Security & Secrets
Production secrets are not committed to the Git repository.
AWS Systems Manager Parameter Store is used for sensitive runtime configuration.
Stored parameters include:
/fraudlens-ai/GEMINI_API_KEY
/fraudlens-ai/MONGODB_URI
/fraudlens-ai/JWT_SECRET

The parameters are stored as:
SecureString

This keeps sensitive credentials outside the source repository.
🐳 Containerized Deployment
FraudLens AI is packaged as a Docker application.
The production container contains the unified application:
React/Vite Frontend
        +
Node.js/Express Backend
        +
API Routes
        +
Forensic Application Logic

The container image is stored in Amazon ECR and deployed through Elastic Beanstalk.
🧑‍💻 Kiro-Assisted Development
Kiro was used throughout the development and deployment workflow.
The coding-agent workflow included:
Requirements
     │
     ▼
Codebase Analysis
     │
     ▼
Architecture Planning
     │
     ▼
Implementation
     │
     ▼
Debugging
     │
     ▼
Dockerization
     │
     ▼
AWS Integration
     │
     ▼
ECR Deployment
     │
     ▼
Elastic Beanstalk
     │
     ▼
CloudFront
     │
     ▼
Live Application

Kiro assisted with tasks including:
- Project architecture analysis
- Application changes
- AWS CLI workflows
- Docker configuration
- ECR deployment
- Elastic Beanstalk deployment
- CloudFront configuration
- Environment configuration
- Deployment troubleshooting
- Production verification
The development process demonstrates an agent-assisted workflow from an existing application to a publicly deployed AWS application.
🧪 Production Verification
The deployed application was verified through the production CloudFront endpoint.
Health endpoint:
/api/v1/health

The production health response confirmed:
API: ONLINE
MongoDB: CONNECTED
Gemini AI: ONLINE
Forensics Analyzer: ONLINE
CV Engine: READY
OCR Service: CONNECTED
AI Investigator: ONLINE

Production version:
3.0.0-forensics-production

🛠️ Technology Stack
Frontend
- React
- Vite
- TypeScript
- Tailwind CSS
- Framer Motion
- Recharts
Backend
- Node.js
- Express
- TypeScript
AI / ML
- Google Gemini API
- XGBoost
- Isolation Forest
- Decision Tree
- SVM
- Computer Vision
- OCR
- Multimodal analysis
Database
- MongoDB Atlas
Authentication
- Firebase Authentication
- Google OAuth
- Email/password authentication
Infrastructure
- Docker
- Amazon ECR
- Amazon Elastic Beanstalk
- Amazon EC2
- Amazon S3
- Amazon CloudFront
- AWS Systems Manager Parameter Store
- AWS IAM
📁 Project Architecture
A simplified view of the project:
fraudlens-ai/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── lib/
│   └── ...
│
├── server/
│   ├── routes/
│   ├── services/
│   └── ...
│
├── backend/
│   └── ML / research code
│
├── public/
│
├── Dockerfile
├── package.json
├── vite.config.*
├── tsconfig.json
├── .env.example
└── README.md

The Python backend/ directory contains research and machine-learning code. The production web application currently runs through the Node.js/Express application.

⚙️ Local Development
Prerequisites
Install:
- Node.js
- npm
- Docker
- MongoDB Atlas account
- Google Gemini API key
- Firebase project
Install Dependencies
npm install

Environment Variables
Create a local .env file.
Example:
GEMINI_API_KEY=your_gemini_api_key
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development

Firebase client configuration is provided through the application's frontend environment configuration.
Run Development Server
npm run dev

🐳 Docker
Build the application:
docker build -t fraudlens-ai .

Run locally:
docker run -p 3000:3000 fraudlens-ai

Then open:
http://localhost:3000

🚀 Production Deployment
The production deployment follows:
Source Code
     │
     ▼
Docker Build
     │
     ▼
Amazon ECR
     │
     ▼
Elastic Beanstalk
     │
     ▼
EC2
     │
     ▼
CloudFront
     │
     ▼
HTTPS Application

Runtime secrets are supplied through AWS Systems Manager Parameter Store rather than committed to source control.
🔎 Why FraudLens AI?
Traditional fraud analysis can require investigators to manually examine multiple evidence sources.
FraudLens AI focuses on bringing those sources together into a single workflow:
Collect Evidence
      ↓
Extract Information
      ↓
Analyze Visual Evidence
      ↓
Analyze Transactions
      ↓
Detect Anomalies
      ↓
Compare Evidence
      ↓
AI-Assisted Investigation
      ↓
Investigation Findings

This makes the project more than a single fraud-classification model: it is a multimodal investigation platform.
🎯 Project Direction
Future development can extend FraudLens AI with:
- More advanced multimodal models
- Additional forensic detection techniques
- Automated investigation reports
- Larger evidence repositories
- Advanced anomaly detection
- Investigator collaboration
- More cloud-native processing
- Expanded MLOps workflows
🌐 Links
Live Application
https://d21zw6n2b48e0s.cloudfront.net
Repository
https://github.com/pathananas2007/fraudlens-ai
🏆 AWS Zero to Shipped
FraudLens AI was developed and deployed as part of the AWS Zero to Shipped Hackathon.
The project demonstrates the complete journey:
IDEA
 ↓
BUILD
 ↓
AI-ASSISTED DEVELOPMENT
 ↓
CONTAINERIZATION
 ↓
AWS DEPLOYMENT
 ↓
CLOUDFRONT HTTPS
 ↓
LIVE APPLICATION

The project focuses on demonstrating how an AI-assisted development workflow can take a multimodal fraud investigation application from development to a publicly accessible production deployment.
📄 License
This project is provided for educational, research, and demonstration purposes.
FraudLens AI
Multimodal Financial Evidence Forensics
Built with React, Node.js, Machine Learning, Computer Vision, Gemini, MongoDB, Docker, and AWS.

**One correction before you paste it:** the README currently describes S3 as part of the **Elastic Beanstalk deployment/application-artifact path**, not as an evidence-storage system. That's intentional—we shouldn't claim S3 is storing fraud documents unless the code actually does that.

Also, I kept the Python `backend/` distinction because your earlier architecture analysis established that it isn't currently wired into the running Node/Express production server.
