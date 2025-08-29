# Admin OTP System

A React application with admin authentication using OTP verification and a public user panel.

## Features

### Admin Features
- **Signup with OTP**: Admins can register with email verification
- **Login with OTP**: Secure login process with email OTP
- **Dashboard**: Add, edit, and delete time/number records
- **Data Management**: Full CRUD operations for data records

### User Features
- **Public Access**: No login required to view data
- **Real-time Data**: View all time and number records
- **Responsive Design**: Works on all devices

## Tech Stack

### Frontend
- React 18
- React Router DOM
- React Hook Form
- Framer Motion (animations)
- Axios (API calls)
- React Toastify (notifications)

### Backend
- Node.js with Express
- JWT Authentication
- Nodemailer (email service)
- bcryptjs (password hashing)
- In-memory storage (for demo)

## Setup Instructions

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend && npm install
```

### 2. Configure Email Service

Edit `backend/.env` file:

```env
# For Gmail (recommended for testing)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# For Mailtrap (development)
# EMAIL_HOST=smtp.mailtrap.io
# EMAIL_PORT=2525
# EMAIL_USER=your-mailtrap-username
# EMAIL_PASS=your-mailtrap-password
```

**Note**: For Gmail, you need to use an "App Password" instead of your regular password.

### 3. Start the Application

```bash
# Start backend server (Terminal 1)
cd backend && npm run dev

# Start frontend (Terminal 2)
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Usage

### For Admins
1. Go to `/admin/signup` to create an account
2. Check your email for the OTP code
3. Verify your account with the OTP
4. Login at `/admin/login`
5. Enter login OTP sent to your email
6. Access the dashboard to manage data

### For Users
1. Visit the homepage `/`
2. View all data records without any authentication
3. Data updates in real-time

## API Endpoints

### Admin Authentication
- `POST /api/admin/signup` - Admin registration
- `POST /api/admin/verify-otp` - Verify signup OTP
- `POST /api/admin/login` - Admin login
- `POST /api/admin/verify-login-otp` - Verify login OTP

### Data Management
- `GET /api/data` - Get all data (public)
- `POST /api/data` - Create data (admin only)
- `PUT /api/data/:id` - Update data (admin only)
- `DELETE /api/data/:id` - Delete data (admin only)

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- OTP-based email verification
- Protected admin routes
- Input validation
- CORS configuration

## Development Notes

- The backend uses in-memory storage for demo purposes
- In production, replace with a proper database (MongoDB, PostgreSQL, etc.)
- Configure proper email service credentials
- Update JWT secret in production
- Add rate limiting and other security measures