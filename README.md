# FraudLens AI — Multimodal AI Fraud Investigation Platform

<div align="center">

> An AI-powered fraud investigation platform that combines document intelligence, computer vision, OCR, anomaly detection, transaction analysis, and AI-assisted investigation into a unified forensic workspace.

## 🔗 Live Demo

**Production Application**

<br>

[![Live Demo](https://img.shields.io/badge/LIVE%20DEMO-AWS%20CLOUDFRONT-orange?style=for-the-badge)](https://d21zw6n2b48e0s.cloudfront.net/)
[![AWS](https://img.shields.io/badge/AWS-DEPLOYED-orange?style=for-the-badge&logo=amazonaws&logoColor=white)](https://aws.amazon.com/)
[![CloudFront](https://img.shields.io/badge/CloudFront-HTTPS-orange?style=for-the-badge&logo=amazonaws&logoColor=white)](https://aws.amazon.com/cloudfront/)
[![S3](https://img.shields.io/badge/Amazon%20S3-STORAGE-orange?style=for-the-badge&logo=amazons3&logoColor=white)](https://aws.amazon.com/s3/)
[![ECR](https://img.shields.io/badge/Amazon%20ECR-CONTAINER%20REGISTRY-orange?style=for-the-badge&logo=amazonaws&logoColor=white)](https://aws.amazon.com/ecr/)
[![Elastic Beanstalk](https://img.shields.io/badge/Elastic%20Beanstalk-PRODUCTION-orange?style=for-the-badge&logo=amazonaws&logoColor=white)](https://aws.amazon.com/elasticbeanstalk/)
[![AWS SSM](https://img.shields.io/badge/AWS%20SSM-SECURE%20SECRETS-orange?style=for-the-badge&logo=amazonaws&logoColor=white)](https://aws.amazon.com/systems-manager/)
[![IAM](https://img.shields.io/badge/AWS%20IAM-ACCESS%20CONTROL-orange?style=for-the-badge&logo=amazonaws&logoColor=white)](https://aws.amazon.com/iam/)
[![EC2](https://img.shields.io/badge/Amazon%20EC2-COMPUTE-orange?style=for-the-badge&logo=amazonaws&logoColor=white)](https://aws.amazon.com/ec2/)
[![ACM](https://img.shields.io/badge/AWS%20ACM-TLS%20CERTIFICATE-orange?style=for-the-badge&logo=amazonaws&logoColor=white)](https://aws.amazon.com/certificate-manager/)

[![Docker](https://img.shields.io/badge/Docker-CONTAINERIZED-blue?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![React](https://img.shields.io/badge/React-FRONTEND-blue?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-BACKEND-green?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-ML%20%26%20AI-yellow?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-DATABASE-green?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Gemini](https://img.shields.io/badge/Gemini-AI%20ENGINE-blue?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-AUTH-orange?style=for-the-badge&logo=firebase&logoColor=white)](https://firebase.google.com/)

</div>
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

## 🧩 The Problem

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

## 💡 The Solution

FraudLens AI is a multimodal forensic evidence platform designed to support financial-fraud investigations.

Instead of treating every piece of evidence independently, the platform combines:

- Documents
- Images
- Transactions
- OCR
- Computer vision
- Anomaly detection
- AI investigation
- Cross-evidence analysis
- Investigation insights

The goal is to help investigators move from raw evidence to structured findings more efficiently.

### Multimodal Evidence Analysis

FraudLens AI allows investigators to analyze multiple evidence types within the same investigation.

Supported workflows include:

- Document analysis
- Image analysis
- OCR extraction
- Transaction analysis
- Visual forensic analysis
- Cross-evidence comparison
- AI-assisted investigation

---

## 🔬 Forensic Image Analysis

The forensic analysis pipeline provides visual-analysis techniques, including:

- Hash consistency
- Perceptual analysis
- Edge analysis
- Contrast analysis
- Visual anomaly detection
- Tamper indicators

The techniques help identify suspicious visual inconsistencies within submitted evidence.

---

## 🔎 OCR & Evidence Extraction

OCR processing extracts information from uploaded evidence and makes it available for downstream investigation.

Extracted information can be compared against:

- Transaction records
- Claimed invoice values
- Merchant information
- Other evidence
- Investigator findings

This allows investigators to identify potential discrepancies across different evidence sources.

---

## 🔗 Cross-Evidence Analysis

Fraud investigations become more useful when evidence is compared rather than analyzed in isolation.

FraudLens AI provides cross-evidence analysis to identify relationships such as:

- Invoice amount vs. transaction amount
- Merchant information vs. transaction records
- Document information vs. extracted OCR data
- Evidence metadata vs. investigation context
- Multiple pieces of evidence supporting the same investigation

Example workflow:

```text
Terminal Record
       │
       ▼
Transaction Data
       │
       ▼
Cross-Evidence Analysis
       ▲
       │
Invoice / Document
       │
       ▼
OCR Extraction
```

---

## 🤖 AI Investigator

FraudLens AI includes an AI investigator assistant designed to help investigators interpret evidence and investigation findings.

The assistant can support workflows such as:

- Explaining visual inconsistencies
- Analyzing merchant and amount divergence
- Recommending immediate fraud-mitigation steps
- Drafting investigation summaries
- Connecting findings across evidence
- Supporting investigator decision-making

The AI layer uses Google Gemini for investigation-oriented analysis.

---

## 🧠 Machine Learning

The project preserves traditional machine-learning approaches as historical baselines while incorporating production-oriented anomaly detection.

### Historical Baselines

- Decision Tree
- Support Vector Machine (SVM)

### Production-Oriented Models

- XGBoost
- Isolation Forest

Isolation Forest is used for unsupervised anomaly detection where suspicious transaction patterns can be identified without requiring every example to be explicitly labelled.

---

## 🏗️ Architecture

FraudLens AI uses a unified application architecture with a React/Vite frontend and Node.js/Express backend.

```text
                         ┌──────────────────────────┐
                         │          User            │
                         └────────────┬─────────────┘
                                      │
                                      ▼
                         ┌──────────────────────────┐
                         │     Amazon CloudFront     │
                         │          HTTPS            │
                         └────────────┬─────────────┘
                                      │
                                      ▼
                  ┌──────────────────────────────────────┐
                  │       Elastic Beanstalk               │
                  │       Single Docker Instance          │
                  │                                      │
                  │   ┌──────────────────────────────┐   │
                  │   │     Node.js / Express        │   │
                  │   │                              │   │
                  │   │ React/Vite Frontend          │   │
                  │   │ REST API                     │   │
                  │   │ Investigation Engine         │   │
                  │   │ OCR Processing                │   │
                  │   │ Evidence Analysis             │   │
                  │   └──────────────┬───────────────┘   │
                  └──────────────────┼───────────────────┘
                                     │
                    ┌────────────────┼────────────────┐
                    │                │                │
                    ▼                ▼                ▼
             MongoDB Atlas       Gemini API       AWS SSM
             Database            AI Analysis       Secrets
```

---

## ☁️ AWS Infrastructure

The production deployment uses AWS services including:

- Amazon CloudFront
- Amazon S3
- Amazon Elastic Beanstalk
- Amazon EC2
- Amazon ECR
- AWS Systems Manager Parameter Store
- AWS IAM

### Amazon CloudFront

CloudFront provides the public HTTPS endpoint for the application.

**Live URL:**

https://d21zw6n2b48e0s.cloudfront.net

### Amazon S3

Amazon S3 is used as part of the deployment workflow for application artifacts and Elastic Beanstalk application versions.

### Amazon ECR

Amazon Elastic Container Registry stores the Docker container image used by the production deployment.

### Elastic Beanstalk

Elastic Beanstalk runs the production Docker application on a single EC2 instance.

### AWS Systems Manager Parameter Store

Sensitive runtime configuration is stored as encrypted SSM parameters.

Stored parameters include:

- `GEMINI_API_KEY`
- `MONGODB_URI`
- `JWT_SECRET`

Secrets are not committed to the Git repository.

### IAM

IAM roles provide the AWS permissions required for the deployment infrastructure, including access to:

- Amazon ECR
- AWS Systems Manager Parameter Store
- Elastic Beanstalk
- EC2

---

## 🗄️ Database

FraudLens AI uses **MongoDB Atlas** as the primary database.

The application stores investigation-related information such as:

- Investigations
- Evidence
- Transactions
- Analysis results
- Investigation history

---

## 🔐 Authentication

The application uses **Firebase Authentication** for user authentication.

Supported authentication flows include:

- Google authentication
- Email/password authentication
- Demo investigator access

The production application requires the deployed CloudFront domain to be configured as an authorized Firebase authentication domain.

---

## 🛡️ Security

Security considerations implemented in the deployment include:

- Secrets stored outside source code
- SSM SecureString parameters
- IAM-based AWS permissions
- Docker-based deployment
- HTTPS through CloudFront
- Firebase authentication
- Environment-based configuration
- `.env` files excluded from version control

---

## 🧰 Technology Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS

### Backend

- Node.js
- Express
- TypeScript

### AI / ML

- Google Gemini
- XGBoost
- Isolation Forest
- Decision Tree
- SVM
- Computer Vision
- OCR

### Database

- MongoDB Atlas

### Authentication

- Firebase Authentication

### Cloud / DevOps

- AWS CloudFront
- AWS S3
- AWS Elastic Beanstalk
- Amazon EC2
- Amazon ECR
- AWS IAM
- AWS Systems Manager Parameter Store
- Docker

---

## 📁 Project Structure

```text
fraudlens-ai/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── lib/
│   └── ...
│
├── backend/
│   ├── models/
│   ├── notebooks/
│   └── ...
│
├── public/
│
├── server.ts
├── Dockerfile
├── docker-compose.yml
├── package.json
├── vite.config.ts
├── tsconfig.json
├── .gitignore
└── README.md
```

---

## 🚀 Deployment

The production deployment follows this workflow:

```text
Development
     │
     ▼
React + Node.js Application
     │
     ▼
Docker Image
     │
     ▼
Amazon ECR
     │
     ▼
Elastic Beanstalk
     │
     ▼
EC2 Instance
     │
     ▼
Amazon CloudFront
     │
     ▼
Public HTTPS Application
```

---

## 🤖 AI-Assisted Development

FraudLens AI was developed using an AI-assisted engineering workflow.

The project used **Kiro** as a coding agent together with AWS tooling to assist with:

- Architecture planning
- Code implementation
- Debugging
- AWS configuration
- Docker deployment
- Infrastructure setup
- Deployment troubleshooting
- Production verification

The development process included iterative debugging and deployment validation rather than only local development.

---

## 🧪 Production Verification

The deployed application was verified through the complete production path:

```text
Browser
   ↓
CloudFront
   ↓
Elastic Beanstalk
   ↓
Node.js / Express
   ↓
MongoDB Atlas
   ↓
Gemini API
```

The production health endpoint reported:

- API: ONLINE
- MongoDB: CONNECTED
- Gemini AI: ONLINE
- Forensics Analyzer: ONLINE
- CV Engine: READY
- OCR Service: CONNECTED

---

## 📌 Project Status

### Production Deployment — Live on AWS

FraudLens AI is publicly accessible through Amazon CloudFront and uses AWS infrastructure for its production deployment.

**Live Application:**

https://d21zw6n2b48e0s.cloudfront.net

---

## 🎯 Project Goal

The goal of FraudLens AI is to help investigators move from raw evidence to structured findings more efficiently.

The platform combines multimodal evidence processing, forensic analysis, anomaly detection, cross-evidence comparison, and AI-assisted investigation into a unified workflow.

---

## 📄 License

This project is provided for educational, research, and demonstration purposes.
