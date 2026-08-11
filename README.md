# User Management Application

A responsive CRUD User Management application built with React, TypeScript, React Router, and the JSONPlaceholder REST API.

## Features

- Fetch and display users from JSONPlaceholder
- Create users with POST
- Edit users with PUT
- Delete users with DELETE
- User detail route: `/users/:id`
- Responsive desktop/mobile UI
- React functional components and Hooks
- Loading spinner
- Form validation
- API error handling
- Local state synchronization because JSONPlaceholder does not persist mutations
- TypeScript

## Tech Stack

- React
- TypeScript
- React Router
- Vite
- CSS
- JSONPlaceholder REST API



### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

Open the local URL printed by Vite.

### 3. Build for production

```bash
npm run build
```

## Important JSONPlaceholder behavior

JSONPlaceholder simulates POST, PUT, and DELETE requests. It returns successful responses but does not permanently change its database.

For that reason, this application updates its React state after successful mutation requests. A page refresh will fetch the original JSONPlaceholder users again.



- Build command: `npm run build`
- Output directory: `dist`

