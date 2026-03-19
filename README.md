<p align="center">
  <img src="frount/src/assets/Only_Logo_NoBackground.png" alt="Tunez Logo" width="120" />
</p>

<h1 align="center">🎵 Tunez</h1>

<p align="center">
  <strong>A modern, full-stack music streaming web application</strong><br/>
  Stream songs, explore collections, discover artists — all from the browser.
</p>

<p align="center">
  <a href="https://tunez-online.web.app"><img alt="Live Demo" src="https://img.shields.io/badge/🌐_Live_Demo-tunez--online.web.app-blueviolet?style=for-the-badge"/></a>
  <img alt="React 19" src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white"/>
  <img alt="Spring Boot 3.5" src="https://img.shields.io/badge/Spring_Boot-3.5-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"/>
  <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
  <img alt="Docker" src="https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white"/>
</p>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Endpoints](#-api-endpoints)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Developer](#-developer)
- [License](#-license)

---

## 🌟 Overview

**Tunez** is a full-stack music streaming platform built with **React 19** and **Spring Boot 3.5**, backed by **MongoDB Atlas**. It delivers a seamless, Spotify-inspired experience where users can browse songs, explore curated collections, discover artists, search across the entire catalog, and manage personal playlists — all wrapped in a sleek, responsive UI.

---

## 🔗 Live Demo

| Component       | URL                                                        |
| --------------- | ---------------------------------------------------------- |
| **Frontend**    | [tunez-online.web.app](https://tunez-online.web.app)       |
| **Backend API** | [tunez-2frv.onrender.com](https://tunez-2frv.onrender.com) |

> **Note:** The backend is hosted on Render's free tier and may take ~30 seconds to cold start on the first request.

---

## ✨ Features

### 🎧 Music Playback

- **Audio Streaming** — Stream songs directly in the browser with a custom audio player
- **Play / Pause / Seek** — Full playback controls with progress slider
- **Play All** — Queue and auto-play an entire song list
- **Previous / Next** — Navigate between songs in a queue
- **Auto-advance** — Automatically plays the next song when the current one ends

### 🏠 Home Dashboard

- **Quick Picks** — Horizontally scrollable song list with smooth carousel navigation
- **Daily Beat** — Featured collection updated daily
- **New Collection** — Discover the latest curated playlists
- **Collections For You** — Personalized collection recommendations
- **Artist Spotlight** — Browse popular artists with circular avatar cards

### 🔍 Universal Search

- **Real-time search** across songs, collections, and artists simultaneously
- **Categorized results** — Results are grouped by type for easy browsing
- **Live debounced input** — Search updates every 500ms as you type

### 📁 Collections & Playlists

- **Curated Collections** — Browse public, admin-curated playlists
- **Private Collections** — Create, manage, and add songs to your personal playlists
- **Add to Collection** — Add any currently playing song to your private collections
- **Collection Viewer** — Detailed view of collection contents with full playback controls

### 🗺️ Explorer

- **Discover** — Browse shuffled collections and artists to find something new
- **Category filtering** — Explore content organized by music categories
- **Top Search Collections** — Browse the most popular playlists
- **Popular Artists** — Discover trending artists

### 🔐 Authentication & Security

- **Multi-provider OAuth2** — One-click login via **Google** or **GitHub**
- **Username/Password** — Traditional account creation with password strength meter (zxcvbn)
- **JWT-based sessions** — Secure, stateless authentication with HTTP-only cookies
- **BCrypt hashing** — Industry-standard password encryption
- **Profile pictures** — Pulled automatically from OAuth provider

### 📱 Responsive Design

- **Mobile-first** — Fully responsive layout for phones, tablets, and desktops
- **Collapsible sidebar** — Auto-hides on mobile, toggle on desktop
- **Touch-friendly** — Optimized interactions for touch screens
- **Zoom prevention** — Disables browser zoom for consistent mobile UX

### ⚙️ User Settings

- **Profile management** — View profile picture and username
- **Account switching** — Switch between accounts seamlessly
- **Account deletion** — Full account removal with data cleanup
- **Logout** — Secure session termination

---

## 🛠️ Tech Stack

### Frontend

| Technology                | Purpose                                |
| ------------------------- | -------------------------------------- |
| **React 19**              | UI framework with hooks                |
| **Vite 6**                | Lightning-fast dev server & build tool |
| **Vanilla CSS**           | Custom responsive styling              |
| **Lottie React**          | Animated loading screen                |
| **react-h5-audio-player** | Audio playback component               |
| **zxcvbn**                | Password strength estimation           |
| **Firebase Hosting**      | Production deployment                  |

### Backend

| Technology              | Purpose                        |
| ----------------------- | ------------------------------ |
| **Spring Boot 3.5**     | REST API framework             |
| **Java 21**             | Runtime environment            |
| **Spring Security**     | Authentication & authorization |
| **Spring Data MongoDB** | Database ORM layer             |
| **JWT (jjwt 0.12.5)**   | Token-based authentication     |
| **OAuth2 Client**       | Google & GitHub login          |
| **Maven**               | Build & dependency management  |

### Database & Infrastructure

| Technology        | Purpose                          |
| ----------------- | -------------------------------- |
| **MongoDB Atlas** | Cloud-hosted NoSQL database      |
| **Docker**        | Containerized backend deployment |
| **Render**        | Backend cloud hosting            |
| **Firebase**      | Frontend static hosting          |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                        Client                           │
│              React 19 + Vite (SPA)                      │
│         Hosted on Firebase Hosting                      │
└──────────────────────┬──────────────────────────────────┘
                       │  HTTPS REST API
                       ▼
┌─────────────────────────────────────────────────────────┐
│                    Backend API                          │
│             Spring Boot 3.5 (Java 21)                   │
│           Hosted on Render (Docker)                     │
│                                                         │
│   ┌─────────────┐  ┌──────────────┐  ┌──────────────┐  │
│   │ Controllers  │  │  Services    │  │   Security   │  │
│   │  • Song      │  │  • Song      │  │  • JWT       │  │
│   │  • Artist    │  │  • Artist    │  │  • OAuth2    │  │
│   │  • Collection│  │  • Collection│  │  • CORS      │  │
│   │  • User      │  │  • User      │  │  • Filters   │  │
│   │  • Search    │  │  • Search    │  │              │  │
│   │  • Private   │  │  • Private   │  │              │  │
│   │    Collection│  │    Collection│  │              │  │
│   └─────────────┘  └──────────────┘  └──────────────┘  │
└──────────────────────┬──────────────────────────────────┘
                       │  MongoDB Driver
                       ▼
┌─────────────────────────────────────────────────────────┐
│                   MongoDB Atlas                         │
│                                                         │
│   ┌──────────┐ ┌───────────┐ ┌────────────┐            │
│   │  Songs   │ │Collections│ │   Users    │            │
│   ├──────────┤ ├───────────┤ ├────────────┤            │
│   │  Artists │ │  Private  │ │            │            │
│   │          │ │Collections│ │            │            │
│   └──────────┘ └───────────┘ └────────────┘            │
└─────────────────────────────────────────────────────────┘
```

---

## 📂 Project Structure

```
Tunez/
├── 📁 Tunez/                          # Backend (Spring Boot)
│   ├── 📁 src/main/java/com/muthu/Tunez/
│   │   ├── 📁 controller/            # REST API endpoints
│   │   │   ├── SongsController.java
│   │   │   ├── ArtistsController.java
│   │   │   ├── CollectionController.java
│   │   │   ├── PrivateCollectionController.java
│   │   │   ├── SearchController.java
│   │   │   └── UserController.java
│   │   ├── 📁 service/               # Business logic
│   │   │   ├── SongsService.java
│   │   │   ├── ArtistsService.java
│   │   │   ├── CollectionsService.java
│   │   │   ├── PrivateCollectionService.java
│   │   │   ├── SearchService.java
│   │   │   ├── UserService.java
│   │   │   ├── JWTService.java
│   │   │   └── MyUserDetailsService.java
│   │   ├── 📁 model/                 # Data models
│   │   │   ├── Songs.java
│   │   │   ├── Artists.java
│   │   │   ├── Collections.java
│   │   │   ├── PrivateCollection.java
│   │   │   ├── Users.java
│   │   │   └── UserPrincipal.java
│   │   ├── 📁 Repo/                  # MongoDB repositories
│   │   │   ├── SongsRepo.java
│   │   │   ├── ArtistsRepo.java
│   │   │   ├── CollectionsRepo.java
│   │   │   ├── PrivateCollectionRepo.java
│   │   │   └── UsersRepo.java
│   │   └── 📁 configuration/         # Security & config
│   │       ├── AuthConfiguration.java
│   │       ├── CorsConfiguration.java
│   │       ├── JwtFilter.java
│   │       ├── JwtAuthFilter.java
│   │       └── OAuth2SuccessHandler.java
│   ├── Dockerfile
│   └── pom.xml
│
├── 📁 frount/                         # Frontend (React + Vite)
│   ├── 📁 src/
│   │   ├── 📁 Components/
│   │   │   ├── Land.jsx               # Main layout shell
│   │   │   ├── Head.jsx               # Header & search bar
│   │   │   ├── Menu.jsx               # Sidebar navigation
│   │   │   ├── Content.jsx            # Page router & state manager
│   │   │   ├── Home.jsx               # Homepage with quick picks
│   │   │   ├── Explorer.jsx           # Explore page
│   │   │   ├── Category.jsx           # Category filters
│   │   │   ├── Search.jsx             # Search results page
│   │   │   ├── PlaySong.jsx           # Music player component
│   │   │   ├── AudioSlider.jsx        # Custom audio progress bar
│   │   │   ├── Song.jsx               # Song card component
│   │   │   ├── Collection.jsx         # Collection card component
│   │   │   ├── Collections.jsx        # Collections page
│   │   │   ├── CollectionsViewer.jsx   # Collection detail viewer
│   │   │   ├── PrivateCollections.jsx  # Private playlist component
│   │   │   ├── Artist.jsx             # Artist card component
│   │   │   ├── Login.jsx              # Auth page (login/register)
│   │   │   ├── Setings.jsx            # User settings page
│   │   │   └── Loader.jsx             # Loading animation
│   │   ├── 📁 assets/                 # Images, icons, animations
│   │   ├── App.jsx                    # Root component
│   │   └── main.jsx                   # Entry point
│   ├── .env.development               # Dev API URL
│   ├── .env.production                # Prod API URL
│   ├── firebase.json                  # Firebase hosting config
│   ├── vite.config.js
│   └── package.json
│
├── Tunez-Data.xlsx                     # Song metadata spreadsheet
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **Java** 21
- **Maven** 3.9+
- **MongoDB** Atlas cluster (or local MongoDB)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/muthukumaranarc/Tunez.git
cd Tunez
```

### 2️⃣ Backend Setup

```bash
cd Tunez

# Configure your MongoDB and OAuth credentials in:
# src/main/resources/application.properties

# Build and run
./mvnw spring-boot:run
```

The backend will start on **http://localhost:7001**

### 3️⃣ Frontend Setup

```bash
cd frount

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will start on **http://localhost:5173**

### 4️⃣ Environment Variables

**Frontend** (`frount/.env.development`):

```env
VITE_API_URL=http://localhost:7001
```

**Backend** (`Tunez/src/main/resources/application.properties`):

```properties
spring.data.mongodb.uri=<your-mongodb-connection-string>
spring.data.mongodb.database=Tunez

# OAuth2 credentials
spring.security.oauth2.client.registration.google.client-id=<your-google-client-id>
spring.security.oauth2.client.registration.google.client-secret=<your-google-secret>
spring.security.oauth2.client.registration.github.client-id=<your-github-client-id>
spring.security.oauth2.client.registration.github.client-secret=<your-github-secret>
```

---

## 📡 API Endpoints

### Songs

| Method   | Endpoint                | Description               |
| -------- | ----------------------- | ------------------------- |
| `GET`    | `/song/get/all/{limit}` | Get all songs (paginated) |
| `GET`    | `/song/get/{id}`        | Get song by ID            |
| `GET`    | `/song/play/{id}`       | Stream audio by song ID   |
| `GET`    | `/song/get/image/{id}`  | Get song cover art        |
| `GET`    | `/song/shuffle/{input}` | Shuffle songs by input    |
| `POST`   | `/song/create`          | Create a new song         |
| `DELETE` | `/song/delete/{id}`     | Delete a song             |

### Collections

| Method | Endpoint                        | Description               |
| ------ | ------------------------------- | ------------------------- |
| `GET`  | `/collection/get/all/{limit}`   | Get all collections       |
| `GET`  | `/collection/get/DailyBeat`     | Get Daily Beat collection |
| `GET`  | `/collection/get/NewCollection` | Get newest collection     |

### Artists

| Method | Endpoint                  | Description     |
| ------ | ------------------------- | --------------- |
| `GET`  | `/artist/get/all/{limit}` | Get all artists |

### Search

| Method | Endpoint          | Description                         |
| ------ | ----------------- | ----------------------------------- |
| `GET`  | `/search/{query}` | Search songs, collections & artists |

### Private Collections 🔒

| Method | Endpoint                      | Description                    |
| ------ | ----------------------------- | ------------------------------ |
| `GET`  | `/privateCollection/get/all`  | Get user's private collections |
| `POST` | `/privateCollection/create`   | Create a private collection    |
| `POST` | `/privateCollection/add/song` | Add song to private collection |

### Users 🔒

| Method   | Endpoint              | Description             |
| -------- | --------------------- | ----------------------- |
| `POST`   | `/user/create`        | Register new user       |
| `POST`   | `/user/loginUser`     | Login with credentials  |
| `GET`    | `/user/get/user`      | Get current user info   |
| `GET`    | `/user/profile-pic`   | Get profile picture URL |
| `DELETE` | `/user/delete`        | Delete user account     |
| `DELETE` | `/user/delete/cookie` | Logout (clear session)  |

> 🔒 = Requires authentication (JWT cookie)

---

## 🐳 Deployment

### Docker (Backend)

```bash
cd Tunez

# Build the JAR
./mvnw clean package -DskipTests

# Build Docker image
docker build -t tunez-backend .

# Run container
docker run -p 7001:7001 tunez-backend
```

### Firebase (Frontend)

```bash
cd frount

# Build for production
npm run build

# Deploy to Firebase
firebase deploy
```

### Production Architecture

| Component | Platform         | URL                       |
| --------- | ---------------- | ------------------------- |
| Frontend  | Firebase Hosting | `tunez-online.web.app`    |
| Backend   | Render (Docker)  | `tunez-2frv.onrender.com` |
| Database  | MongoDB Atlas    | Cloud cluster             |

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 👨‍💻 Developer

<p align="center">
  <strong>Muthukumaran</strong><br/>
  <a href="https://muthukumaran-portfolio.web.app">📄 Portfolio</a> •
  <a href="https://github.com/muthukumaranarc">🐙 GitHub</a>
</p>

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  <sub>Built with ❤️ by Muthukumaran</sub><br/>
  <sub>⭐ Star this repo if you found it useful!</sub>
</p>
