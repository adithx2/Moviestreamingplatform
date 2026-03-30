# 🎬 FilmoraX - High-Performance Streaming Dashboard

**FilmoraX** is a Netflix-inspired movie streaming platform designed with a focus on premium User Experience (UX), secure administrative workflows, and efficient state management. Built with **React 19** and **Vite**, it leverages modern frontend patterns to provide a seamless cinematic interface.



## Live Demo : moviestreamingplatform-lps9.vercel.app

-----


##  Features & Functionality


  * **Dynamic Discovery:** Real-time data synchronization with the **TVMaze API** for trending movies and TV shows.

  * **Intelligent Search:** Client-side filtering and query-string based search logic for instant results.

  * **Watchlist Management:** A persistent user-specific watchlist using `localStorage` and a dedicated API service.

  * **Premium Visuals:** Glassmorphism navigation, hero banners, and high-fidelity movie detail pages with blurred backdrop filters.



###  Administration & Security



  * **Role-Based Access Control (RBAC):** Protected routes using a `ProtectedRoute` component that validates user roles before granting access to sensitive views.

  * **Admin Console:** A comprehensive dashboard featuring:

      * **Real-time Stats:** Visual counters for Users, Movies, and Watchlists.

      * **Inventory Management:** Full CRUD (Create, Read, Update, Delete) capabilities for the movie library.

      * **User Auditing:** A tabulated view of registered users and their credentials.



-----



## 🛠 Technical Architecture



### Frontend Stack



  * **Framework:** React 19 (Functional Components & Hooks)

  * **Routing:** React Router DOM v7 (Nested layouts & Protected routes)

  * **Styling:** Tailwind CSS 4 (Utility-first, responsive grid system)

  * **Animations:** Framer Motion for smooth transitions

  * **State Persistence:** Synchronized `localStorage` for authentication tokens and user sessions.



### API Integration Logic



The application follows a modular service-oriented architecture:



  * `usersApi.js`: Handles authentication logic (Login/Logout/Signup).

  * `movies.js`: Manages content retrieval and administrative CRUD operations.

  * `watchlistApi.js`: Interfaces with the watchlist database/storage.



-----



## 📂 Directory Structure



```text

filmorax/

├── src/

│   ├── components/       # UI Components (Admin, Navbar, MovieCard, Search)

│   ├── layout/           # RootLayout for shared UI state

│   ├── pages/            # View-level components (Home, MovieDetails, Watchlist)

│   ├── services/         # API abstraction layer (Axios instances)

│   ├── App.jsx           # Route definitions & Protected Route wrapping

│   └── main.jsx          # Entry point & Toast notification provider

├── public/               # Static assets

└── tailwind.config.js    # Design system configuration

```



-----



## 🔧 Installation & Deployment



1.  **Clone & Enter Directory:**

    ```bash

    git clone https://github.com/your-username/filmorax.git

    cd filmorax

    ```

2.  **Environment Setup:**

    Create a `.env` file in the root directory for any API base URLs.

3.  **Install Dependencies:**

    ```bash

    npm install

    ```

4.  **Local Development:**

    ```bash

    npm run dev

    ```

5.  **Production Build:**

    ```bash

    npm run build

    ```



-----







### 📜 License



This project is for educational purposes. All movie data and images are provided by the TVMaze API.



-----



##  Author



**Adith**

   // GitHub:(https://github.com/adithx2/   Moviestreamingplatform)

  //Email:** adiths746@gmail.com



FilmoraX is a professional-grade Capstone Project designed to bridge the gap between frontend aesthetics and complex data management. By integrating a high-fidelity Netflix-style UI with a secure Administrative Dashboard, this project demonstrates a mastery of the modern React ecosystem.



Key Technical Highlights:



Architecture: Implemented a modular, service-oriented structure using React 19 and Vite.



Security: Engineered Role-Based Access Control (RBAC) via protected routes to segregate Admin and User environments.



Data Integrity: Developed defensive logic to synchronize TVMaze API data with persistent localStorage states.



UI/UX: Leveraged Tailwind CSS 4 to ensure a mobile-first, cinematic experience with seamless navigation.



This project serves as a comprehensive showcase of my ability to build scalable, secure, and production-ready web applications.