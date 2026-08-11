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

## Getting Started

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

## Suggested GitHub commands

```bash
git init
git add .
git commit -m "Build React TypeScript user management CRUD app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/user-management-app.git
git push -u origin main
```

## Deployment

This project can be deployed directly to Vercel or Netlify.

For Vercel:

```bash
npm install -g vercel
vercel
```

Or import the GitHub repository into the Vercel dashboard and use:

- Build command: `npm run build`
- Output directory: `dist`

## Project Structure

```text
user-management-app/
├── src/
│   ├── components/
│   │   ├── Spinner.tsx
│   │   └── UserForm.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   └── UserDetails.tsx
│   ├── api.ts
│   ├── App.tsx
│   ├── main.tsx
│   ├── styles.css
│   └── types.ts
├── index.html
├── package.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```