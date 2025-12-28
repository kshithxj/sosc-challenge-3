🚀 Smart Complaint Management System with AI Categorization

SOSC Challenge 3 – Mini Project (2nd Year)

📌 Problem Statement

In colleges, hostels, and institutions, complaint handling is often manual, unorganized, and inefficient.
Students are unaware of complaint status, and administrators struggle to prioritize issues effectively.

This leads to:

Delayed resolutions

Poor transparency

No clear prioritization of urgent issues

💡 Solution Overview

Smart Complaint Management System is a modern web application that streamlines complaint submission and resolution using AI-powered categorization and prioritization.

The system allows:

Users to submit complaints easily

Automatic AI-based classification and priority assignment

Admins to manage, track, and resolve complaints efficiently

This solution improves transparency, efficiency, and response time.

✨ Key Features
👤 User Features

Secure authentication (Firebase Auth)

Submit complaints with title and description

View complaint status in real-time

Clean, responsive, modern UI

🛠️ Admin Features

Role-based admin dashboard

View all complaints in a structured table

Filter complaints by status and priority

Update complaint status (Pending / In Progress / Resolved)

Real-time complaint updates

🤖 AI Features (Bonus)

Automatic complaint categorization using Gemini API

AI assigns:

Category (Water, Electricity, Internet, Cleanliness, Other)

Priority (Low, Medium, High)

Reduces manual triage and improves response time

🧠 AI Logic (Gemini Integration)

The system uses Google Gemini API to analyze complaint text and determine:

Category based on issue type

Priority based on urgency, health, safety, and impact

AI decisions are guided by structured prompts and fallback logic for reliability.

🛠️ Tech Stack
Frontend

React (Vite)

Tailwind CSS

Modern component-based architecture

Backend / Cloud

Firebase Authentication

Firebase Firestore (Database)

Firebase Hosting (optional)

AI

Google Gemini API (NLP categorization)

☁️ Google Tools Used (Requirement Fulfilled)

✅ Firebase Authentication

✅ Firebase Firestore

✅ Google Gemini API

📂 Project Structure
src/
 ├── components/
 │   ├── auth/
 │   ├── user/
 │   ├── admin/
 │   └── common/
 ├── hooks/
 ├── services/
 ├── utils/
 ├── styles/
 ├── App.jsx
 └── main.jsx

⚙️ Setup Instructions
1️⃣ Clone Repository
git clone https://github.com/kshithxj/sosc-challenge-3.git
cd smart-complaint-system

2️⃣ Install Dependencies
npm install

3️⃣ Configure Environment Variables

Create a .env file:

VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_GEMINI_API_KEY=your_gemini_key

4️⃣ Run the Project
npm run dev

🧪 Sample Complaints (Demo Ready)

No water supply in hostel → Water | High

WiFi not working on 3rd floor → Internet | Medium

Broken staircase railing → Other | High

🔐 Security Considerations

Environment variables secured via .env

Role-based admin access

Firestore rules restrict unauthorized updates

🚀 Future Enhancements

Email / push notifications

Complaint image upload

Analytics dashboard

SLA-based resolution tracking

Admin AI override with reasoning

🎯 Why This Project Stands Out

Real-world problem

Clean architecture

AI-powered automation

Professional UI/UX

Scalable and extensible design

👤 Author

Kshithij
2nd Year CSE
SOSC Challenge 3 Submission
