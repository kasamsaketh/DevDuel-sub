One Stop Personalized Career and Education Advisor

A web-based decision-support system designed to assist students in identifying suitable career paths, educational options, and academic timelines through structured assessments and guided exploration.

📌 Problem Statement

Students often face difficulty navigating post-secondary education and career decisions due to fragmented information about streams, degrees, colleges, exams, and long-term outcomes. This platform aims to consolidate these elements into a single, structured advisory system.

🧭 System Workflow

User Access

Users access the platform via demo authentication.

Aptitude Assessment

A short, structured quiz captures user priorities and preferences.

This assessment acts as the input for personalization.

Advisor Unlock

Upon completion of the assessment, personalized guidance modules are unlocked.

Guided Exploration

Users explore career paths, colleges, timelines, and resources based on their profile.

🔍 Core Features
Career Assessment Module

Structured aptitude questions focused on post-Class 12 priorities.

Forms the basis for personalized recommendations.

Career Path Explorer

Visual mapping of streams, degrees, and specializations.

Includes ROI insights, salary ranges, and growth trajectories.

One-Stop Advisor Dashboard

Centralized view of personalized guidance across multiple dimensions.

Designed for comparative analysis and informed decision-making.

College Directory

Government and recognized institutions listing.

Filterable by district, course, and proximity.

Timeline Tracker

Academic-year–specific tracking of exams, admissions, and scholarships.

Supports structured planning and milestone awareness.

Resource Repository

Curated portals for scholarships, entrance exams, and learning resources.

Personalized and bookmark-enabled views.

🛠 Technology Stack

Frontend: Next.js, React, TypeScript

UI Framework: Tailwind CSS, ShadCN

Authentication: Firebase (Anonymous Authentication – demo mode)

Database: Firebase Firestore

🔐 Authentication Note

For evaluation purposes, the platform uses Firebase Anonymous Authentication to allow unrestricted access without credential setup.
This approach maintains architectural correctness while minimizing evaluation friction.

⚙️ Environment Setup & Execution
Prerequisites

Node.js (v18 or higher)

npm

Steps
git clone https://github.com/<username>/<repo-name>.git
cd <repo-name>
npm install
npm run dev


Application runs at:

http://localhost:9002

🧪 Build Verification
npm run build
