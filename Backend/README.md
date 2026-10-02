# NavGati Backend API

> Backend API documentation for **NavGati**, an AI-powered ride-booking platform built with Node.js and Express.

NavGati provides separate authentication and booking workflows for **Users** and **Drivers**, along with **Google OAuth authentication** for Users and an AI-powered ride request analysis endpoint.

---

## Table of Contents

* [Overview](#overview)
* [Tech Stack](#tech-stack)
* [Base URLs](#base-urls)
* [API Architecture](#api-architecture)
* [Authentication](#authentication)
* [User APIs](#user-apis)
* [Google OAuth Authentication](#google-oauth-authentication)
* [AI Ride Request API](#ai-ride-request-api)
* [Driver APIs](#driver-apis)
* [Complete Ride Flow](#complete-ride-flow)
* [HTTP Status Codes](#http-status-codes)
* [CORS Configuration](#cors-configuration)
* [Project Structure](#project-structure)
* [Running the Backend](#running-the-backend)
* [Frontend Integration](#frontend-integration)
* [API Design Principles](#api-design-principles)
* [Important Notes](#important-notes)
* [API Summary](#api-summary)

---

## Overview

NavGati is structured around five main API modules:

| Module          | Base Route             | Purpose                                                                     |
| --------------- | ---------------------- | --------------------------------------------------------------------------- |
| Authentication  | `/api/auth`            | User and Driver registration, login, logout, session APIs, and Google OAuth |
| Ride Requests   | `/api/ride-requests`   | AI-powered ride request analysis and recommendations                        |
| User Bookings   | `/api/bookings`        | Create, view, inspect, and cancel User bookings                             |
| Driver Bookings | `/api/driver/bookings` | Driver ride management, availability, and earnings                          |

The Express application enables JSON parsing, cookie parsing, and credentialed CORS for the frontend.

---

## Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Cookie-based authentication
* Google OAuth 2.0
* CORS
* REST API architecture

### API Features

* Separate User and Driver authentication
* Google OAuth authentication for Users
* Protected User routes
* Protected Driver routes
* AI ride request analysis
* Ride booking creation
* Booking cancellation
* Driver ride acceptance/rejection
* Ride completion
* Driver availability management
* Driver earnings
* Current and pending ride management

---

## Base URLs

### Local Development

```text
http://localhost:<PORT>
```

Replace `<PORT>` with the port configured by the server entry point.

### API Prefixes

```text
/api/auth
/api/ride-requests
/api/bookings
/api/driver/bookings
```

---

# API Architecture

The main Express application mounts the route modules as follows:

```text
/api/auth              → Authentication routes
/api/ride-requests     → AI ride request routes
/api/bookings          → User booking routes
/api/driver/bookings   → Driver booking routes
```

The application also enables:

```js
express.json()
cookieParser()
cors({
    origin: "http://localhost:3000",
    credentials: true
})
```

The frontend is currently configured for:

```text
http://localhost:3000
```

with credentials and cookies enabled.

---

# Authentication

NavGati maintains separate authentication middleware for Users and Drivers.

### User Authentication Middleware

Protected User endpoints use:

```text
userMiddleware
```

### Driver Authentication Middleware

Protected Driver endpoints use:

```text
driverMiddleware
```

### Authentication Methods

Users can authenticate using:

1. Email/password authentication
2. Google OAuth authentication

Drivers currently use the standard Driver authentication workflow because Driver registration requires additional vehicle and verification information.

---

# User APIs

Base URL:

```text
/api/auth
```

## 1. Register User

Creates a new User account.

```http
POST /api/auth/registerUser
```

### Authentication

```text
Public
```

### Controller

```text
registerUser
```

---

## 2. Login User

Authenticates a User using the standard login flow.

```http
POST /api/auth/loginUser
```

### Authentication

```text
Public
```

### Controller

```text
loginUser
```

---

## 3. Logout User

Logs out the authenticated User.

```http
GET /api/auth/logoutUser
```

### Authentication

```text
Required
```

### Middleware

```text
userMiddleware
```

### Controller

```text
logoutUser
```

---

## 4. Get Current User

Returns the authenticated User information.

```http
GET /api/auth/getmeUser
```

### Authentication

```text
Required
```

### Middleware

```text
userMiddleware
```

### Controller

```text
getMeUser
```

---

# Google OAuth Authentication

NavGati supports **Google OAuth 2.0 authentication for Users**.

Google OAuth allows an existing or new User to authenticate through their Google account without using the regular email/password login form.

The Google OAuth flow is handled by the backend and uses Google's OAuth 2.0 authorization server.

---

## 5. Start Google Login

Redirects the User to Google's authentication and consent screen.

```http
GET /api/auth/google
```

### Authentication

```text
Public
```

### Purpose

This endpoint starts the Google OAuth authentication flow.

The frontend redirects the User to:

```text
http://localhost:<PORT>/api/auth/google
```

The backend then redirects the User to Google's OAuth consent screen.

### Controller

```text
googleAuth
```

---

## 6. Google OAuth Callback

Google redirects the User back to the backend after authentication.

```http
GET /api/auth/google/callback
```

### Authentication

```text
Public
```

### Purpose

This endpoint receives the authorization response from Google.

The backend:

1. Receives the Google OAuth authorization code.
2. Exchanges the authorization code for Google authentication tokens.
3. Retrieves the authenticated Google User information.
4. Finds the corresponding User account.
5. Creates the User account if required by the authentication flow.
6. Authenticates the User.
7. Creates the application's authentication session/cookie.
8. Redirects the User back to the frontend.

### Environment Variables

Google OAuth requires the following environment variables:

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=
```

### Callback URL

For local development, the configured callback URL follows the backend OAuth route:

```text
http://localhost:<PORT>/api/auth/google/callback
```

The exact value should match the callback URL configured in the Google Cloud OAuth credentials.

---

## Google OAuth Flow

```text
┌──────────────────────┐
│        User          │
│   Clicks Google      │
│       Login          │
└──────────┬───────────┘
           │
           ▼
┌─────────────────────────────┐
│ GET /api/auth/google        │
│ Start OAuth Flow            │
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│       Google OAuth          │
│ Authentication & Consent    │
└────────────┬────────────────┘
             │
             ▼
┌────────────────────────────────┐
│ GET /api/auth/google/callback  │
│ OAuth Callback                 │
└────────────┬───────────────────┘
             │
             ▼
┌─────────────────────────────┐
│ Backend Authenticates User  │
│ and Creates Session/Cookie  │
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│ Redirect to Frontend        │
│ http://localhost:3000       │
└─────────────────────────────┘
```

---

# Driver Authentication APIs

Base URL:

```text
/api/auth
```

## 7. Register Driver

Creates a new Driver account.

```http
POST /api/auth/registerDriver
```

### Authentication

```text
Public
```

### Controller

```text
registerDriver
```

---

## 8. Login Driver

Authenticates a Driver.

```http
POST /api/auth/loginDriver
```

### Authentication

```text
Public
```

### Controller

```text
loginDriver
```

---

## 9. Logout Driver

Logs out the authenticated Driver.

```http
GET /api/auth/logoutDriver
```

### Authentication

```text
Required
```

### Middleware

```text
driverMiddleware
```

### Controller

```text
logoutDriver
```

---

## 10. Get Current Driver

Returns the authenticated Driver information.

```http
GET /api/auth/getmeDriver
```

### Authentication

```text
Required
```

### Middleware

```text
driverMiddleware
```

### Controller

```text
getMeDriver
```

---

# AI Ride Request API

Base URL:

```text
/api/ride-requests
```

## 11. Analyze Ride Request

Processes a ride request through the AI-powered ride analysis controller.

```http
POST /api/ride-requests/analyze
```

### Authentication

```text
Required
```

### Middleware

```text
userMiddleware
```

### Controller

```text
analyzeAndRecommendRide
```

### Purpose

This endpoint is the entry point for NavGati's AI-powered ride request analysis and recommendation flow.

The AI analyzes the User's natural-language ride request and processes the required ride information for the recommendation and booking workflow.

---

# User Booking APIs

Base URL:

```text
/api/bookings
```

All routes in this section require:

```text
userMiddleware
```

---

## 12. Create Ride Booking

Creates a booking for a ride.

```http
POST /api/bookings/rideBooking
```

### Authentication

```text
Required
```

### Middleware

```text
userMiddleware
```

### Controller

```text
createBooking
```

---

## 13. Get User Bookings

Returns bookings associated with the authenticated User.

```http
GET /api/bookings/myBookings
```

### Authentication

```text
Required
```

### Middleware

```text
userMiddleware
```

### Controller

```text
getUserBookings
```

---

## 14. Get Booking By ID

Returns a specific booking.

```http
GET /api/bookings/:bookingId
```

### Authentication

```text
Required
```

### Middleware

```text
userMiddleware
```

### Path Parameter

| Parameter   | Description       |
| ----------- | ----------------- |
| `bookingId` | ID of the booking |

### Controller

```text
getBookingById
```

---

## 15. Cancel User Booking

Allows an authenticated User to cancel a booking.

```http
POST /api/bookings/cancel/:bookingId
```

### Authentication

```text
Required
```

### Middleware

```text
userMiddleware
```

### Path Parameter

| Parameter   | Description                 |
| ----------- | --------------------------- |
| `bookingId` | ID of the booking to cancel |

### Controller

```text
cancelBooking
```

---

# Driver APIs

Base URL:

```text
/api/driver/bookings
```

Every route under this router automatically passes through:

```text
driverMiddleware
```

Therefore, all Driver booking endpoints require Driver authentication.

---

## 16. Get Pending Rides

Returns pending ride requests available to the authenticated Driver.

```http
GET /api/driver/bookings/pending
```

### Controller

```text
getPendingBookings
```

---

## 17. Get Current Booking

Returns the Driver's current booking.

```http
GET /api/driver/bookings/current
```

### Controller

```text
getCurrentBooking
```

---

## 18. Accept Ride

Allows the Driver to accept a booking.

```http
PATCH /api/driver/bookings/:bookingId/accept
```

### Path Parameter

| Parameter   | Description       |
| ----------- | ----------------- |
| `bookingId` | ID of the booking |

### Controller

```text
acceptBooking
```

---

## 19. Complete Ride

Marks a Driver's ride as completed.

```http
PATCH /api/driver/bookings/:bookingId/complete
```

### Path Parameter

| Parameter   | Description       |
| ----------- | ----------------- |
| `bookingId` | ID of the booking |

### Controller

```text
completeBooking
```

---

## 20. Reject Ride

Allows a Driver to reject a booking.

```http
PATCH /api/driver/bookings/:bookingId/reject
```

### Path Parameter

| Parameter   | Description       |
| ----------- | ----------------- |
| `bookingId` | ID of the booking |

### Controller

```text
rejectBooking
```

---

## 21. Cancel Driver Ride

Allows a Driver to cancel a booking.

```http
PATCH /api/driver/bookings/:bookingId/cancel
```

### Path Parameter

| Parameter   | Description       |
| ----------- | ----------------- |
| `bookingId` | ID of the booking |

### Controller

```text
cancelBooking
```

---

## 22. Update Driver Availability

Updates the Driver's online/offline availability status.

```http
PATCH /api/driver/bookings/availability
```

### Controller

```text
updateDriverAvailability
```

---

## 23. Get Driver Earnings

Returns Driver earnings information.

```http
GET /api/driver/bookings/driver-earnings
```

### Controller

```text
getDriverEarnings
```

---

# Complete Ride Flow

The available routes support the following high-level workflow:

```text
┌──────────────────────────┐
│       User Signup        │
│ POST /registerUser       │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│        User Login        │
│ POST /loginUser          │
└────────────┬─────────────┘
             │
             │
             ├─────────────────────────────┐
             │                             │
             ▼                             ▼
┌──────────────────────────┐    ┌──────────────────────────┐
│   Google OAuth Login    │    │    Standard Login        │
│ GET /auth/google        │    │ POST /loginUser          │
└────────────┬─────────────┘    └────────────┬─────────────┘
             │                               │
             └──────────────┬────────────────┘
                            │
                            ▼
┌────────────────────────────────────┐
│ AI Ride Request Analysis           │
│ POST /ride-requests/analyze        │
└────────────────┬───────────────────┘
                 │
                 ▼
┌────────────────────────────────────┐
│ Create Booking                     │
│ POST /bookings/rideBooking         │
└────────────────┬───────────────────┘
                 │
                 ▼
┌────────────────────────────────────┐
│ Driver Checks Pending Rides        │
│ GET /driver/bookings/pending       │
└────────────────┬───────────────────┘
                 │
          ┌──────┴──────┐
          │             │
          ▼             ▼
       Accept         Reject
          │             │
          ▼             ▼
 PATCH /:id/accept  PATCH /:id/reject
          │
          ▼
┌────────────────────────────────────┐
│ Current Booking                    │
│ GET /driver/bookings/current       │
└────────────────┬───────────────────┘
                 │
                 ▼
┌────────────────────────────────────┐
│ Complete Ride                      │
│ PATCH /:bookingId/complete         │
└────────────────┬───────────────────┘
                 │
                 ▼
          Ride Completed
```

A booking can also be cancelled through the User or Driver cancellation endpoint depending on the actor and application state.

---

# Endpoint Reference

## Authentication

| Method | Endpoint                    | Auth   | Purpose                      |
| ------ | --------------------------- | ------ | ---------------------------- |
| POST   | `/api/auth/registerUser`    | Public | Register User                |
| POST   | `/api/auth/loginUser`       | Public | Login User                   |
| GET    | `/api/auth/logoutUser`      | User   | Logout User                  |
| GET    | `/api/auth/getmeUser`       | User   | Get current User             |
| GET    | `/api/auth/google`          | Public | Start Google OAuth           |
| GET    | `/api/auth/google/callback` | Public | Handle Google OAuth callback |
| POST   | `/api/auth/registerDriver`  | Public | Register Driver              |
| POST   | `/api/auth/loginDriver`     | Public | Login Driver                 |
| GET    | `/api/auth/logoutDriver`    | Driver | Logout Driver                |
| GET    | `/api/auth/getmeDriver`     | Driver | Get current Driver           |

## Ride Requests

| Method | Endpoint                     | Auth | Purpose                    |
| ------ | ---------------------------- | ---- | -------------------------- |
| POST   | `/api/ride-requests/analyze` | User | Analyze and recommend ride |

## User Bookings

| Method | Endpoint                          | Auth | Purpose             |
| ------ | --------------------------------- | ---- | ------------------- |
| POST   | `/api/bookings/rideBooking`       | User | Create booking      |
| GET    | `/api/bookings/myBookings`        | User | Get user's bookings |
| GET    | `/api/bookings/:bookingId`        | User | Get booking         |
| POST   | `/api/bookings/cancel/:bookingId` | User | Cancel booking      |

## Driver Bookings

| Method | Endpoint                                   | Auth   | Purpose             |
| ------ | ------------------------------------------ | ------ | ------------------- |
| GET    | `/api/driver/bookings/pending`             | Driver | Get pending rides   |
| GET    | `/api/driver/bookings/current`             | Driver | Get current booking |
| PATCH  | `/api/driver/bookings/:bookingId/accept`   | Driver | Accept ride         |
| PATCH  | `/api/driver/bookings/:bookingId/complete` | Driver | Complete ride       |
| PATCH  | `/api/driver/bookings/:bookingId/reject`   | Driver | Reject ride         |
| PATCH  | `/api/driver/bookings/:bookingId/cancel`   | Driver | Cancel ride         |
| PATCH  | `/api/driver/bookings/availability`        | Driver | Update availability |
| GET    | `/api/driver/bookings/driver-earnings`     | Driver | Get earnings        |

---

# Authentication & Cookies

The application enables `cookie-parser`:

```js
app.use(cookieParser());
```

and credentialed CORS:

```js
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
```

Protected routes use User and Driver middleware, so the frontend preserves authentication cookies when making authenticated API requests.

### Axios Configuration

```js
axios.defaults.withCredentials = true;
```

or:

```js
axios.get("/api/auth/getmeUser", {
    withCredentials: true
});
```

For Google OAuth, the browser is redirected to the backend OAuth endpoint and the backend handles the OAuth callback and authentication session.

---

# CORS Configuration

Current backend configuration:

```js
cors({
    origin: "http://localhost:3000",
    credentials: true
});
```

Therefore, the current frontend origin is:

```text
http://localhost:3000
```

---

# Project Structure

```text
src/
├── Controllers/
│   ├── user.controller.js
│   ├── driver.controller.js
│   ├── ride.controller.js
│   ├── booking.controller.js
│   └── driverBooking.controller.js
│
├── Middlewares/
│   ├── userMiddleware.js
│   └── driverMiddleware.js
│
├── Routes/
│   ├── auth.routes.js
│   ├── ride.routes.js
│   ├── booking.routes.js
│   └── driverBooking.routes.js
│
├── Services/
│   └── ...
│
└── app.js
```

---

# Running the Backend

The supplied `app.js` creates and exports the Express application.

A typical server entry point can import it:

```js
const app = require("./src/app");

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

or:

```bash
npm start
```

Use the command configured in `package.json`.

---

# Frontend Integration

Example Axios client:

```js
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
});

export default api;
```

### User Login

```js
await api.post("/api/auth/loginUser", {
    // login fields
});
```

### Google Login

Google authentication is initiated by redirecting the User to:

```text
http://localhost:5000/api/auth/google
```

Example frontend function:

```js
const UserGoogleLogin = () => {
    window.location.href = `${backendURL}/api/auth/google`;
};
```

### Get Current User

```js
await api.get("/api/auth/getmeUser");
```

### AI Ride Request

```js
await api.post("/api/ride-requests/analyze", {
    // ride request data
});
```

### Create Booking

```js
await api.post("/api/bookings/rideBooking", {
    // booking data
});
```

### Driver Pending Rides

```js
await api.get("/api/driver/bookings/pending");
```

### Accept Ride

```js
await api.patch(`/api/driver/bookings/${bookingId}/accept`);
```

---

# API Design Principles

The backend separates responsibilities into distinct route groups.

### Authentication

```text
/api/auth
```

Handles:

* User authentication
* Driver authentication
* Google OAuth authentication
* User sessions
* Driver sessions

### AI Ride Intelligence

```text
/api/ride-requests
```

Handles AI-based ride request processing.

### User Booking Management

```text
/api/bookings
```

Handles booking operations from the User side.

### Driver Ride Management

```text
/api/driver/bookings
```

Handles the Driver-side lifecycle of rides.

This separation keeps User and Driver workflows isolated and makes the API easier to maintain and extend.

---

# Important Notes

### 1. Google OAuth

Google OAuth is currently implemented for **Users**.

The OAuth flow uses:

```text
GET /api/auth/google
```

and:

```text
GET /api/auth/google/callback
```

Google OAuth credentials are configured using environment variables:

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=
```

### 2. Driver Authentication

Driver authentication remains separate from User authentication.

Drivers use:

```text
registerDriver
loginDriver
logoutDriver
getMeDriver
```

### 3. Request/Response Schemas

The route definitions establish the available endpoints, while exact request and response structures are implemented by the corresponding controllers, services, models, and validation logic.

### 4. Authentication Implementation

User and Driver authentication is protected through their respective middleware:

```text
userMiddleware
driverMiddleware
```

Authentication state is maintained using cookies.

### 5. AI Ride Analysis

The AI ride analysis endpoint is:

```text
POST /api/ride-requests/analyze
```

and is used as the entry point for NavGati's AI-powered ride request processing.

---

# API Summary

NavGati currently exposes:

```text
23 API endpoints
```

### User & Driver Authentication

```text
10 endpoints
```

* User registration
* User login
* User logout
* Get current User
* Google OAuth initiation
* Google OAuth callback
* Driver registration
* Driver login
* Driver logout
* Get current Driver

### AI Ride Analysis

```text
1 endpoint
```

### User Booking Management

```text
4 endpoints
```

### Driver Ride Management

```text
8 endpoints
```

Total:

```text
10 + 1 + 4 + 8 = 23 endpoints
```

---

# NavGati

**AI-powered ride booking platform**

```text
                    ┌─────────────────┐
                    │      User       │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │ Authentication   │
                    │                  │
                    │ Email / Password │
                    │ Google OAuth     │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ AI Ride Analysis│
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ Create Booking  │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │     Driver      │
                    │ Pending Rides   │
                    └────────┬────────┘
                             │
                      ┌──────┴──────┐
                      │             │
                      ▼             ▼
                   Accept         Reject
                      │
                      ▼
                Current Ride
                      │
                      ▼
                Complete Ride
                      │
                      ▼
                Ride Completed
```

Built with a modular Express.js REST API architecture for separate User and Driver workflows, AI-powered ride intelligence, cookie-based authentication, and Google OAuth authentication.
