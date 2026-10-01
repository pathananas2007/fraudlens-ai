# FraudLens AI — Multimodal AI Fraud Investigation Platform

<div align=*center*>

### AI-Powered Financial Evidence Forensics

FraudLens AI is a multimodal fraud investigation platform that brings financial documents, transaction data, computer vision, **OCR**, anomaly detection, and AI-assisted investigation into a single forensic workspace.


<br>

[![Live Demo](https://img.shields.io/badge/LIVE%20DEMO-AWS%20CLOUDFRONT-orange?style=for-the-badge)](https://d21zw6n2b48e0s.cloudfront.net/)

### ☁️ AWS Infrastructure

[![AWS](https://img.shields.io/badge/AWS-CLOUD%20DEPLOYED-orange?style=for-the-badge&logo=amazonaws&logoColor=white)](https://aws.amazon.com/)
[![CloudFront](https://img.shields.io/badge/CloudFront-HTTPS%20%26%20CDN-orange?style=for-the-badge&logo=amazonaws&logoColor=white)](https://aws.amazon.com/cloudfront/)
[![S3](https://img.shields.io/badge/Amazon%20S3-STORAGE-orange?style=for-the-badge&logo=amazonaws&logoColor=white)](https://aws.amazon.com/s3/)
[![ECR](https://img.shields.io/badge/Amazon%20ECR-CONTAINER%20REGISTRY-orange?style=for-the-badge&logo=amazonaws&logoColor=white)](https://aws.amazon.com/ecr/)
[![Elastic%20Beanstalk](https://img.shields.io/badge/Elastic%20Beanstalk-PRODUCTION-orange?style=for-the-badge&logo=amazonaws&logoColor=white)](https://aws.amazon.com/elasticbeanstalk/)

### 🧠 Application Stack

[![React](https://img.shields.io/badge/React-FRONTEND-blue?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-TYPED%20UI-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-BACKEND-green?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-ML%20%26%20AI-yellow?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Docker](https://img.shields.io/badge/Docker-CONTAINERIZED-blue?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-DATABASE-green?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Gemini](https://img.shields.io/badge/Gemini-GENERATIVE%20AI-blue?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-AUTHENTICATION-orange?style=for-the-badge&logo=firebase&logoColor=white)](https://firebase.google.com/)

</div>

---

# 📌 Table of Contents

- [Overview](#-overview)
- [Problem](#-problem)
- [Solution](#-solution)
- [Core Concept](#-core-concept)
- [How FraudLens AI Works](#-how-fraudlens-ai-works)
- [Investigation Workflow](#-investigation-workflow)
- [Platform Modules](#-platform-modules)
- [Multimodal Evidence Analysis](#-multimodal-evidence-analysis)
- [Computer Vision & Forensics](#-computer-vision--forensics)
- [**OCR** & Document Intelligence](#-ocr--document-intelligence)
- [Machine Learning](#-machine-learning)
- [Evidence Fusion Engine](#-evidence-fusion-engine)
- [AI Investigator](#-ai-investigator)
- [Transaction Intelligence](#-transaction-intelligence)
- [Architecture](#-architecture)
- [**AWS** Architecture](#-aws-architecture)
- [**AWS** Services](#-aws-services)
- [Application Architecture](#-application-architecture)
- [Security](#-security)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
- [Environment Configuration](#-environment-configuration)
- [Local Development](#-local-development)
- [**API** Architecture](#-api-architecture)
- [Design Philosophy](#-design-philosophy)
- [Development Journey](#-development-journey)
- [Future Improvements](#-future-improvements)
- [Project Status](#-project-status)
- [Links](#-links)

---

# 🔎 Overview

Fraud detection traditionally focuses on structured transaction data.

A transaction may be classified as:


or: **SUSPICIOUS**

However, real investigations are rarely limited to a single transaction.
An investigator may need to examine:
- invoices
- receipts
- transaction records
- merchant information
- signatures
- identity documents
- uploaded images
- **OCR**-extracted information
- transaction patterns
- previous investigation evidence
The challenge is that these sources often exist independently.
FraudLens AI brings these signals together.
Instead of treating every piece of evidence as an isolated input, the platform creates an investigation context where multiple sources can be analyzed and compared.
🚨 The Problem
Financial fraud investigations can involve a large amount of heterogeneous evidence.
A suspicious transaction by itself may not provide enough context to understand what happened.
For example:
Invoice
Amount: ₹48,**500**
    │
    ▼
Transaction
Amount: ₹58,**500**
    │
    ▼
### Visual Document Analysis
Possible modification detected
    │
    ▼
**OCR**
Merchant / amount extracted
    │
    ▼
ML Analysis
Transaction anomaly detected
    │
    ▼
### Evidence Fusion
Multiple inconsistent signals

The important question therefore becomes: How do the different pieces of evidence relate to one another?

FraudLens AI is designed around this investigation problem.
💡 Solution
FraudLens AI combines multiple analytical layers into one workflow.
    ┌──────────────────────┐
    │       Evidence       │
    └──────────┬───────────┘
    │
    ┌────────────────┼────────────────┐
    │                │                │
    ▼                ▼                ▼
    Documents        Images         Transactions
    │                │                │
    ▼                ▼                ▼
    **OCR**          Computer Vision      ML
    │                │                │
    └────────────────┼────────────────┘
    ▼
    Evidence Correlation
    │
    ▼
    Evidence Fusion
    │
    ▼
    AI Investigation
    │
    ▼
    Investigator Review

The platform therefore focuses on investigation support, rather than simply producing a fraud/not-fraud prediction. 🧠 Core Concept FraudLens AI follows a simple principle: A fraud signal becomes more useful when it can be connected to supporting evidence.

For example:
Transaction anomaly
        +
Invoice mismatch
        +
Document alteration signal
        +
Merchant inconsistency
        +
**OCR** discrepancy
        ↓
### Investigation Context

The system can bring these signals together so an investigator can review the evidence in one place.
🔄 How FraudLens AI Works
The complete investigation pipeline can be represented as:
    Evidence Upload
    │
    ▼
    Evidence Registration
    │
    ▼
    ┌────────────────────────┐
    │ Document / Image Input │
    └────────────┬───────────┘
    │
    ┌───────────┴───────────┐
    ▼                       ▼
    **OCR**                Visual Analysis
    │                       │
    ▼                       ▼
    Structured Fields       Forensic Signals
    │                       │
    └───────────┬───────────┘
    ▼
    Transaction Analysis
    │
    ▼
    ML Anomaly Detection
    │
    ▼
    Cross-Evidence Checks
    │
    ▼
    Evidence Fusion
    │
    ▼
    AI Investigator
    │
    ▼
    Human Investigation

🕵️ Investigation Workflow
## Create an Investigation
An investigator begins by creating an investigation workspace.
The investigation acts as the central container for:
- evidence
- transactions
- analytical results
- findings
- AI-generated investigation context
- reports
## Add Evidence
Evidence can include financial documents, images, transaction information, and other investigation artifacts.
Each evidence item becomes part of the investigation context.
Investigation
│
├── Invoice
├── Receipt
├── Transaction
├── Signature Image
├── Supporting Document
└── Analysis Results

## Extract Information

Documents can be processed through **OCR** and document analysis. The extracted information can include fields such as: Merchant ### Transaction Amount Date ### Reference Number ### Account Information ### Invoice Information

These values can then be compared with other evidence.
## Analyze Visual Evidence
Uploaded images can be inspected through forensic visualization tools.
The Forensic Viewer provides multiple analytical views instead of displaying only the original image.
## Run Transaction Analysis
Transaction data can be evaluated using machine learning and rule-based evidence checks.
The system can identify anomalous transaction patterns and potentially suspicious characteristics.
## Compare Evidence
The Evidence Fusion Engine checks whether information across evidence sources is consistent.
Example:
Invoice
₹50,**000**
    │
    ├───────────────┐
    ▼               │
Transaction         │
₹55,**000**             │
    │               │
    └───────┬───────┘
    ▼
    Discrepancy

## AI-Assisted Investigation

The available evidence and analytical results can be provided to the AI investigation layer.
The AI assistant can help synthesize the available investigation context into structured insights.
## Human Review
FraudLens AI is designed to support investigators.
The final investigation remains a human-driven process where evidence can be reviewed, compared, and validated.
🧩 Platform Modules
### Executive Overview
The executive dashboard provides a high-level view of the investigation environment.
It can surface:
- investigation statistics
- evidence statistics
- transaction signals
- suspicious activity
- analytical indicators
- investigation activity
📁 Evidence Vault
The Evidence Vault acts as the centralized evidence repository.
It is designed to provide investigators with a single place to access investigation artifacts.
Typical evidence categories include:
Documents
Images
Invoices
Receipts
Transactions
### Supporting Evidence
### Analysis Results

The purpose is to reduce fragmentation during an investigation.
🔬 Forensic Viewer
The Forensic Viewer provides an investigation-oriented interface for image analysis.
It includes views such as:
### Normal View
Displays the original evidence.
### Heatmap View
Provides visual overlays for potentially suspicious image regions.
**OCR** Bounding Boxes
Displays extracted text locations on the document.
### Edge Analysis
Examines image edges and structural changes.
### Contrast Analysis
Provides another visual signal that can help inspect manipulated regions.
These views are intended as forensic signals for investigation, not as standalone proof of fraud.
🔗 Cross-Evidence Matrix
The Cross-Evidence Matrix is designed to help investigators understand relationships between evidence items.
Example:
                  Invoice   Transaction   Signature   Merchant
Invoice              ✓           ✓            -           ✓
Transaction          ✓           ✓            -           ✓
Signature            -           -            ✓           -
Merchant             ✓           ✓            -           ✓

This creates an investigation-oriented view of evidence relationships.
📊 Analytics
The analytics layer provides visibility into investigation and transaction-level information.
It can be used to examine:
- transaction patterns
- anomaly indicators
- investigation activity
- evidence statistics
- analytical results
The objective is to transform raw investigation data into information that can be reviewed more efficiently.
🤖 AI Investigator
The AI Investigator is the generative AI component of FraudLens AI.
It uses the investigation context to assist with:
- evidence interpretation
- finding synthesis
- investigation questions
- cross-evidence reasoning
- structured forensic summaries
The AI layer is not intended to replace investigator judgment.
Instead:
AI
 ↓
Assists
 ↓
Investigates
 ↓
Explains
 ↓
### Human Review

📝 **OCR** & Document Intelligence
**OCR** converts visual document content into structured information that can be used by downstream analysis.
A simplified pipeline is:
Image / Document
    ↓
    **OCR**
    ↓
### Text Extraction
       ↓
### Field Identification
       ↓
### Structured Evidence
       ↓
Cross-Evidence Comparison

This is particularly useful when important values exist inside documents rather than structured databases.
👁️ Computer Vision & Forensics
Computer vision analysis provides additional evidence signals from images.
The system can examine:
- image structure
- edges
- contrast
- visual regions
- **OCR** locations
- potential manipulation indicators
The platform presents these signals through the Forensic Viewer so an investigator can inspect the evidence directly.
🚨 Anomaly Detection
FraudLens AI combines supervised machine learning with unsupervised anomaly detection.
XGBoost
XGBoost is used as a high-performance supervised machine learning approach for classification-oriented fraud analysis.
### Isolation Forest
Isolation Forest provides an unsupervised approach for identifying observations that differ from normal transaction behavior.
### Decision Tree
Decision Tree was retained as a baseline model from the earlier fraud detection implementation.
**SVM**
Support Vector Machine was also retained as a historical baseline.
This allows the project to preserve the evolution from the original ML-based fraud classifier toward the broader multimodal investigation platform.
🔗 Evidence Fusion Engine
The Evidence Fusion Engine is one of the central ideas behind FraudLens AI.
Instead of asking:
*Is this transaction suspicious?*

the system can ask: "Are the available pieces of evidence consistent with one another?"

Examples of cross-evidence checks include:
### Amount Consistency
### Invoice Amount
      ↕
### Transaction Amount

### Merchant Consistency

### Invoice Merchant
      ↕
### Transaction Merchant

### Document Integrity

### Original Evidence
      ↕
### Visual Forensic Signals

### Transaction Signals

Transaction
      ↓
### Anomaly Detection
      ↓
### Risk Indicators

These individual signals can contribute to a larger investigation context.
💳 Transaction Intelligence
Transaction analysis provides the structured-data side of the investigation.
Potential investigation signals include:
- unusual transaction behavior
- suspicious merchant categories
- transaction inconsistencies
- amount mismatches
- **PIN** bypass indicators
- relationships between transaction records and uploaded evidence
The transaction layer becomes more useful when combined with document and visual evidence.
🏗️ System Architecture
    ┌─────────────────────┐
    │        User         │
    └──────────┬──────────┘
    │
    ▼
    ┌─────────────────────┐
    │   React Frontend    │
    │                     │
    │ Dashboard           │
    │ Evidence Vault      │
    │ Forensic Viewer     │
    │ Investigation       │
    │ Analytics           │
    │ AI Investigator     │
    └──────────┬──────────┘
    │
    │ **REST** **API**
    ▼
    ┌─────────────────────┐
    │ Node.js / Express   │
    │      Backend        │
    └──────────┬──────────┘
    │
    ┌───────────────────┼───────────────────┐
    │                   │                   │
    ▼                   ▼                   ▼
    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
    │   MongoDB    │    │    Gemini    │    │ ML / Forensic│
    │    Atlas     │    │      AI      │    │    Analysis   │
    └──────────────┘    └──────────────┘    └──────────────┘

☁️ **AWS** Architecture
The production application is deployed on **AWS** using a containerized architecture.
    **INTERNET**
    │
    ▼
    ┌────────────────────────┐
    │    Amazon CloudFront   │
    │                        │
    │ **HTTPS** + **CDN** + Edge     │
    └───────────┬────────────┘
    │
    ▼
    ┌────────────────────────┐
    │  Elastic Beanstalk      │
    │  Production Environment │
    └───────────┬────────────┘
    │
    ▼
    ┌────────────────────────┐
    │    Docker Container     │
    │                        │
    │ React + Node.js **API**     │
    └───────┬─────────┬──────┘
    │         │
    ┌───────────┘         └──────────────┐
    ▼                                    ▼
    ┌─────────────────┐                  ┌─────────────────┐
    │  MongoDB Atlas  │                  │   Gemini **API**    │
    │    Database     │                  │   AI Services   │
    └─────────────────┘                  └─────────────────┘

                    **AWS** Deployment Infrastructure

    ┌─────────────────┐
    │   Amazon **ECR**    │
    │ Docker Registry │
    └────────┬────────┘
    │
    ▼
    Elastic Beanstalk

    ┌─────────────────┐
    │   Amazon S3     │
    │ Object Storage  │
    └─────────────────┘

☁️ **AWS** Services Explained Amazon CloudFront CloudFront provides the public **HTTPS** entry point for the application. The production application is accessible through: [https://d21zw6n2b48e0s.cloudfront.net](https://d21zw6n2b48e0s.cloudfront.net)

CloudFront provides:
- **HTTPS** delivery
- **CDN** capabilities
- global edge distribution
- public application access
- an **AWS**-managed production endpoint
🪣 Amazon S3
Amazon S3 provides object storage within the **AWS** architecture.
S3 is suitable for storing application assets and evidence-related objects because it is designed specifically for durable cloud object storage.
The architecture can therefore separate:
### Application Runtime
        ≠
### Object Storage

This allows large files and evidence objects to be handled independently from application compute.
📦 Amazon **ECR**
Amazon Elastic Container Registry stores the Docker images used for deployment.
The deployment pipeline follows:
### Source Code
     ↓
### Docker Build
     ↓
### Docker Image
     ↓
Amazon **ECR**
     ↓
### Elastic Beanstalk
     ↓
Production

**ECR** provides the registry layer between the local development environment and the **AWS** production environment.
🚀 **AWS** Elastic Beanstalk
Elastic Beanstalk provides the production application environment for the Dockerized application.
Instead of manually configuring the application server, the deployment uses Beanstalk to manage the application environment.
The deployed container contains the unified application:
### React Frontend
      +
Node.js / Express
      +
**REST** **API**
      +
### Application Services

🔐 Security & Secrets FraudLens AI keeps sensitive configuration outside the application source code. Runtime secrets include: GEMINI_API_KEY MONGODB_URI JWT_SECRET

These values are stored using **AWS** Systems Manager Parameter Store.
The principle is:
### Source Code
    ✕
Secrets

**AWS** Runtime Configuration
    ✓
Secrets

This prevents credentials from being intentionally committed to Git.
🔑 Authentication
Firebase Authentication is used for user authentication.
The application supports:
- Google authentication
- Email/password authentication
- Demo investigator accounts
Authentication is handled separately from the application's core investigation logic.
This allows the investigation system to focus on evidence and analysis while Firebase manages the authentication layer.
🐳 Docker Architecture
The application is packaged into a Docker image so that development and production use a consistent runtime.
### Developer Environment
    │
    ▼
    Dockerfile
    │
    ▼
    Docker Image
    │
    ▼
    Amazon **ECR**
    │
    ▼
### Elastic Beanstalk
    │
    ▼
    Production

Containerization also makes it easier to reproduce the application environment. 🔌 **API** Architecture The backend exposes a **REST** **API** under: /api/v1

The **API** is responsible for application operations such as: Investigations Evidence Transactions Analytics Reports AI Assistant Health

A simplified request flow looks like:
React
    │
    │ **HTTP** Request
    ▼
/api/v1
    │
    ▼
### Express Router
    │
    ├── Investigation Services
    ├── Evidence Services
    ├── Transaction Services
    ├── Analytics Services
    ├── Report Services
    └── AI Services

❤️ Health Monitoring The production backend exposes a health endpoint: /api/v1/health

This allows the deployed environment to be checked independently from the frontend. The health response reports service-level information such as: **API** MongoDB AI Services **OCR** ### Forensic Analysis

This makes it easier to verify the complete production stack.
🧱 Application Design
FraudLens AI uses a modular SaaS-oriented structure.
The frontend is separated into functional areas rather than implementing the entire interface as a single page.
Major UI areas include:
Dashboard
    │
    ├── Investigations
    │
    ├── Evidence Vault
    │
    ├── Forensic Viewer
    │
    ├── Transactions
    │
    ├── Analytics
    │
    ├── Reports
    │
    └── AI Investigator

This makes the application easier to extend as additional investigation capabilities are introduced. 🧪 Production-Oriented Design The project is not limited to a single machine learning notebook. The system combines: Frontend Backend Database Authentication ### Machine Learning ### Computer Vision **OCR** Generative AI Docker ### Cloud Infrastructure ### Production Deployment

This allows the project to demonstrate the complete lifecycle from model experimentation to an accessible application. 🧬 Project Evolution FraudLens AI originated from a traditional machine-learning fraud detection implementation. The earlier workflow was primarily: Dataset ↓ ### Feature Engineering ↓ ML Model ↓ ### Fraud Prediction

The project was then expanded into a multimodal investigation platform.
The architecture evolved toward:
    ┌── Documents
    │
    ├── Images
    │
Evidence ───────────┼── Transactions
    │
    ├── **OCR**
    │
    └── Visual Analysis
    │
    ▼
    Evidence Fusion
    │
    ▼
    AI Investigator
    │
    ▼
    Human Investigation

This evolution changed the focus from simply predicting fraud to helping investigate fraud. 🛠️ Development Workflow The project was developed iteratively. The development process included: Idea ↓ Existing ML Project ↓ ### Architecture Expansion ↓ ### Multimodal Evidence ↓ Forensic UI ↓ AI Integration ↓ Dockerization ↓ **AWS** Infrastructure ↓ ### Production Deployment ↓ ### Live Application

AI-assisted development tools were also used during the engineering process to accelerate implementation, debugging, architecture work, and deployment tasks.
🧰 Technology Stack
Layer	Technology
Frontend	React
Language	TypeScript
Build Tool	Vite
Backend	Node.js
**API** Framework	Express
Machine Learning	Python
ML Libraries	Scikit-learn, XGBoost
Data Processing	Pandas, NumPy
Visualization	Matplotlib
AI	Google Gemini
Computer Vision	Image Forensic Analysis
**OCR**	**OCR** / Document Extraction
Database	MongoDB Atlas
Authentication	Firebase Authentication
Containerization	Docker
Container Registry	Amazon **ECR**
Application Hosting	**AWS** Elastic Beanstalk
**CDN**	Amazon CloudFront
Object Storage	Amazon S3
Secrets	**AWS** Systems Manager Parameter Store
Cloud Platform	**AWS**

📂 Major Functional Areas FraudLens AI │ ├── Executive Overview │ ├── Investigation Workspace │ ├── Evidence Vault │ ├── Forensic Viewer │   ├── Normal View │   ├── Heatmap │   ├── **OCR** Bounding Boxes │   ├── Edge Analysis │   └── Contrast Analysis │ ├── Cross-Evidence Matrix │ ├── Transaction Analysis │ ├── Analytics │ ├── Reports │ ├── AI Investigator │ ├── Authentication │ └── ML / Forensic Analysis

🖥️ Local Development
Prerequisites
Before running the project locally, install:
- Node.js
- npm
- Python
- MongoDB connection
- Docker
- Git
Clone the Repository
git clone [https://github.com/pathananas2007/fraudlens-ai.git](https://github.com/pathananas2007/fraudlens-ai.git)

cd fraudlens-ai

### Install Dependencies

npm install

If Python ML components are required: pip install -r requirements.txt

⚙️ Environment Variables Create a local .env file for development. Example: GEMINI_API_KEY=your_gemini_api_key MONGODB_URI=your_mongodb_connection_string JWT_SECRET=your_jwt_secret FRONTEND_URL=[http://localhost:**3000**](http://localhost:**3000**)

Firebase client configuration can be provided through the appropriate frontend environment variables. Never commit real **API** keys, database credentials, **JWT** secrets, or other private credentials to Git.

▶️ Run Development Environment Start the development application using the project's configured npm scripts. npm run dev

The exact development ports depend on the current project configuration. 🐳 Docker Build the application: docker build -t fraudlens-ai .

Run the container: docker run -p **3000**:**3000** fraudlens-ai

The production deployment uses the same containerized application model.
🚀 **AWS** Deployment Flow
The production deployment follows:
    Developer
    │
    ▼
    Source Repository
    │
    ▼
    Docker Build
    │
    ▼
    Amazon **ECR**
    │
    ▼
    Elastic Beanstalk
    │
    ▼
    Application Server
    │
    ▼
    CloudFront **HTTPS**
    │
    ▼
    User

Supporting infrastructure:
**AWS** Systems Manager
    │
    ▼
### Runtime Secrets

Amazon S3
    │
    ▼
Object / Evidence Storage

📡 Production Endpoint The application is publicly accessible through **AWS** CloudFront: ### Live Demo [https://d21zw6n2b48e0s.cloudfront.net/](https://d21zw6n2b48e0s.cloudfront.net/) The backend health endpoint is: [https://d21zw6n2b48e0s.cloudfront.net/api/v1/health](https://d21zw6n2b48e0s.cloudfront.net/api/v1/health)

🎯 Design Philosophy
FraudLens AI is built around four principles.
## Evidence First
The system starts with evidence rather than treating the ML prediction as the final answer.
## Multimodal Analysis
Different evidence formats can contribute different signals.
## Explainable Investigation
The investigator should be able to inspect the evidence and analytical signals behind an investigation.
## Human-in-the-Loop
AI assists investigation workflows while human review remains central to interpreting evidence and making decisions.
🔮 Future Improvements
Potential future development areas include:
- More advanced multimodal models
- Improved document understanding
- Additional fraud datasets
- Graph-based evidence relationships
- Advanced transaction risk scoring
- Automated investigation timelines
- More detailed audit trails
- Role-based investigator permissions
- Expanded cloud-native storage workflows
- Automated model monitoring
- Model explainability dashboards
- Investigation collaboration
- Advanced report generation
- Additional forensic image techniques
📈 Future Architecture Direction
The current deployment uses a unified container architecture.
A future cloud-native architecture could separate the major workloads:
    CloudFront
    │
    ┌────────┴────────┐
    ▼                 ▼
    S3            **API** Gateway
    Frontend               │
    ▼
    **AWS** Lambda
    │
    ┌──────────────────┼──────────────────┐
    ▼                  ▼                  ▼
    DynamoDB              S3              AI Services
    │                  │
    ▼                  ▼
    Evidence           Bedrock /
    Objects             Gemini

This could allow individual components to scale independently as the platform grows.
🏆 Project Objective
FraudLens AI is designed to demonstrate how modern AI, machine learning, computer vision, and cloud infrastructure can be combined into a practical investigation workflow.
The project focuses on the complete journey:
    **BUILD**
    ↓
    **ANALYZE**
    ↓
    **CORRELATE**
    ↓
    **INVESTIGATE**
    ↓
    **SHIP**

Rather than presenting only a machine-learning model, FraudLens AI brings together the surrounding engineering required to turn analytical models into a usable application. 🌐 Project Links ### Live Application [https://d21zw6n2b48e0s.cloudfront.net/](https://d21zw6n2b48e0s.cloudfront.net/) GitHub Repository [https://github.com/pathananas2007/fraudlens-ai](https://github.com/pathananas2007/fraudlens-ai) 👨‍💻 Built With React · TypeScript · Node.js · Express · Python · Scikit-learn · XGBoost · MongoDB · Gemini · Firebase · Docker · Amazon S3 · Amazon **ECR** · **AWS** Elastic Beanstalk · Amazon CloudFront <div align=*center*>

FraudLens AI Multimodal AI for Financial Evidence Forensics Detect → Analyze → Correlate → Investigate </div> ```
