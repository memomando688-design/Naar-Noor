# 🏗️ Architecture

This document describes the overall architecture of the Naar & Noor application.

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Client Browser                           │
│              (Angular 18 + Tailwind CSS)                    │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTP/REST
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              ASP.NET Core 8 API Server                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              API Layer (Controllers)                 │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │    Application Layer (CQRS Commands/Queries)         │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Domain Layer (Business Entities)             │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Infrastructure Layer (EF Core, Database Access)     │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────────────────┘
                     │ SQL
                     ▼
        ┌────────────────────────────┐
        │   SQL Server Database      │
        │  (Entity Framework Core)   │
        └────────────────────────────┘
```

## Backend Architecture

### Clean Architecture Layers

#### 1. **API Layer** (`NaarNoor.API`)
- **Responsibility**: Handle HTTP requests and responses
- **Components**:
  - Controllers (REST endpoints)
  - Middleware
  - Configuration
- **Dependencies**: Application layer

#### 2. **Application Layer** (`NaarNoor.Application`)
- **Responsibility**: Business logic and use cases
- **Pattern**: CQRS (Command Query Responsibility Segregation)
- **Components**:
  - Commands (write operations)
  - Queries (read operations)
  - Handlers (command/query processing)
  - Validators (input validation)
- **Dependencies**: Domain layer

#### 3. **Domain Layer** (`NaarNoor.Domain`)
- **Responsibility**: Core business entities and rules
- **Components**:
  - Entities (Chef, MenuItem, Reservation, Review, ContactInquiry)
  - Enums (MenuCategory, ReservationStatus)
  - Base classes
- **Dependencies**: None (no external dependencies)

#### 4. **Infrastructure Layer** (`NaarNoor.Infrastructure`)
- **Responsibility**: Data access and external services
- **Components**:
  - DbContext (Entity Framework Core)
  - Entity configurations
  - Database migrations
  - Data seeding
- **Dependencies**: Domain layer

### CQRS Pattern

The application uses CQRS to separate read and write operations:

```
┌─────────────────────────────────────────────────────────┐
│                    Request                              │
└────────────────┬──────────────────────────────────────┘
                 │
        ┌────────┴────────┐
        │                 │
        ▼                 ▼
    ┌────────┐        ┌────────┐
    │ Command│        │ Query  │
    │(Write) │        │(Read)  │
    └────┬───┘        └───┬────┘
         │                │
         ▼                ▼
    ┌────────────┐    ┌────────────┐
    │ Handler    │    │ Handler    │
    │ (Process)  │    │ (Process)  │
    └────┬───────┘    └───┬────────┘
         │                │
         ▼                ▼
    ┌────────────────────────────┐
    │   Database / Domain Logic  │
    └────────────────────────────┘
```

### Data Flow

1. **Request** → API Controller
2. **Validation** → Validator
3. **Processing** → Command/Query Handler
4. **Database** → Entity Framework Core
5. **Response** → JSON

## Frontend Architecture

### Component Hierarchy

```
App Component
├── Header Component
├── Main Content
│   ├── Hero Section
│   ├── About Section
│   ├── Menu Section
│   ├── Chefs Section
│   ├── Reservations Section
│   ├── Reviews Section
│   ├── Locations Section
│   ├── Blog Section
│   └── Category Section
└── Footer Component
```

### Service Layer

```
┌──────────────────────────────────┐
│      Components                  │
└────────────┬─────────────────────┘
             │
             ▼
┌──────────────────────────────────┐
│      Services                    │
│  - API Service                   │
│  - Dropdown Manager Service      │
└────────────┬─────────────────────┘
             │
             ▼
┌──────────────────────────────────┐
│      Backend API                 │
└──────────────────────────────────┘
```

## Database Schema

### Core Entities

#### Chef
```
- Id (PK)
- Name
- Specialty
- Bio
- ImageUrl
- CreatedAt
- UpdatedAt
```

#### MenuItem
```
- Id (PK)
- Name
- Description
- Price
- Category (Enum)
- ImageUrl
- IsAvailable
- CreatedAt
- UpdatedAt
```

#### Reservation
```
- Id (PK)
- GuestName
- Email
- PhoneNumber
- ReservationDate
- NumberOfGuests
- SpecialRequests
- Status (Enum)
- CreatedAt
- UpdatedAt
```

#### Review
```
- Id (PK)
- GuestName
- Rating
- Comment
- IsApproved
- CreatedAt
- UpdatedAt
```

#### ContactInquiry
```
- Id (PK)
- Name
- Email
- Subject
- Message
- CreatedAt
```

## API Endpoints

### Chefs
- `GET /api/chefs` - Get all chefs

### Menu Items
- `GET /api/menu` - Get all menu items

### Reservations
- `GET /api/reservations` - Get all reservations
- `POST /api/reservations` - Create new reservation

### Reviews
- `GET /api/reviews` - Get approved reviews

### Contact
- `POST /api/contact` - Submit contact inquiry

### Health
- `GET /health` - Health check endpoint

## Technology Stack

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| .NET | 8.0 | Framework |
| ASP.NET Core | 8.0 | Web API |
| Entity Framework Core | 8.0 | ORM |
| SQL Server | Latest | Database |
| Swagger | 6.6.2 | API Documentation |

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Angular | 18 | Framework |
| TypeScript | 5.5 | Language |
| Tailwind CSS | 3.4 | Styling |
| RxJS | 7.8 | Reactive Programming |

## Security Considerations

1. **Input Validation**: All inputs validated on both client and server
2. **CORS**: Configured for cross-origin requests
3. **Error Handling**: Centralized error handling
4. **Data Protection**: Sensitive data handled securely

## Performance Optimization

1. **Frontend**:
   - Lazy loading of components
   - Tailwind CSS for optimized styling
   - Angular's change detection optimization

2. **Backend**:
   - Entity Framework Core query optimization
   - Async/await for non-blocking operations
   - Caching strategies

## Deployment Architecture

```
┌─────────────────────────────────────┐
│      Load Balancer / CDN            │
└────────────┬────────────────────────┘
             │
    ┌────────┴────────┐
    │                 │
    ▼                 ▼
┌─────────┐       ┌─────────┐
│Frontend │       │Backend  │
│ (SPA)   │       │ (API)   │
└────┬────┘       └────┬────┘
     │                 │
     └────────┬────────┘
              │
              ▼
        ┌──────────────┐
        │  Database    │
        │ (SQL Server) │
        └──────────────┘
```

---

For implementation details, see the [Backend Guide](./BACKEND.md) and [Frontend Guide](./FRONTEND.md).
