# 🩺 AI Doctor Appointment & Health Summary System

A full-stack web application that allows patients to book appointments with doctors and helps doctors generate AI-powered health summaries from consultation notes.

## Features

- User authentication with JWT
- Doctor and Patient dashboards
- Doctor & Patient profile management
- Book and manage appointments
- Appointment details page
- Doctor consultation notes
- AI-generated health summaries using Gemini API
- Responsive UI

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT Authentication
- bcrypt

### AI Service
- Flask
- Google Gemini API

## Project Structure

```
client/       # React Frontend
server/       # Express Backend
ai-service/   # Flask AI Service
```

## Installation

### Clone the repository

```bash
git clone https://github.com/thesurajcode/ai-doctor-appointment-health-summary-system.git
```

### Install dependencies

```bash
cd client
npm install

cd ../server
npm install

cd ../ai-service
pip install -r requirements.txt
```

### Start the project

Frontend

```bash
cd client
npm run dev
```

Backend

```bash
cd server
npm run dev
```

AI Service

```bash
cd ai-service
python app.py
```

## Environment Variables

Create the required `.env` files for the frontend, backend, and AI service before running the project.

## Future Improvements

- Forgot Password
- Doctor availability scheduling
- Email notifications
- File upload for medical reports
- Video consultation

## Author

**Suraj Kumar**

GitHub: https://github.com/thesurajcode
