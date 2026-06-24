# SpendWise

SpendWise is a MERN stack expense tracker where users can register, log in, add income/expense transactions, view analytics through charts, filter transactions, and export data to CSV or Excel.

## Features

- User registration and login
- JWT protected APIs
- Add, update, delete, and view transactions
- Monthly dashboard summary
- Category-wise expense analytics
- Income vs expense chart
- Payment mode analytics
- CSV export
- Excel export
- React dashboard with Recharts visualizations
- Tailwind CSS responsive UI

## Tech Stack

Frontend:
- React
- Vite
- Tailwind CSS
- Axios
- Recharts
- React Router DOM

Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- ExcelJS
- json2csv

## Folder Structure

```txt
SpendWise/
├── client/
├── server/
└── README.md
```

## Setup Instructions

### 1. Install dependencies

From the root folder:

```bash
npm install
npm run install-all
```

Or install separately:

```bash
cd server
npm install

cd ../client
npm install
```

### 2. Create server environment file

Create a file named `.env` inside the `server` folder.

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/spendwise
JWT_SECRET=replace_this_with_a_long_secret_key
CLIENT_URL=http://localhost:5173
```

Use MongoDB Atlas URI instead of local URI if you are using cloud MongoDB.

### 3. Run the backend

```bash
cd server
npm run dev
```

Backend runs on:

```txt
http://localhost:5000
```

### 4. Run the frontend

```bash
cd client
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

## Main API Routes

### Auth

```txt
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
```

### Transactions

```txt
POST   /api/transactions
GET    /api/transactions
GET    /api/transactions/:id
PUT    /api/transactions/:id
DELETE /api/transactions/:id
```

### Reports

```txt
GET /api/reports/monthly-summary
GET /api/reports/category-summary
GET /api/reports/income-vs-expense
GET /api/reports/payment-mode-summary
```

### Export

```txt
GET /api/export/csv
GET /api/export/excel
```

## Resume Description

**SpendWise - Full Stack Expense Tracker & Analytics Dashboard**  
Built a MERN-based finance tracking application with secure authentication, CRUD transaction management, MongoDB database integration, monthly expense summaries, interactive charts, and CSV/Excel export functionality.

## Resume Bullet Points

- Developed a full-stack expense tracker using React, Node.js, Express.js, and MongoDB.
- Implemented JWT-based authentication and user-specific transaction management.
- Created REST APIs for income/expense CRUD operations, monthly summaries, and category-wise analytics.
- Designed interactive dashboards using Recharts for pie, bar, line, and area chart visualizations.
- Added CSV and Excel export functionality for monthly financial reports.
