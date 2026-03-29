# ShortLink — URL Shortener

A full-stack URL shortening service built with the MERN stack. Create short links, track clicks, and manage your links through a clean analytics dashboard.

## Features

- **URL Shortening** — Generate short links instantly with custom aliases
- **Link Expiry** — Set an expiry date on any link
- **QR Code** — Auto-generated QR code for every short link
- **Click Analytics** — Real-time dashboard tracking clicks per link
- **Delete Links** — Remove links you no longer need
- **JWT Authentication** — Secure login and registration
- **Light / Dark Theme** — Toggle between themes, preference saved locally

## Tech Stack

**Frontend** — React.js, CSS  
**Backend** — Node.js, Express.js  
**Database** — MongoDB (Mongoose)  
**Auth** — JSON Web Tokens (JWT)

## Project Structure

```
url-shortner/
├── url-shortener-server/
│   ├── config/        # Database connection
│   ├── controllers/   # Route logic
│   ├── middleware/    # JWT auth middleware
│   ├── models/        # Mongoose schemas
│   ├── routes/        # Express routes
│   ├── utils/         # Short ID generator
│   └── server.js
└── url-shortener-client/
    └── src/
        ├── components/  # Navbar, UrlForm, UrlCard, UrlList
        ├── context/     # Theme context
        ├── pages/       # Dashboard, Analytics, Login, Register
        ├── services/    # Axios API calls
        └── utils/       # Auth token helpers
```

## Getting Started

### Prerequisites
- Node.js
- MongoDB Atlas account

### Backend Setup

```bash
cd url-shortener-server
npm install
```

Create a `.env` file in the `url-shortener-server/` folder:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
BASE_URL=http://localhost:5000
```

```bash
npm start
```

### Frontend Setup

```bash
cd url-shortener-client
npm install
```

Create a `.env` file in the `url-shortener-client/` folder:

```
REACT_APP_API_URL=http://localhost:5000
```

```bash
npm start
```

App runs at `http://localhost:3000`

## Environment Variables

| Variable | Location | Description |
|---|---|---|
| `MONGO_URI` | url-shortener-server | MongoDB connection string |
| `JWT_SECRET` | url-shortener-server | Secret key for JWT signing |
| `BASE_URL` | url-shortener-server | Backend base URL |
| `REACT_APP_API_URL` | url-shortener-client | Backend API URL |

## License

MIT