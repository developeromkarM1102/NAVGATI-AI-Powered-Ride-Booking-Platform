# NavGati Frontend API Services

> Frontend API/service documentation for **NavGati**, an AI-powered
> ride-booking platform.

This document describes the Axios-based service layer used by the
frontend to communicate with the NavGati Express backend.

------------------------------------------------------------------------

## Table of Contents

-   [Overview](#overview)
-   [Architecture](#architecture)
-   [API Client Configuration](#api-client-configuration)
-   [User API Layer](#user-api-layer)
    -   [User Authentication API](#user-authentication-api)
    -   [User AI API](#user-ai-api)
-   [Driver API Layer](#driver-api-layer)
    -   [Driver Authentication API](#driver-authentication-api)
    -   [Driver Ride Management API](#driver-ride-management-api)
-   [Complete User Flow](#complete-user-flow)
-   [Complete Driver Flow](#complete-driver-flow)
-   [Complete NavGati Flow](#complete-navgati-flow)
-   [Error Handling](#error-handling)
-   [Cookie Authentication](#cookie-authentication)
-   [Endpoint Summary](#endpoint-summary)
-   [Example Usage](#example-usage)
-   [Project Organization](#project-organization)

------------------------------------------------------------------------

# Overview

The NavGati frontend communicates with the Express backend through
reusable Axios service functions.

The frontend API layer is divided into two major roles:

``` text
                         NavGati API Layer
                                │
                 ┌──────────────┴──────────────┐
                 │                             │
              USER API                      DRIVER API
                 │                             │
        ┌────────┴────────┐           ┌────────┴────────┐
        │                 │           │                 │
   Authentication      User AI   Authentication    Ride Management
        │                 │           │                 │
   Register/Login    Analyze Ride   Register/Login   Pending Rides
   Logout/GetMe      Book Ride      Logout/GetMe     Accept/Reject
                    My Bookings                       Complete
                    Cancel Ride                       Availability
                                                      Earnings
```

------------------------------------------------------------------------

# Architecture

The frontend service layer follows:

``` text
React / Next.js Components
          │
          ▼
     API Services
          │
          ▼
        Axios
          │
          ▼
    Express Backend
          │
          ▼
 Controllers / Services
          │
          ▼
       Database
```

This keeps HTTP communication outside the UI components and makes the
API functions reusable throughout the application.

------------------------------------------------------------------------

# API Client Configuration

The supplied API clients use Axios with credentialed requests.

``` js
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:4000/",
    withCredentials: true,
});
```

### Backend

``` text
http://localhost:4000/
```

### Credentials

``` text
withCredentials: true
```

The Driver authentication service uses the equivalent configuration:

``` js
const api = axios.create({
    baseURL: "http://localhost:4000",
    withCredentials: true
});
```

The credential configuration allows browser authentication cookies to be
included with requests.

------------------------------------------------------------------------

# User API Layer

The User side contains two API services:

``` text
User API
│
├── User Authentication API
│
└── User AI API
```

------------------------------------------------------------------------

# User Authentication API

File:

``` text
userAuth.api.js
```

The User authentication service provides:

``` text
UserRegister()
UserLogin()
UserLogout()
UserGetMe()
```

------------------------------------------------------------------------

## UserRegister

Registers a new User.

### Function

``` js
UserRegister({
    username,
    email,
    password,
    phone,
    role
})
```

### Request

``` http
POST /api/auth/registerUser
```

### Payload

``` json
{
    "username": "...",
    "email": "...",
    "password": "...",
    "phone": "...",
    "role": "..."
}
```

The service sends these fields directly to the backend.

### Return

``` js
return response.data;
```

### Error

``` js
{
    error: err.message
}
```

------------------------------------------------------------------------

## UserLogin

Authenticates a User.

### Function

``` js
UserLogin({
    email,
    password
})
```

### Request

``` http
POST /api/auth/loginUser
```

### Payload

``` json
{
    "email": "...",
    "password": "..."
}
```

------------------------------------------------------------------------

## UserLogout

Logs out the authenticated User.

### Function

``` js
UserLogout()
```

### Request

``` http
GET /api/auth/logoutUser
```

------------------------------------------------------------------------

## UserGetMe

Retrieves the currently authenticated User.

### Function

``` js
UserGetMe()
```

### Request

``` http
GET /api/auth/getmeUser
```

------------------------------------------------------------------------

# User AI API

File:

``` text
ai.api.js
```

This is the **User-side AI and ride-booking API**.

It handles the user's natural-language ride request and subsequent
booking operations.

Available functions:

``` text
AnalyzeRide()
BookRide()
GetBookingStatus()
cancelBooking()
getMyBookings()
```

------------------------------------------------------------------------

## AnalyzeRide

Sends a natural-language ride request to the NavGati AI backend.

### Function

``` js
AnalyzeRide({
    text
})
```

### Request

``` http
POST /api/ride-requests/analyze
```

### Payload

``` json
{
    "text": "Book me a sedan from Vashi to Mumbai Airport tomorrow at 8 AM"
}
```

The `text` field contains the user's natural-language ride request.

### Return

``` js
return response.data;
```

### Error Handling

The service checks:

``` text
backend message
      ↓
backend error
      ↓
Axios error message
      ↓
"Something went wrong"
```

------------------------------------------------------------------------

## BookRide

Creates the User's ride booking.

### Function

``` js
BookRide({
    driverId,
    pickup,
    destination,
    rideType,
    passengers,
    luggage,
    distance,
    estimatedDuration,
    fare,
    status,
    pickupCoordinates,
    destinationCoordinates
})
```

### Request

``` http
POST /api/bookings/rideBooking
```

### Payload

The service transforms the pickup and destination data into objects:

``` json
{
    "driverId": "...",
    "pickup": {
        "address": "...",
        "latitude": 19.0759,
        "longitude": 72.9977
    },
    "destination": {
        "address": "...",
        "latitude": 19.0896,
        "longitude": 72.8656
    },
    "rideType": "...",
    "passengers": 2,
    "luggage": 2,
    "distance": 10,
    "estimatedDuration": 30,
    "fare": 500,
    "status": "pending"
}
```

Coordinates are obtained using:

``` js
pickupCoordinates?.latitude
pickupCoordinates?.longitude

destinationCoordinates?.latitude
destinationCoordinates?.longitude
```

------------------------------------------------------------------------

## GetBookingStatus

Gets a specific User booking.

### Function

``` js
GetBookingStatus({
    bookingID
})
```

### Request

``` http
GET /api/bookings/:bookingID
```

Example:

``` text
GET /api/bookings/64xxxxxxxxxxxxxxxxxxxxxx
```

------------------------------------------------------------------------

## cancelBooking

Cancels a User booking.

### Function

``` js
cancelBooking({
    bookingId
})
```

### Request

``` http
POST /api/bookings/cancel/:bookingId
```

Example:

``` text
POST /api/bookings/cancel/64xxxxxxxxxxxxxxxxxxxxxx
```

------------------------------------------------------------------------

## getMyBookings

Gets the authenticated User's bookings.

### Function

``` js
getMyBookings()
```

### Request

``` http
GET /api/bookings/myBookings
```

------------------------------------------------------------------------

# Driver API Layer

The Driver side contains two API services:

``` text
Driver API
│
├── Driver Authentication API
│
└── Driver Ride Management API
```

------------------------------------------------------------------------

# Driver Authentication API

File:

``` text
driverAuth.api.js
```

Available functions:

``` text
DriverRegister()
DriverLogin()
DriverLogout()
DriverGetMe()
```

------------------------------------------------------------------------

## DriverRegister

Registers a Driver.

### Function

``` js
DriverRegister({
    username,
    email,
    password,
    phone,
    licenseNumber,
    licenseExpiry,
    vehicle
})
```

### Request

``` http
POST /api/auth/registerDriver
```

### Payload

``` json
{
    "username": "...",
    "email": "...",
    "password": "...",
    "phone": "...",
    "licenseNumber": "...",
    "licenseExpiry": "...",
    "vehicle": {}
}
```

The `vehicle` object is passed directly to the backend service.

------------------------------------------------------------------------

## DriverLogin

Authenticates a Driver.

### Function

``` js
DriverLogin({
    email,
    password
})
```

### Request

``` http
POST /api/auth/loginDriver
```

### Payload

``` json
{
    "email": "...",
    "password": "..."
}
```

------------------------------------------------------------------------

## DriverLogout

Logs out the authenticated Driver.

### Function

``` js
DriverLogout()
```

### Request

``` http
GET /api/auth/logoutDriver
```

------------------------------------------------------------------------

## DriverGetMe

Retrieves the currently authenticated Driver.

### Function

``` js
DriverGetMe()
```

### Request

``` http
GET /api/auth/getmeDriver
```

------------------------------------------------------------------------

# Driver Ride Management API

File:

``` text
ai.api.js
```

This service handles the Driver-side ride-management operations.

Available functions:

``` text
getDriverEarnings()
updateDriverAvailability()
PendingBooking()
CurrentBooking()
AcceptBooking()
RejectBooking()
CancelBooking()
CompleteBooking()
```

------------------------------------------------------------------------

## getDriverEarnings

Retrieves Driver earnings.

### Function

``` js
getDriverEarnings()
```

### Request

``` http
GET /api/driver/bookings/driver-earnings
```

### Error Response

``` json
{
    "success": false,
    "error": "Failed to fetch driver earnings"
}
```

The backend error message is preferred when one is available.

------------------------------------------------------------------------

## updateDriverAvailability

Changes the Driver's online/offline availability.

### Function

``` js
updateDriverAvailability(isAvailable)
```

### Request

``` http
PATCH /api/driver/bookings/availability
```

### Payload

Online:

``` json
{
    "isAvailable": true
}
```

Offline:

``` json
{
    "isAvailable": false
}
```

### Error Response

``` json
{
    "success": false,
    "message": "Failed to update driver availability"
}
```

------------------------------------------------------------------------

## PendingBooking

Gets pending ride requests for the Driver.

### Function

``` js
PendingBooking()
```

### Request

``` http
GET /api/driver/bookings/pending
```

------------------------------------------------------------------------

## CurrentBooking

Gets the Driver's current booking.

### Function

``` js
CurrentBooking()
```

### Request

``` http
GET /api/driver/bookings/current
```

------------------------------------------------------------------------

## AcceptBooking

Accepts a pending ride.

### Function

``` js
AcceptBooking({
    bookingID
})
```

### Request

``` http
PATCH /api/driver/bookings/:bookingID/accept
```

Example:

``` text
PATCH /api/driver/bookings/64xxxxxxxxxxxxxxxxxxxxxx/accept
```

------------------------------------------------------------------------

## RejectBooking

Rejects a pending ride.

### Function

``` js
RejectBooking({
    bookingID
})
```

### Request

``` http
PATCH /api/driver/bookings/:bookingID/reject
```

------------------------------------------------------------------------

## CancelBooking

Cancels a Driver-side booking.

### Function

``` js
CancelBooking({
    bookingID
})
```

### Request

``` http
PATCH /api/driver/bookings/:bookingID/cancel
```

------------------------------------------------------------------------

## CompleteBooking

Completes a Driver's ride.

### Function

``` js
CompleteBooking({
    bookingID
})
```

### Request

``` http
PATCH /api/driver/bookings/:bookingID/complete
```

------------------------------------------------------------------------

# Complete User Flow

``` text
                 USER
                  │
                  ▼
        ┌──────────────────┐
        │ User Registration│
        └────────┬─────────┘
                 │
                 ▼
        ┌──────────────────┐
        │    User Login    │
        └────────┬─────────┘
                 │
                 ▼
        ┌──────────────────────┐
        │    AnalyzeRide()     │
        │ Natural Language AI  │
        └──────────┬───────────┘
                   │
                   ▼
             Ride Analysis
                   │
                   ▼
             ┌───────────┐
             │ BookRide()│
             └─────┬─────┘
                   │
                   ▼
               Booking
                   │
          ┌────────┴────────┐
          │                 │
          ▼                 ▼
 GetBookingStatus()   getMyBookings()
          │
          ▼
   cancelBooking()
```

------------------------------------------------------------------------

# Complete Driver Flow

``` text
                 DRIVER
                   │
                   ▼
        ┌────────────────────┐
        │ Driver Registration│
        └─────────┬──────────┘
                  │
                  ▼
        ┌────────────────────┐
        │    Driver Login    │
        └─────────┬──────────┘
                  │
                  ▼
      updateDriverAvailability()
                  │
                  ▼
         PendingBooking()
                  │
            ┌─────┴─────┐
            │           │
            ▼           ▼
      AcceptBooking  RejectBooking
            │
            ▼
       CurrentBooking()
            │
       ┌────┴─────┐
       │          │
       ▼          ▼
CompleteBooking  CancelBooking
       │
       ▼
   Ride Completed

Additional Driver services:
    getDriverEarnings()
    DriverGetMe()
    DriverLogout()
```

------------------------------------------------------------------------

# Complete NavGati Flow

The complete User-to-Driver ride lifecycle can be represented as:

``` text
                         USER
                          │
                          ▼
                  User Authentication
                          │
                          ▼
                  Natural Language
                    Ride Request
                          │
                          ▼
                    AnalyzeRide()
                          │
                          ▼
                   AI Ride Analysis
                          │
                          ▼
                      BookRide()
                          │
                          ▼
                       BOOKING
                          │
                          │
                          ▼
                       DRIVER
                          │
                          ▼
                  PendingBooking()
                          │
                   ┌──────┴──────┐
                   │             │
                   ▼             ▼
             AcceptBooking   RejectBooking
                   │
                   ▼
             CurrentBooking()
                   │
                   ▼
             CompleteBooking()
                   │
                   ▼
                COMPLETED
```

The User can also retrieve bookings or cancel a booking during the
appropriate stage.

The Driver can manage availability and retrieve earnings independently
of the ride lifecycle.

------------------------------------------------------------------------

# Error Handling

The API services generally return:

``` js
response.data
```

when requests succeed.

The User AI service uses:

``` js
{
    error:
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Something went wrong"
}
```

Driver booking services use structured fallback responses such as:

``` js
{
    success: false,
    error: "Failed to accept booking"
}
```

and:

``` js
{
    success: false,
    message: "Failed to update driver availability"
}
```

This allows UI components to handle failures without needing to directly
manage Axios exceptions.

------------------------------------------------------------------------

# Cookie Authentication

The API services use:

``` js
withCredentials: true
```

This is important because the backend uses authenticated User and Driver
middleware.

Frontend:

``` js
const api = axios.create({
    baseURL: "http://localhost:4000/",
    withCredentials: true,
});
```

The backend must also allow credentialed CORS.

Current backend OR frontend origin:

``` text
Backend
http://localhost:4000
```

``` text
Frontend
http://localhost:3000
```

------------------------------------------------------------------------

# Endpoint Summary

## User Authentication API

  Function           Method   Endpoint
  ------------------ -------- --------------------------
  `UserRegister()`   POST     `/api/auth/registerUser`
  `UserLogin()`      POST     `/api/auth/loginUser`
  `UserLogout()`     GET      `/api/auth/logoutUser`
  `UserGetMe()`      GET      `/api/auth/getmeUser`

## User AI API

  Function               Method   Endpoint
  ---------------------- -------- -----------------------------------
  `AnalyzeRide()`        POST     `/api/ride-requests/analyze`
  `BookRide()`           POST     `/api/bookings/rideBooking`
  `GetBookingStatus()`   GET      `/api/bookings/:bookingID`
  `cancelBooking()`      POST     `/api/bookings/cancel/:bookingId`
  `getMyBookings()`      GET      `/api/bookings/myBookings`

## Driver Authentication API

  Function             Method   Endpoint
  -------------------- -------- ----------------------------
  `DriverRegister()`   POST     `/api/auth/registerDriver`
  `DriverLogin()`      POST     `/api/auth/loginDriver`
  `DriverLogout()`     GET      `/api/auth/logoutDriver`
  `DriverGetMe()`      GET      `/api/auth/getmeDriver`

## Driver Ride Management API

  ---------------------------------------------------------------------------------------------------
  Function                       Method                  Endpoint
  ------------------------------ ----------------------- --------------------------------------------
  `getDriverEarnings()`          GET                     `/api/driver/bookings/driver-earnings`

  `updateDriverAvailability()`   PATCH                   `/api/driver/bookings/availability`

  `PendingBooking()`             GET                     `/api/driver/bookings/pending`

  `CurrentBooking()`             GET                     `/api/driver/bookings/current`

  `AcceptBooking()`              PATCH                   `/api/driver/bookings/:bookingID/accept`

  `RejectBooking()`              PATCH                   `/api/driver/bookings/:bookingID/reject`

  `CancelBooking()`              PATCH                   `/api/driver/bookings/:bookingID/cancel`

  `CompleteBooking()`            PATCH                   `/api/driver/bookings/:bookingID/complete`
  ---------------------------------------------------------------------------------------------------

------------------------------------------------------------------------

# Example Usage

## User AI Request

``` js
const result = await AnalyzeRide({
    text: "I need a sedan from Vashi to Mumbai Airport tomorrow at 8 AM"
});
```

------------------------------------------------------------------------

## User Booking

``` js
const result = await BookRide({
    driverId,
    pickup: "Vashi",
    destination: "Mumbai Airport",
    rideType: "sedan",
    passengers: 2,
    luggage: 2,
    distance,
    estimatedDuration,
    fare,
    status: "pending",
    pickupCoordinates: {
        latitude: 19.0759,
        longitude: 72.9977
    },
    destinationCoordinates: {
        latitude: 19.0896,
        longitude: 72.8656
    }
});
```

------------------------------------------------------------------------

## Driver Accepts Ride

``` js
const result = await AcceptBooking({
    bookingID
});
```

------------------------------------------------------------------------

## Driver Goes Online

``` js
const result = await updateDriverAvailability(true);
```

------------------------------------------------------------------------

## Driver Completes Ride

``` js
const result = await CompleteBooking({
    bookingID
});
```

------------------------------------------------------------------------

# Project Organization

A clean organization for these API services is:

``` text
src/
└── api/
    │
    ├── User
    │   ├── userAuth.api.js
    │   └── ai.api.js
    │
    └── Driver
        ├── driverAuth.api.js
        └── ai.api.js
```

------------------------------------------------------------------------

# API Layer Responsibilities

## User API

Responsible for:

``` text
User registration
User login
User Google Auth Login
User logout
Current User
AI ride request
Ride booking
Booking status
My bookings
User cancellation
```

## Driver API

Responsible for:

``` text
Driver registration
Driver login
Driver logout
Current Driver
Driver availability
Pending rides
Current ride
Accept ride
Reject ride
Cancel ride
Complete ride
Driver earnings
```

------------------------------------------------------------------------

# NavGati API Architecture

``` text
                    NAVGATI FRONTEND
                           │
              ┌────────────┴────────────┐
              │                         │
           USER SIDE                DRIVER SIDE
              │                         │
       ┌──────┴──────┐          ┌───────┴───────┐
       │             │          │               │
   Auth API       AI API     Auth API      Driver API
       │             │          │               │
       │        AnalyzeRide     │        Ride Management
       │        BookRide        │        Availability
       │        Bookings        │        Earnings
       │             │          │               │
       └─────────────┴──────────┴───────────────┘
                           │
                           ▼
                    EXPRESS BACKEND
```

------------------------------------------------------------------------

## NavGati

**AI-powered ride-booking platform**

``` text
User
  ↓
Natural Language Request
  ↓
AI Analysis
  ↓
Ride Booking
  ↓
Driver
  ↓
Accept / Reject
  ↓
Current Ride
  ↓
Complete Ride
```
