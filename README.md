# Zaufany Kierowca - Backend 🚗

> **Note:** This repository does not contain the full code for the Zaufany Kierowca app. Some parts of the implementation have been omitted for privacy reasons.

This repository contains the backend for the **Zaufany Kierowca** mobile application. The backend provides authentication, ride-sharing, reservation, and notification functionalities. It communicates with the frontend and handles all server-side logic, ensuring smooth interaction between users and the app's features.

## 📱 Key Features

- **User Authentication & Authorization**: Includes registration, login, logout, email verification, password reset, and session management.
- **Ride Management**: Allows users to create, update, search, and delete rides, including details like origin, destination, date, and number of passengers.
- **Reservation System**: Users can search for rides, make reservations, and cancel them. Notifications are sent via Firebase Cloud Messaging (FCM) for any ride changes.
- **Review System**: Users can leave opinions (reviews) after completing a ride.
- **Notification System**: Push notifications using Firebase Cloud Messaging (FCM) to alert users of ride-related updates.

## 🛠️ Technologies

- **Node.js**: JavaScript runtime for the server.
- **Express**: Web framework to structure the API.
- **TypeScript**: Used throughout the backend for type safety.
- **TypeORM**: Object-Relational Mapping tool for PostgreSQL.
- **PostgreSQL**: Relational database for storing user and ride-related data.
- **Zod**: Schema validation library to validate API inputs.
- **Firebase Cloud Messaging (FCM)**: Sends push notifications to users.
- **Nodemailer**: Sends emails for user verification and password recovery.
- **Redis**: Used for caching and other in-memory operations.

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)

- `POST /api/auth/register`: Register a new user and send a verification email.
- `POST /api/auth/login`: Login an existing user and receive access tokens.
- `GET /api/auth/logout`: Logout the user and invalidate the session.
- `POST /api/auth/refresh`: Refresh the access token for session continuation.
- `POST /api/auth/resendverificationcode`: Resend the email verification code.
- `GET /api/auth/verifyemail/:verificationCode`: Verify the user’s email address.
- `POST /api/auth/forgotpassword`: Send a password reset link via email.
- `PATCH /api/auth/resetpassword/:resetToken`: Reset the user's password using the reset token.

### User Routes (`/api/users`)

- `GET /api/users/me`: Get the current authenticated user's profile.
- `PATCH /api/users/:userId`: Update the user's profile.
- `GET /api/users/:userId`: Retrieve details of a specific user.
- `DELETE /api/users/:userId`: Delete a user.

### Ride Routes (`/api/rides`)

- `POST /api/rides`: Create a new ride with origin, destination, and other details.
- `GET /api/rides`: Retrieve all available rides.
- `GET /api/rides/:rideId`: Get details about a specific ride.
- `PATCH /api/rides/:rideId`: Update an existing ride.
- `DELETE /api/rides/:rideId`: Delete a ride.
- `GET /api/rides/search`: Search for rides by address (origin, destination).
- `GET /api/rides/history`: View historical rides taken or created by the user.
- `GET /api/rides/:rideId/passengers`: Get a list of passengers for a specific ride.

### Reservation Routes (`/api/reservations`)

- `POST /api/reservations`: Create a new reservation for a specific ride.
- `GET /api/reservations`: Retrieve all reservations.
- `GET /api/reservations/:reservationId`: Get details about a specific reservation.
- `PATCH /api/reservations/:reservationId`: Update an existing reservation.
- `DELETE /api/reservations/:reservationId`: Cancel a reservation.
- `GET /api/reservations/history`: View historical reservations made by the user.

### Opinion (Review) Routes (`/api/opinions`)

- `POST /api/opinions`: Create a new opinion (review) after completing a ride.
- `GET /api/opinions/received`: Retrieve all opinions (reviews) the user has received.
- `GET /api/opinions/gived`: Retrieve all opinions (reviews) the user has given.
- `DELETE /api/opinions/:opinionId`: Delete an opinion (review).

### Health Check Route (`/api/healthChecker`)

- `GET /api/healthChecker`: A simple health check endpoint to ensure the server is running properly.

## 🛡️ Validation

**Zod** is used for schema validation to ensure incoming requests have the correct structure and valid data.
This ensures that invalid data is caught early before it reaches the server’s business logic.

## 🔗 External Integrations

- **Firebase Cloud Messaging (FCM)**:
  Real-time notifications such as:

  - Ride cancellations
  - New reservations

- **Nodemailer**:
  Utilized for:

  - Sending email verifications during user registration
  - Sending password reset links for forgotten passwords.

## 💬 Contact

If you have any questions or want to discuss my project, feel free to reach out!

- **Email**: kacperzolkiewski@gmail.com
- **LinkedIn**: [Kacper Żółkiewski](https://www.linkedin.com/in/kzolkiewski/)
