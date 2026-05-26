# 🍽️ Naar & Noor - Documentation

Welcome to the Naar & Noor project documentation. This is a full-stack restaurant management application built with modern technologies.

## 📚 Documentation Index

### 🎯 Start Here
- **[Run Both Apps](./RUN_BOTH_APPS.md)** ⭐ **START HERE** - Complete guide to run frontend & backend
- **[Getting Started](./GETTING_STARTED.md)** - Quick setup and installation guide

### 📖 Development Guides
- **[Project Structure](./PROJECT_STRUCTURE.md)** - Overview of the codebase organization
- **[Architecture](./ARCHITECTURE.md)** - System design and technical architecture
- **[Frontend Guide](./FRONTEND.md)** - Angular frontend development guide
- **[Backend Guide](./BACKEND.md)** - .NET backend development guide

### 📚 Reference
- **[API Documentation](./API.md)** - REST API endpoints and usage
- **[Database](./DATABASE.md)** - Database schema and migrations
- **[Deployment](./DEPLOYMENT.md)** - Deployment and production setup
- **[Contributing](./CONTRIBUTING.md)** - Contribution guidelines
- **[Troubleshooting](./TROUBLESHOOTING.md)** - Common issues and solutions

## 🚀 Quick Start

### ⚡ Fastest Way (5 Minutes)

**See [Run Both Apps](./RUN_BOTH_APPS.md) for complete guide**

### Prerequisites
- Node.js 18+ (for frontend)
- .NET 8.0 SDK (for backend)
- SQL Server
- Git

### Terminal 1 - Backend
```bash
cd api-server
dotnet restore
dotnet run --project src/NaarNoor.API/NaarNoor.API.csproj
```
✅ Backend runs at: `http://localhost:5000`

### Terminal 2 - Frontend
```bash
cd naar-noor
npm install
npm run dev
```
✅ Frontend runs at: `http://localhost:4200`

### Verify Connection
- Backend: `http://localhost:5000/swagger`
- Frontend: `http://localhost:4200`
- API Health: `http://localhost:5000/health`

## 📋 Project Overview

**Naar & Noor** is a comprehensive restaurant management system featuring:

- 🎨 Modern Angular frontend with Tailwind CSS
- 🔧 Robust .NET 8 backend with clean architecture
- 📊 Entity Framework Core for data management
- 🔐 RESTful API with Swagger documentation
- 📱 Responsive design for all devices

## 🏗️ Tech Stack

### Frontend
- **Framework**: Angular 18
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Build Tool**: Angular CLI

### Backend
- **Framework**: ASP.NET Core 8
- **ORM**: Entity Framework Core
- **Database**: SQL Server
- **Architecture**: Clean Architecture (CQRS pattern)

## 📞 Support

For questions or issues, please refer to the [Troubleshooting](./TROUBLESHOOTING.md) guide or check the relevant documentation section.

---

**Last Updated**: May 2026
