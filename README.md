# SaaS Dashboard

A modern, responsive admin dashboard built with React, Tailwind CSS, and Chart.js. Features a sleek dark/light mode, interactive charts, full CRUD operations, animations, internationalization, and PWA support.

![Dashboard Preview](https://via.placeholder.com/1200x600/4f46e5/ffffff?text=SaaS+Dashboard+Preview)

## 🔗 Live Demo

**Live Demo:** https://bugbie.github.io/Saas-Dashboard

## Features

- **Authentication** - Login with form validation
- **Dashboard Overview** - Revenue charts, stats, and recent transactions
- **Analytics** - Traffic sources and browser distribution
- **Products Management** - Full CRUD with pagination
- **Orders Management** - Track and manage orders
- **Users Management** - Team member management with roles
- **Settings** - General, Security, Notifications, and Billing tabs
- **Dark/Light Mode** - Toggle between themes (persisted)
- **Responsive Design** - Works on all screen sizes
- **Local Storage** - Data persists across sessions
- **Toast Notifications** - Animated user feedback
- **Animated Charts** - Smooth chart animations on load
- **React Router** - Real page navigation
- **Framer Motion** - Smooth page transitions
- **i18n** - Multi-language support (English & Spanish)
- **PWA** - Offline support with service worker
- **Error Boundaries** - Graceful error handling
- **Custom Hooks** - Reusable logic (useLocalStorage, useDebounce, etc.)

## Tech Stack

- **React 18** - UI framework
- **React Router v7** - Navigation
- **Tailwind CSS** - Styling
- **Chart.js + React-Chartjs-2** - Charts
- **Framer Motion** - Animations
- **i18next** - Internationalization
- **Vite** - Build tool
- **PWA** - Service worker for offline support

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/bugbie/Saas-Dashboard.git

# Navigate to project
cd Saas-Dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

After deploying, your dashboard will be live at: `https://yourusername.github.io/Saas-Dashboard`

## Demo Credentials

- **Email:** bugbie@demo.com
- **Password:** password

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ErrorBoundary.jsx
│   └── Skeleton.jsx
├── context/             # React context providers
├── hooks/               # Custom React hooks
│   └── index.js         # useLocalStorage, useDebounce, useOnClickOutside, etc.
├── i18n/                # Internationalization
│   └── index.js         # English & Spanish translations
├── utils/               # Utility functions
│   └── chartSetup.js    # Chart.js configuration
├── App.jsx              # Main app component
├── main.jsx             # Entry point
└── index.css            # Global styles
```

## Key Features Explained

### State Management
- **AppContext** - Global app state (auth, theme, toasts, language)
- **DataContext** - Products, orders, users with localStorage persistence

### Form Validation
- Email format validation (regex)
- Required field checks
- Password minimum length (6 characters)
- Real-time error feedback

### Routing
- React Router v7 with dynamic routing
- Routes: /, /analytics, /products, /orders, /users, /settings

### Animations
- Framer Motion for page transitions
- Animated entry for cards and charts
- Smooth toast notifications

### Internationalization
- English (default)
- Spanish (Español)
- Easy to add more languages

### PWA
- Offline support
- Installable on mobile/desktop
- Fast loading with service worker

## Screenshots

### Login Page
![Login](https://github.com/codeDev1209/Saas-Dashboard/blob/75323dab5531a5990998c1f29034f01f8473e4e7/screenshots/login.png)

### Dashboard Overview
![Dashboard](https://github.com/codeDev1209/Saas-Dashboard/blob/e5e1941db18717f01c9ab12f6f6399def359da68/screenshots/dashboard.png)

### Products Page
![Products](https://github.com/codeDev1209/Saas-Dashboard/blob/e5e1941db18717f01c9ab12f6f6399def359da68/screenshots/products.png)

### Dark Mode
![Dark Mode](https://github.com/codeDev1209/Saas-Dashboard/blob/e5e1941db18717f01c9ab12f6f6399def359da68/screenshots/darkmode.png)

## License

MIT License - feel free to use for your portfolio!

## Author

**Bugbie** - [GitHub](https://github.com/bugbie)

## Acknowledgments

- [React Router](https://reactrouter.com)
- [Framer Motion](https://www.framer.com/motion)
- [Lucide Icons](https://lucide.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Chart.js](https://www.chartjs.org)
- [i18next](https://www.i18next.com)
