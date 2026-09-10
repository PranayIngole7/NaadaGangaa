# NaadaGangaa 

NaadaGangaa is a modern, responsive full-stack web application designed for streaming, managing, and downloading high-quality audio files and album collections. Built with a modular Spring Boot 3 backend and a React single-page frontend, it provides an intuitive audio playback interface alongside a centralized admin control center.

---

## Key Features

* **Audio Streaming & Playback:** Built-in sticky global player supporting continuous audio playback, duration tracking, and file downloads.
* **Album & Single Management:** Categorize tracks into distinct albums with custom cover art or upload standalone single tracks.
* **User Authentication:** Integrated registration and login system with user session management.
* **Admin Control Center:** Streamlined dashboard to upload audio files (`.mp3`), configure metadata, assign tracks to albums, and manage thumbnails.
* **Responsive Architecture:** Clean directory-based component layout powered by React Router for fluid cross-page navigation.

---

## Tech Stack

* **Backend:** Java 21, Spring Boot 3.4, Spring Data JPA, H2 Database / MySQL
* **Frontend:** React 18, React Router v6, Axios, Vite
* **Styling:** Custom Modular CSS Architecture

---

## Local Development Setup

### 1. Prerequisites
* **Java:** JDK 21
* **Node.js:** v18+ and `npm`
* **Build Tool:** Maven 3.8+
---

### 2. Run the Backend (Spring Boot)
```bash
cd backend
JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64 mvn clean spring-boot:run
```
### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 3. Production Build (Single Jar Hosting)
#### 1. Build React production static files
```bash
cd frontend
npm run build
```

#### 2. Copy production assets into Spring Boot static folder
```bash
cp -r dist/* ../backend/src/main/resources/static/
```

#### 3. Build single executable JAR
```bash
cd ../backend
JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64 mvn clean package
```




