# 🟡 Blinkit Clone — Full Stack App

A pixel-perfect Blinkit clone with React + Vite frontend and Express backend.

---

## 📁 Project Structure

```
blinkit-clone/
├── frontend/          # React + Vite + Tailwind + Redux
└── backend/           # Node.js + Express (MongoDB optional)
```

---

## 🚀 Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env    # Edit if you have MongoDB
npm run dev             # Starts on http://localhost:5000
```

The backend works **without MongoDB** using in-memory storage (perfect for demos).

### 2. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env    # Sets API URL
npm run dev             # Starts on http://localhost:3000
```

Open `http://localhost:3000` in your browser.

---

## ✨ Features

### Frontend (React + Vite)
- ⚡ Pixel-perfect Blinkit UI
- 🗂️ Category filtering with horizontal strip
- 🔍 Live product search
- 🛒 Cart drawer with quantity controls & bill summary
- 🔐 Login & Register pages with JWT auth
- 💾 Cart persisted in localStorage
- 📱 Fully responsive (mobile/tablet/desktop)
- 🎠 Auto-rotating hero banner
- Redux Toolkit (authSlice, cartSlice, productSlice)

### Backend (Express)
- `POST /auth/register` — Create account
- `POST /auth/login` — Login + JWT
- `GET /products` — All products (with ?category= filter)
- `GET /categories` — All categories
- `GET /cart` — Fetch cart (auth required)
- `POST /cart` — Update cart (auth required)

---

## 🛠 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, Vite, Tailwind CSS |
| State | Redux Toolkit, React Redux |
| Routing | React Router v6 |
| HTTP | Axios |
| Icons | Lucide React |
| Backend | Node.js, Express |
| Auth | JWT, bcryptjs |
| DB | MongoDB (optional, in-memory fallback) |

---

## 🔑 Environment Variables

### Backend `.env`
```
PORT=5000
JWT_SECRET=your_secret_key
MONGODB_URI=mongodb://localhost:27017/blinkit  # optional
```

### Frontend `.env`
```
VITE_API_URL=http://localhost:5000
```

---

## 📱 Pages

| Route | Page |
|-------|------|
| `/` | Homepage with hero, promos, products |
| `/login` | Login page |
| `/register` | Registration page |

---

## 🎨 Design Tokens

- **Brand Green**: `#0c831f`
- **Brand Yellow**: `#f8c200`
- **Font**: DM Sans (Google Fonts)
