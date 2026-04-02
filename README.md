# 🎬 FilmoraX - Full-Stack Movie Streaming Platform

**FilmoraX** is a Netflix-inspired streaming platform designed with a focus on cinematic User Experience (UX), secure administrative workflows, and intelligent content discovery. Built as a **Capstone Project**, it demonstrates proficiency in the MERN ecosystem (MongoDB, Express, React, Node.js).

## 🔗 Live Demo: https://moviestreamingplatform-lps9.vercel.app/

-----

## 🚀 Key Features

  * **🧠 AI-Powered Recommendations:** A custom engine that analyzes library data to suggest personalized content, powered by **TensorFlow.js** integration.
  * **🔐 Secure Account Recovery:** End-to-end password reset workflow using **Nodemailer** with encrypted, time-sensitive token verification.
  * **Cinematic Discovery:** Integration with the **TVMaze API** for real-time trending content and metadata.
  * **Persistent Watchlist:** Full CRUD operations for user-specific movie lists, synced across devices via a dedicated MongoDB backend.
  * **Role-Based Access Control (RBAC):** Secure `ProtectedRoute` logic segregating standard users from the Administrative dashboard.
  * **Admin Command Center:** High-level dashboard for managing the global movie catalog, viewing user statistics, and auditing system data.

-----

To make the **FilmoraX** README truly professional, adding a visual representation of the repository's architecture is key. This helps other developers (and recruiters) quickly understand your project's modularity.

Insert this **Directory Structure** section right after the **System Architecture** section in your `README.md`:

---

## 📂 Directory Structure

```text
adithx2-moviestreamingplatform/
├── filmorax/                # FRONTEND (React 19 + Vite)
│   ├── src/
│   │   ├── components/      # UI: Admin, Navbar, MovieCard, ProtectedRoute
│   │   ├── pages/           # Views: Home, MovieDetails, Landing, Watchlist
│   │   ├── services/        # API Layer: axiosConfig, usersApi, movies, watchlist
│   │   ├── layout/          # RootLayout for consistent branding
│   │   ├── data/            # Local mock data & constants
│   │   └── App.jsx          # Centralized Route Management
│   ├── tailwind.config.js   # Style Configuration
│   └── vite.config.js       # Build Configuration
└── server/                  # BACKEND (Node.js/Express)
    ├── config/              # Database connection (db.js)
    ├── controllers/         # Business Logic: Auth, Movies, AI, Watchlist
    ├── middileware/         # Security: JWT Verification (authMiddleware.js)
    ├── models/              # MongoDB Schemas: User, Movie, Watchlist, AI
    ├── routers/             # Express API Endpoints mapping
    └── utils/               # Helpers: Token generation & Mailer logic
```

---

### **Why this structure is effective:**

* **Separation of Concerns:** By highlighting the `services/` folder in the frontend and the `controllers/` folder in the backend, you're showing that you don't write "spaghetti code"—you keep your API logic separate from your UI.
* **Security Placement:** Explicitly mentioning `middleware/` and `ProtectedRoute` proves that security was a foundational part of your build, not an afterthought.
* **Scalability:** This structure proves the app is "Production-Ready," meaning new features (like a "Social" or "Comments" section) could be added easily without breaking existing logic.
* 

## 🏗️ System Architecture

### 🎨 Frontend (`filmorax/`)

  * **Framework:** React 19 + Vite (for high-speed HMR and optimized builds).
  * **Routing:** React Router DOM v7 (Nested layouts and authentication guards).
  * **Styling:** Tailwind CSS 4 + Framer Motion (Glassmorphism UI and smooth transitions).
  * **API Layer:** Modular Axios configuration with centralized service files for scalability.

### ⚙️ Backend (`server/`)

  * **Runtime:** Node.js & Express.js.
  * **Database:** MongoDB with Mongoose (Schema-driven data modeling).
  * **Security:** JWT-based authentication with custom middleware for session persistence.
  * **Controllers:** Decoupled logic for Auth, Movies, AI Recommendations, and Watchlists.

-----

## 🔐 Security & Authentication

### **Automated Password Recovery Workflow**

FilmoraX implements a secure, industry-standard password reset system:

1.  **Request:** User submits a registered email via the `ForgotPassowd.jsx` component.
2.  **Token Generation:** Backend generates a unique, time-sensitive **JWT**.
3.  **SMTP Delivery:** Dispatched via **Nodemailer** using **Gmail App Passwords** for high deliverability.
4.  **Verification:** The `ResetPassword.jsx` view validates the token before allowing a database update.

-----

## 🛠️ Installation & Setup

1.  **Setup Backend:**

    ```bash
    cd server
    npm install
    # Create .env with the following:
    # PORT=5000
    # MONGODB_URI=your_uri
    # JWT_SECRET=your_secret
    # EMAIL_USER=your_email@gmail.com
    # EMAIL_PASS=xxxx xxxx xxxx xxxx (Google App Password)
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

**FilmoraX** marks the transition from foundational coding to professional software engineering. It successfully bridges a high-fidelity frontend with a robust, secured backend.

### 💡 Key Technical Milestones:

  * **Predictive Modeling:** Successfully implemented a client-server AI handshake to deliver personalized content dynamically.
  * **SMTP Architecture:** Engineered a robust mail-server connection, overcoming 535-Auth errors by implementing modern App Password protocols.
  * **State & Data Sync:** Mastered synchronization between external API data (TVMaze) and persistent MongoDB storage.
  * **Defensive UI Development:** Resolved complex rendering conflicts (Object-to-Child errors) to ensure a crash-resistant user interface.

-----

## 👤 Author

**Adith**

  * **GitHub:** https://github.com/adithx2
  * **Email:** adiths746@gmail.com

-----

*Developed as a comprehensive showcase of scalable, secure, and production-ready web application development.*
