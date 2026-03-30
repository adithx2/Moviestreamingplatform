This is the final, comprehensive **README.md** precisely mapped to your project's folder structure. It clearly separates the **Frontend (filmorax)** from the **Backend (server)**, creating a highly professional presentation for your Capstone Project.

-----

# 🎬 FilmoraX - Full-Stack Movie Streaming Ecosystem

**FilmoraX** is a Netflix-inspired streaming platform designed with a focus on cinematic User Experience (UX), secure administrative workflows, and efficient state management. Built as a **Capstone Project**, it demonstrates proficiency in the MERN ecosystem (MongoDB, Express, React, Node.js).

## 🔗 Live Demo: moviestreamingplatform-lps9.vercel.app

## 🔗 Github Repo: https://github.com/adithx2/Moviestreamingplatform


-----

## 🚀 Key Features

  * **Cinematic Discovery:** Integration with the **TVMaze API** for real-time trending content.
  * **Persistent Watchlist:** Full CRUD operations for user-specific movie lists, synced across devices via the backend.
  * **Role-Based Access Control (RBAC):** Secure `ProtectedRoute` logic segregating standard users from the Administrative dashboard.
  * **Admin Command Center:** High-level dashboard for managing the global movie catalog, viewing user statistics, and auditing data.
  * **Advanced Search:** Query-based filtering for movies and TV shows with instant UI updates.

-----

## 🏗️ System Architecture

### 🎨 Frontend (filmorax/)

  * **Framework:** React 19 + Vite (for high-speed development and HMR).
  * **Routing:** React Router DOM v7 (Nested layouts and authentication guards).
  * **Styling:** Tailwind CSS 4 + Framer Motion (for smooth transitions and glassmorphism).
  * **API Layer:** Modular Axios configuration with centralized service files.

### ⚙️ Backend (server/)

  * **Runtime:** Node.js & Express.js.
  * **Database:** MongoDB with Mongoose (Schema-driven data modeling).
  * **Security:** JWT-based authentication (JSON Web Tokens) with custom middleware.
  * **Controllers:** Decoupled logic for Auth, Movies, Ratings, and Watchlists.

-----

## 📂 Directory Structure

```text
adithx2-moviestreamingplatform/
├── filmorax/                # FRONTEND (React)
│   ├── src/
│   │   ├── components/      # UI: Admin, Navbar, MovieCard, Search, ProtectedRoute
│   │   ├── pages/           # Views: Home, MovieDetails, Landing, Watchlist
│   │   ├── services/        # API calls: usersApi.js, movies.js, watchlistApi.js
│   │   ├── layout/          # RootLayout for consistent branding
│   │   └── App.jsx          # Centralized Route Management
│   └── vite.config.js       # Build Configuration
└── server/                  # BACKEND (Node.js/Express)
    ├── config/              # Database connection (db.js)
    ├── controllers/         # Logic for Auth, Movies, Ratings, Watchlist
    ├── middileware/         # JWT Verification (authMiddileware.js)
    ├── models/              # Schemas: User, Movie, Watchlist, Rating
    ├── routers/             # API Endpoints mapping
    └── utils/               # Helpers: generateToken.js
```

-----

## 🛠️ Installation & Setup

1.  **Setup Backend:**

    ```bash
    cd server
    npm install
    # Create .env with MONGODB_URI, JWT_SECRET, and PORT
    npm start
    ```

2.  **Setup Frontend:**

    ```bash
    cd ../filmorax
    npm install
    npm run dev
    ```

-----

## 🎓 Capstone Project Conclusion

**FilmoraX** marks a transition from foundational coding to professional software engineering. It successfully bridges a high-fidelity frontend with a robust, secured backend.

### 💡 Key Technical Milestones:

  * **State & Data Sync:** Mastered the synchronization between external API data (TVMaze) and persistent MongoDB storage.
  * **Security Architecture:** Implemented an end-to-end authentication flow using JWT, from server-side token generation to client-side interceptors.
  * **Defensive UI Development:** Resolved complex rendering conflicts (e.g., Object-to-Child errors) to ensure a crash-resistant user interface.
  * **Modular Scalability:** Organized the project into clear service layers, ensuring the platform is ready for future features like AI-based recommendations or YouTube trailer integration.

-----

##  Author

**Adith**

  * **GitHub:** https://github.com/adithx2/Moviestreamingplatform

  * **Email:** adiths746@gmail.com


FilmoraX is a professional-grade Capstone Project designed to bridge the gap between frontend aesthetics and complex data management. By integrating a high-fidelity Netflix-style UI with a secure Administrative Dashboard, this project demonstrates a mastery of the modern React ecosystem.



Key Technical Highlights:



Architecture: Implemented a modular, service-oriented structure using React 19 and Vite.



Security: Engineered Role-Based Access Control (RBAC) via protected routes to segregate Admin and User environments.



Data Integrity: Developed defensive logic to synchronize TVMaze API data with persistent localStorage states.



UI/UX: Leveraged Tailwind CSS 4 to ensure a mobile-first, cinematic experience with seamless navigation.



This project serves as a comprehensive showcase of my ability to build scalable, secure, and production-ready web applications.