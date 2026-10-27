# Disha Study Library

A full-stack web application for **Disha Study Library**, a self-study space. It handles seat bookings, student inquiries, OTP verification and an admin dashboard for day-to-day library management.

## What This Project Does

**Students and visitors**
- Browse the library, its facilities, gallery and testimonials.
- Submit a seat booking request through an OTP-verified form.
- Send messages and leave feedback.

**Admin**
- Use a protected dashboard to manage seats, the waiting list, inquiries and ex-students.
- Manage their own account and password.

## Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| React 19 + Vite | UI framework and build tool |
| React Router DOM v7 | Client-side routing |
| Tailwind CSS v4 | Styling |
| Axios | API requests |
| Lucide React + React Icons | Icons |
| Cloudinary | Student photo uploads |

### Backend

| Technology | Purpose |
|------------|---------|
| Express v5 | REST API server |
| PostgreSQL + pg | Primary database |
| bcryptjs | Password hashing |
| jsonwebtoken | Admin JWT authentication |
| Brevo (`@getbrevo/brevo`) | Transactional emails (OTPs, alerts, notifications) |
| Zod | Request validation |
| dotenv | Environment configuration |

## Project Structure

### Backend

- `config` - URLs and developer settings
- `controllers` - request logic:
  - `admin` - auth, seats, waiting list, inquiries, dashboard, ex-students
  - `booking` - booking creation and retrieval
  - `feedback` - feedback handling
  - `message` - contact messages
  - `otp` - OTP send, verify and resend
- `Data` - static messages, error strings and seat configuration
- `db` - PostgreSQL connection
- `middlewares` - JWT authentication and global error handling
- `routes` - public and admin API routes
- `services` - reusable logic such as the email service
- `validation` - Zod schemas
- `index.js` - entry point

### Frontend

- `admin` - admin panel, organised by feature (pages, components, hooks, services, routes, layouts)
- `Components` - shared UI such as Navbar, Footer and CTA
- `Pages` - public pages
- `Services` - API layer
- `Hooks` - custom React hooks
- `config` - environment and API configuration
- `Data` - static content such as FAQ, testimonials and gallery
- `Styles` and `Animations` - shared styling and CSS animations
- `App.jsx` - main app with routing

## Admin Module

The admin panel lives at `/admin`. Login is protected by JWT with a second OTP verification step.

**Features**
- Dashboard with live stats (total, occupied and empty seats, waiting list and inquiries)
- Seat management: assign, edit, replace and remove
- Gender-based seat zones, checked on every assignment
- Waiting list management, including assigning a waiting student to a seat
- Inquiry management
- Ex-student records, created automatically when a seat is removed or replaced
- Profile and password management
- Forgot and reset password through email
- Suspicious-login reporting

**Feature modules** (`admin/components`): `exStudents`, `inquiries`, `profile`, `seats`, `waiting`

## Demo Access

To explore the admin panel without your own credentials:

| Field | Value |
|-------|-------|
| Email | `demo@disha.com` |
| Password | `DemoPassword@123` |
| OTP | `000000` |

> The OTP is fixed for the demo account, so no email is required.

## Getting Started

### Prerequisites

- Node.js v18 or higher
- A PostgreSQL database
- A Brevo account with an API key and a verified sender email
- A Cloudinary account for photo uploads

### 1. Clone the repository

```bash
git clone https://github.com/vaibhavchavhan45/disha-study-library.git
cd disha-study-library
```

### 2. Backend setup

```bash
cd Backend
npm install
```

Create `Backend/.env`:

```env
PORT=5000                                  # Server port (default 5000)
DATABASE_URL=your-db-url
JWT_SECRET=your-super-secret-jwt-key       # Secret used to sign JWTs
CLIENT_URL=http://localhost:5173           # Frontend URL
BREVO_API_KEY=your-brevo-api-key           # Used to send all emails
EMAIL_USER=your-verified-sender-email      # Sender address verified in Brevo
EMAIL_PASS=your-email-password             # Not used by the Brevo mailer
EMAIL_ADMIN_1=admin1@example.com           # Primary admin email
EMAIL_ADMIN_2=admin2@example.com           # Secondary admin email
DEV_EMAIL=dev@example.com                  # Developer notification email
DEMO_ADMIN_EMAIL=demo@disha.com            # Demo admin account
```

