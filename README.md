# EmployWise User Management Application

A React application built with TypeScript, Tailwind CSS, and Vite that integrates with the Reqres API for user management.

## Features

- **Authentication**: Secure login system using the Reqres API
- **User Management**: View, edit, and delete users
- **Responsive Design**: Works well on both desktop and mobile devices
- **Search Functionality**: Filter users by name or email
- **Pagination**: Navigate through multiple pages of users

## Technologies Used

- React with TypeScript
- React Router for navigation
- Axios for API requests
- Tailwind CSS for styling
- Vite as the build tool

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd employwise-user-management
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

- Built with React 18 and TypeScript for type safety
- Used React Router v6 for navigation
- Used Axios for API calls with interceptors for token authentication
- Implemented client-side search functionality for users
- Used Tailwind CSS for styling with responsive design

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```
