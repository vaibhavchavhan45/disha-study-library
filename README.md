# Disha Study Library

A full-stack web application for **Disha Study Library** — a self-study space management system that handles seat bookings, student inquiries, OTP verification, admin dashboard, and more.

---

## What This Project Does

Disha Study Library's website serves two audiences:

- **Students / Visitors** — Browse the library, view facilities, read testimonials, submit a seat booking inquiry via OTP-verified form, send messages, and leave feedback.
- **Admin** — A protected dashboard to manage seats, a waiting list, inquiries, ex-students, and admin account settings.

---

## Tech Stack

### Frontend
| Tech | Purpose |
|------|---------|
| React 19 + Vite | UI framework and build tool |
| React Router DOM v7 | Client-side routing |
| Tailwind CSS v4 | Utility-first styling |
| Lucide React + React Icons | Icon libraries |
| EmailJS | Contact email from the browser |


### Backend
| Tech | Purpose |
|------|---------|
| Express v5 | REST API server |
| PostgreSQL + pg | Primary database |
| bcryptjs | Password hashing |
| jsonwebtoken | Admin JWT auth |
| nodemailer | Transactional emails via Gmail |
| Zod | Request validation |
| dotenv | Environment config |

---

## Project Structure

The project is divided into two main parts: **Backend** and **Frontend**, each organized based on responsibility.

---

## Backend

The backend follows a modular architecture where each folder has a clearly defined role.

- **config** → Application-level configurations such as URLs and developer settings.

- **controllers**  
  Handles request logic:
  - `admin` → Authentication, seat management, waiting list, inquiries, dashboard, and ex-students  
  - `booking` → Booking creation and retrieval  
  - `feedback` → Feedback handling  
  - `message` → Contact messages  
  - `otp` → OTP send, verify, resend  

- **data** → Static messages, error strings, and seat configuration.

- **db** → PostgreSQL connection setup.

- **middlewares** → JWT authentication and global error handling.

- **routes** → API route definitions (public and admin).

- **services** → Reusable logic such as email handling.

- **validation** → Zod schemas for request validation.

- **index.js** → Application entry point.

---

## Frontend

The frontend is built with a component-based structure, separating public UI and admin functionality.

- **admin** → Admin panel (feature-based structure with pages, components, hooks, and services).

- **components** → Shared UI elements (Navbar, Footer, CTA, etc.).

- **pages** → Public-facing pages.

- **routes** → Application routing.

- **services** → API interaction layer.

- **hooks** → Custom React hooks.

- **layouts** → Shared layout wrappers.

- **config** → Environment variables and API configuration.

- **data** → Static content (FAQ, testimonials, gallery).

- **styles** → Shared styling.

- **animations** → CSS animations.

- **App.jsx** → Main app with routing.

- **index.html** → Root HTML file.

---

## Admin Module

The admin panel is accessible at `/admin`. It is protected by JWT authentication with a two-step OTP verification on login.

- **components**  
  Feature-specific UI modules:
  - `exStudents` → Manage ex-student records  
  - `inquiries` → Handle student inquiries  
  - `profile` → Admin account and profile management  
  - `seats` → Seat allocation and management  
  - `waiting` → Waiting list management  

- **pages** → Defines all admin views.

- **routes** → Handles admin navigation and protected routes.

- **services** → API communication layer.

- **hooks** → Reusable state and logic handling.

- **layouts** → Shared admin layout structure.


**Features:**
- Dashboard with live stats
- Seat management (assign, remove, replace, edit)
- Waiting list management
- Inquiry management
- Ex-student records
- Profile and password management
- Forgot / reset password via email link

---

## Getting Started

### Prerequisites

- Node.js v18+
- PostgreSQL database
- Gmail account (for nodemailer) with App Password enabled
- Cloudinary account (for photo uploads)

### 1. Clone the Repository

```bash
git clone https://github.com/vaibhavchavhan45/disha-study-library.git
cd disha-study-library
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend/` directory:

```env
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/disha_db
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-noidemailer-16-digit-key
EMAIL_ADMIN_1=admin1@gmail.com
EMAIL_ADMIN_2=admin2@gmail.com
DEV_EMAIL=dev@gmail.com
JWT_SECRET=your-super-secret-jwt-key
CLIENT_URL=http://localhost:5173
```

Start the backend server:

```bash
node index.js
```

> Server runs on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd Frontend
npm install
```

Create a `.env` file in the `Frontend/` directory:

```env
VITE_API_URL=http://localhost:5000
VITE_CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
```

Start the frontend dev server:

```bash
npm run dev
```

> App runs on `http://localhost:5173`

---

## API Endpoints

### Public APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/otp/send` | Send OTP to user |
| POST | `/api/otp/verify` | Verify OTP |
| POST | `/api/booking/submit` | Submit seat booking form |
| GET | `/api/booking/all` | Get all bookings |
| POST | `/api/message` | Send contact message |
| POST | `/api/feedback` | Submit feedback |

### Admin Auth APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Admin login |
| POST | `/api/auth/verify-otp` | Verify admin OTP |
| POST | `/api/auth/forgot-password` | Initiate password reset |
| POST | `/api/auth/reset-password` | Reset password via token |
| POST | `/api/auth/change-password` | Change password (protected) |
| GET | `/api/auth/profile` | Get admin profile (protected) |
| PUT | `/api/auth/profile` | Update admin profile (protected) |

### Admin (Protected — JWT Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/seats` | Get all seats |
| PUT | `/api/seats/:id/assign` | Assign seat to student |
| PUT | `/api/seats/:id/remove` | Remove student from seat |
| PUT | `/api/seats/:id/replace` | Replace seat occupant |
| PUT | `/api/seats/:id/edit` | Edit seat details |
| GET/POST | `/api/waiting` | Get / add waiting list students |
| PUT | `/api/waiting/:id` | Edit waiting student |
| DELETE | `/api/waiting/:id` | Delete waiting student |
| PUT | `/api/waiting/:id/assign` | Assign waiting student to a seat |
| GET | `/api/inquiries` | Get all inquiries |
| PUT | `/api/inquiries/:id/move` | Move inquiry to waiting list |
| GET | `/api/ex-students` | Get ex-students |
| GET | `/api/dashboard` | Get dashboard stats |

---

## Public Pages

| Route | Page |
|-------|------|
| `/` | Landing Page |
| `/about` | About the Library |
| `/facilities` | Facilities |
| `/gallery` | Photo Gallery |
| `/testimonial` | Testimonials |
| `/photo-request` | Photo Feature Request |
| `/dev` | Developer / Creator Page |
| `/privacy-policy` | Privacy Policy |
| `/terms-condition` | Terms & Conditions |

---

## Environment Variables Summary

### Backend `.env`

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 5000) |
| `DATABASE_URL` | PostgreSQL connection string |
| `EMAIL_USER` | Gmail address for sending emails |
| `EMAIL_PASS` | Nodemailer 16 digit key |
| `EMAIL_ADMIN_1` | Primary admin email |
| `EMAIL_ADMIN_2` | Secondary admin email |
| `DEV_EMAIL` | Developer notification email |
| `JWT_SECRET` | Secret key for JWT signing |
| `CLIENT_URL` | Frontend URL |

### Frontend `.env`

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API base URL |
| `VITE_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Cloudinary unsigned upload preset |

---

## Notes

- The mailer uses Gmail with **IPv6 forced** (`family: 6`). If emails aren't sending on your network, change it to `4` in `Backend/services/mailer.js`.
- All admin routes except login and password reset require a `Bearer <token>` header.
- OTP expiry and max attempts are configured in `Backend/Data/maxAttempts.js`.