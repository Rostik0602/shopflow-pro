> ⚠️ The backend is hosted on Render's free tier and may take 30–60 seconds to wake up on the first request after inactivity.

# ShopFlow Pro

Full-stack e-commerce application built with React, TypeScript, Redux Toolkit, RTK Query, Node.js and Express.

ShopFlow Pro is a modern online store with authentication, product management, shopping cart, favorites and responsive UI.

The project demonstrates client-server architecture, state management, JWT authentication, REST API and modern frontend development practices.

## Live Demo

🌐 **Frontend:** https://shopflow-pro-six.vercel.app/

⚙️ **Backend API:** https://shopflow-pro-0ume.onrender.com

## Tech Stack

### Frontend

- React 18
- TypeScript
- Redux Toolkit + RTK Query (data fetching, caching and API state management)
- React Router v6
- SCSS Modules
- Vite
- Lucide React

The application follows a feature-based architecture:

- `components/` — reusable UI components
- `features/` — business logic modules
- `pages/` — application routes
- `services/` — API communication
- `app/` — Redux store and root component

### Backend

- Node.js + Express
- TypeScript (tsx)
- JWT authentication (jsonwebtoken)
- bcrypt password hashing
- CORS
- JSON file as database

### Deployment

- Vercel (Frontend)
- Render (Backend)

## Features

### Authentication

- User registration with validation
- Unique username checking
- User login / logout
- JWT authentication with expiration
- Protected routes
- Persistent authentication using localStorage
- Reactive auth state with Redux Toolkit (no page reload required)

### Product Catalog

- Server-side pagination (16 products per page)
- Product search with debounce (600ms)
- Category filtering
- Sorting by price, title and rating with ascending/descending toggle
- Product cards with category badges and hover animations

### Product Management (CRUD)

- Create products with form validation
- Edit existing products
- Delete products with confirmation modal
- Optimistic UI updates via RTK Query cache (onQueryStarted)

### Shopping Cart

- Add / remove products
- Quantity management (auto-removes item when quantity reaches zero)
- Total price and item count calculation
- Cart clearing with confirmation modal
- Empty cart state with icon

### Favorites

- Add / remove favorites
- Dedicated favorites page
- Empty state with icon

### UI / UX

- Responsive CSS Grid product layout
- Sticky navigation bar with logo and username
- Modal windows via React Portal (createPortal)
- Loading, error and empty states
- Custom SCSS design system with tokens (colors, spacing, shadows, typography)
- Space Grotesk for headings, Inter for body text, JetBrains Mono for prices
- Pill-style buttons with variants (primary / secondary / danger)
- Animated card hover effects and favorite icon spring animation

## Screenshots

### Home Page

Main product catalog with search, filtering, sorting and responsive product grid.

![Home Page](./screenshots/home.png)

---

### Product Details

Detailed product page with full product information and actions.

![Product Details](./screenshots/product-details.png)

---

### Authentication

User login and registration with validation and JWT authentication.

![Login Page](./screenshots/login.png)

![Register Page](./screenshots/register.png)

---

### Product Management

Create and edit products with form validation.

![Create Product](./screenshots/create-product.png)

![Edit Product](./screenshots/edit-product.png)

---

### Shopping Cart

Cart management with quantity controls and total price calculation.

![Shopping Cart](./screenshots/cart.png)

---

### Favorites

Favorites page with product grid.

![Favorites](./screenshots/favorites.png)

## Installation

### Clone the repository

```bash
git clone https://github.com/Rostik0602/shopflow-pro.git
cd shopflow-pro
```

### Install frontend dependencies

```bash
npm install
```

### Install backend dependencies

```bash
cd server
npm install
```

### Run the application

Start the backend server:

```bash
cd server
npm run dev
```

Start the frontend in a separate terminal:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

The backend API will run at `http://localhost:3000`