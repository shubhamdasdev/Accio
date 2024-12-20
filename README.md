# Accio

A modern AI-powered document analysis and chat platform built with Next.js, Express, and Prisma.

## Features

- 🔐 Secure Authentication System
- 📄 Document Management & Analysis
- 💬 AI-Powered Chat Interface
- 🎨 Modern UI with Tailwind CSS
- 🔄 Real-time Updates with Zustand
- 🛡️ Protected API Routes
- 🎯 TypeScript Support

## Prerequisites

- Node.js v18.x or higher
- npm v9.x or higher
- PostgreSQL database

## Getting Started

1. Clone the repository

bash
git clone https://github.com/shubhamdasdev/Accio.git


3. Install dependencies

bash:README.md
npm install


4. Set up environment variables
Create a `.env` file in the root directory with the following variables:

env
DATABASE_URL="postgresql://user:password@localhost:5432/accio"

5. Initialize the database

bash
npx prisma generate
npx prisma db push


6. Start the development servers

In one terminal, start the backend server:

bash
npm run dev


The application will be available at `http://localhost:4000`

## Project Structure

- `/src/app` - Next.js pages and layouts
- `/src/components` - React components
- `/src/lib` - Utility functions and API client
- `/src/middleware` - Express middleware
- `/src/routes` - Express API routes
- `/src/store` - Zustand state management
- `/prisma` - Database schema and migrations

## Tech Stack

- **Frontend**
  - Next.js 14
  - React 18
  - Tailwind CSS
  - Zustand (State Management)
  - Radix UI Components

- **Backend**
  - Express.js
  - Prisma (ORM)
  - PostgreSQL
  - JWT Authentication

## API Routes

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User authentication
- `GET /api/documents` - Fetch user documents
- `POST /api/documents` - Create new document
- `PUT /api/documents/:id` - Update document
- `DELETE /api/documents/:id` - Delete document
- `GET /api/chat` - Fetch chat history
- `POST /api/chat` - Send message

## Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Next.js for the amazing React framework
- Tailwind CSS for the utility-first CSS framework
- Prisma for the modern database toolkit
- Zustand for state management
