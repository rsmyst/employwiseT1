# EmployWise User Management Application

A React application built with TypeScript, Tailwind CSS, and Vite that integrates with the Reqres API for user management.

## Features

- **Authentication**: Secure login system using the Reqres API
- **User Management**: View, edit, and delete users
- **Responsive Design**: Works well on both desktop and mobile devices
- **Search Functionality**: Filter users by name or email
- **Pagination**: Navigate through multiple pages of users through infinite scroll and lazy loading

## Technologies Used

- React with TypeScript
- React Router for navigation
- Axios for API requests
- Tailwind CSS for styling
- Vite as the build tool

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rsmyst/employwiseT1.git
   cd employwiseT1
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Run the development server:

   ```bash
   pnpm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Login

Use the following credentials to log in:

- Email: eve.holt@reqres.in
- Password: cityslicka

### User Management

After successful login, you'll be redirected to the Users page where you can:

- View all users in a card layout
- Search for specific users by name or email
- Edit user details
- Delete users
- Navigate between pages using pagination

## API Integration

The application integrates with the Reqres API:

- Base URL: https://reqres.in/api
- Endpoints used:
  - POST /api/login - For authentication
  - GET /api/users?page={page} - To fetch users
  - PUT /api/users/{id} - To update user details
  - DELETE /api/users/{id} - To delete a user

## Project Structure

```
src/
├── components/     # Reusable UI components
├── context/        # React context API files
│   ├── AuthContext.tsx
│   └── useAuth.tsx
├── pages/          # Page components
│   ├── Login.tsx
│   ├── Users.tsx
│   └── EditUser.tsx
├── services/       # API services
│   └── api.ts
├── App.tsx         # Main app component with routing
└── main.tsx        # Entry point
```

## Assumptions and Considerations

- The Reqres API is a mock API, so actual data manipulation operations (create, update, delete) don't persist on the server.
- For demonstration purposes, successful operations are simulated by updating the local state.
- Token persists in localStorage, so the user remains logged in after page refresh.

## Development Notes

- Built with React and TypeScript for type safety
- Used React Router for navigation
- Used Axios for API calls
- Implemented client-side search functionality for users
- Used Tailwind CSS for styling with responsive design
- Utilized Github Copilot for faster prototyping and development while understanding the workings of the underlying code and debugging errors.