```bash
node index.js
```

> The server runs on `http://localhost:5000`.

### 3. Frontend setup

```bash
cd Frontend
npm install
```

Create `Frontend/.env`:

```env
VITE_API_URL=http://localhost:5000                       # Backend API base URL
VITE_CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=your-upload-preset         # Unsigned upload preset
```

```bash
npm run dev
```

> The app runs on `http://localhost:5173`.

## API Endpoints

Protected routes need the header `Authorization: Bearer <token>`.

### Public

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/otp/send` | Send an OTP to the user |
| POST | `/api/otp/verify` | Verify the OTP |
| POST | `/api/booking/submit` | Submit a seat booking request |
| POST | `/api/message` | Send a contact message |
| POST | `/api/feedback` | Submit feedback |

### Admin authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Admin login |
| POST | `/api/auth/verify-otp` | Verify the admin OTP |
| POST | `/api/auth/forgot-password` | Start a password reset |
| POST | `/api/auth/reset-password` | Reset the password |
| POST | `/api/auth/report-suspicious` | Report a suspicious login |
| POST | `/api/auth/change-password` | Change password (protected) |
| GET / PUT | `/api/auth/profile` | Get or update admin profile (protected) |

### Admin (JWT required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/seats` | Get all seats |
| PUT | `/api/seats/:id/assign` | Assign a seat to a student |
| PUT | `/api/seats/:id/edit` | Edit seat details |
| PUT | `/api/seats/:id/replace` | Replace the seat occupant |
| PUT | `/api/seats/:id/remove` | Remove the student from a seat |
| GET / POST | `/api/waiting` | Get the waiting list / add a waiting student |
| PUT | `/api/waiting/:id` | Edit a waiting student |
| PUT | `/api/waiting/:id/assign-seat` | Assign a waiting student to a seat |
| DELETE | `/api/waiting/:id` | Delete a waiting student |
| GET | `/api/inquiries` | Get all inquiries |
| GET | `/api/ex-students` | Get ex-students |
| GET | `/api/dashboard/stats` | Get dashboard stats |
| GET | `/api/booking/all` | Get all bookings |

## Public Pages

`/` Landing, `/about` About, `/facilities` Facilities, `/gallery` Gallery, `/testimonial` Testimonials, `/photo-request` Photo request, `/dev` Developer, `/privacy-policy` Privacy policy, `/terms-condition` Terms and conditions.

## What Broke and What We Improved

### Email delivery

Sending email reliably took three attempts.

| Attempt | What happened | Outcome |
|---------|---------------|---------|
| **EmailJS** (from the browser) | Did not work for our needs. Sending from the frontend is not suitable for OTPs and admin alerts. | Dropped |
| **Nodemailer with Gmail** | Not reliable. It needed an app password and IPv6 workarounds (`family: 6`), and delivery still failed on some networks. | Dropped |
| **Brevo transactional email API** | Works reliably over HTTPS with an API key and a verified sender. | **Current solution** |

**What improved**
- All emails go through one service, `Backend/services/mailer.js`, using the Brevo API.
- No Gmail app password and no network-specific IPv6 setting are needed.
- Admin notifications reach several recipients using BCC.
- The same service sends OTPs, booking, inquiry and feedback alerts, and security alerts.

### Security

- Student OTPs expire after 60 seconds and allow 3 wrong attempts.
- After 3 OTP requests from one IP, that IP is blocked for 24 hours.
- Admin login needs a password and an OTP, and returns a JWT.
- Passwords are hashed with bcrypt.
- Suspicious admin logins can be reported, which sends an alert email with the IP address.

### Data integrity

- Only empty seats can be assigned.
- Each seat belongs to a gender zone, and assignments are checked against it.
- Removing or replacing a student saves them to the ex-student records automatically.
- Request data is validated with Zod.

## Notes

- The maximum number of OTP attempts is set in `Backend/Data/maxAttempts.js`. The OTP expiry is set in the OTP repository files under `Backend/controllers`.
- All admin routes except login and password reset require a `Bearer <token>` header.