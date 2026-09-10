# NaadaGangaa Backend Service 

The backend service for **NaadaGangaa**—a Java 21 & Spring Boot 3 REST API providing audio streaming, static media hosting, user authentication, and album/song metadata management.

---

## System Architecture

The application follows a layered **MVC Architecture** with Spring Data JPA for persistence and Spring Web for RESTful endpoints and static asset serving.

```mermaid
flowchart TD
    %% Frontend Tier
    subgraph Frontend [Presentation Layer]
        React[React Frontend<br/>Songs, Albums, Admin, Auth UI]
    end

    %% Backend Tier
    subgraph Backend [Application Layer: Spring Boot API]
        direction TB
        subgraph Controllers [REST Controllers]
            AuthCtrl[Auth XML/Controller]
            SongCtrl[Song Controller]
            AlbumCtrl[Album Controller]
        end
        JPA[JPA Repositories]
        Controllers --> JPA
    end

    %% Data Tiers
    subgraph DatabaseTier [Storage Layer: Relational]
        DB[(H2 / MySQL Database<br/>User, Song, Album, Artist Tables)]
    end

    subgraph StorageTier [Storage Layer: File System]
        UploadsDir["uploads/ Directory<br/>(/uploads/songs/, /uploads/albums/)"]
    end

    %% Communication Interfaces
    React -->|HTTP / REST API| Controllers
    JPA -->|JDBC Connection| DB
    DB -.->|Local Static Media Mapping| UploadsDir
```
---

## End-to-End Execution Flow

### 1. File Upload Execution Flow (MP3 / Thumbnails)
```mermaid
sequenceDiagram
    autonumber
    actor Client as Client / Admin
    participant Controller as SongController
    participant FS as Local File System
    participant JPA as Song Entity & Repo
    participant DB as Database (H2/MySQL)

    Client->>Controller: POST /api/songs/upload<br/>(Multipart: Audio + Metadata)
    Controller->>FS: Save binary file<br/>to /uploads/songs/
    Note over Controller: Construct relative path<br/>(e.g., "/uploads/songs/song_123.mp3")
    Controller->>JPA: Pass entity metadata & file path
    JPA->>DB: Persist metadata & path
    DB-->>Client: Return success JSON<br/>(Song ID & Playback URL)
```
---

### 2. Audio Streaming & Media Serving Flow
```mermaid
sequenceDiagram
    autonumber
    actor Client as Client Browser
    participant WebConfig as WebConfig (ResourceHandler)
    participant FS as Local File System
    participant Player as HTML5 Audio Player

    Client->>WebConfig: Requests GET /uploads/songs/song_123.mp3
    Note over WebConfig: Map "/uploads/" path<br/>to local disk "file:uploads/"
    WebConfig->>FS: Fetch file payload
    FS-->>Player: Stream audio bytes directly<br/>to client HTML5 audio player
```
---

### 3. Client Navigation Route Forwarding Flow
```mermaid
sequenceDiagram
    autonumber
    actor Client as Client Browser<br/>(Page Refresh on /albums or /admin)
    participant WebCtrl as WebController (Spring Boot)
    participant Fwd as Route Forwarding
    participant React as React Router (SPA)
    participant UI as Rendered UI

    Client->>WebCtrl: HTTP GET /albums
    WebCtrl->>Fwd: Intercept non-API, non-static GET routes
    Fwd->>React: Forward to "forward:/index.html"
    Note over React: React Router parses window URL<br/>and handles internal routing
    React->>UI: Render targeted component view
```
---

## Database Schema Relationships
```mermaid
erDiagram
    USER {
        int id PK
        string username
        string email
        string password
    }

    SONG {
        int id PK
        string title
        int duration
        string file
        int album_id FK
        int user_id FK
    }

    ALBUM {
        int id PK
        string title
        string thumbnail
    }

    %% Relationships
    USER ||--o{ SONG : "creates / owns"
    ALBUM o{--|{ SONG : "contains"
```
---

