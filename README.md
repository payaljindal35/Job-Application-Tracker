# CareerFlow – Job Application Tracker

A full-stack MERN application for tracking job applications across recruitment stages — from "Applied" to "Offer." Built to replace messy spreadsheets with a simple dashboard that shows exactly where every application stands.

## Features

- **Add applications** — log company, role, and current status
- **View all applications** — see every application in one table
- **Update status** — move an application through stages (Applied → OA → Interview → Rejected → Offer) with a single dropdown
- **Delete applications** — remove entries you no longer need to track
- **Dashboard counters** — live counts of applications per status, plus a running total

## Tech Stack

| Layer    | Technology                  |
|----------|------------------------------|
| Frontend | React, Vite, Bootstrap, Axios |
| Backend  | Node.js, Express.js          |
| Database | MongoDB (MongoDB Atlas), Mongoose |

## Project Structure

```
Job-Application-Tracker/
├── client/              # React frontend (Vite)
│   └── src/
│       ├── App.jsx      # Main UI: form, table, dashboard
│       └── main.jsx
├── server/              # Express backend
│   ├── models/
│   │   └── Job.js       # Mongoose schema
│   ├── routes/
│   │   └── jobs.js      # CRUD API routes
│   └── server.js        # App entry point
└── README.md
```

## API Endpoints

| Method | Endpoint          | Description                  |
|--------|-------------------|-------------------------------|
| GET    | `/api/jobs`        | Fetch all job applications    |
| POST   | `/api/jobs`        | Create a new job application  |
| PUT    | `/api/jobs/:id`     | Update an application (e.g. status) |
| DELETE | `/api/jobs/:id`     | Delete an application         |

## Getting Started

### Prerequisites
- Node.js (v18+)
- A MongoDB connection string (local MongoDB or MongoDB Atlas)

### 1. Clone the repo
```bash
git clone https://github.com/payaljindal35/Job-Application-Tracker.git
cd Job-Application-Tracker
```

### 2. Set up the backend
```bash
cd server
npm install
```

Create a `.env` file inside `server/`:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Start the server:
```bash
node server.js
```

### 3. Set up the frontend
```bash
cd client
npm install
npm run dev
```

The app will be available at `http://localhost:5173` (default Vite port), with the API running at `http://localhost:5000`.

## Future Improvements

- Filter/search applications by company or status
- Edit company/role fields, not just status
- Authentication so each user has their own tracker
- Deployment (e.g. Vercel for client, Render for server)

## Author

Built by [Payal Jindal](https://github.com/payaljindal35)
