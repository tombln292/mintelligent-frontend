# MINTelligent Frontend

The frontend for the MINT Chatbot, built with Next.js 15, React 19, and Tailwind CSS.

## Prerequisites

- **Node.js 18+** (LTS recommended)
- **npm** (comes with Node.js)

## 🚀 Quick Start

### 1. Installation

```bash
cd web
npm install
```

### 2. Configuration

The frontend needs to know where the backend API is running.

1. Create a `.env.local` file in the `web` directory (or copy a template if available).
2. Add the following variable:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

> **Note:** If your backend is running on a different port or host, update the URL accordingly.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
web/
├── app/
│   ├── page.tsx          # Main chat interface
│   ├── layout.tsx        # Root layout
│   └── ...
├── contexts/             # React contexts (Auth, Language)
├── hooks/                # Custom hooks
├── public/               # Static assets
└── ...
```

## Features

- **Chat Interface**: Real-time chat with the AI assistant.
- **Visualizations**: Dynamic charts for project engagement and difficulty scores.
- **Authentication**: User login and registration flows.
- **Internationalization**: Support for German and English (toggleable).
- **Responsive Design**: Optimized for desktop and mobile.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
