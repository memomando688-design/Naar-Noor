# 🚀 Getting Started

This guide will help you set up the Naar & Noor project locally.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.0.0 or higher ([Download](https://nodejs.org/))
- **.NET SDK** 8.0 or higher ([Download](https://dotnet.microsoft.com/download))
- **Git** ([Download](https://git-scm.com/))
- **npm** or **pnpm** (comes with Node.js)

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/Mostafa-SAID7/Naar-Noor.git
cd Naar-Noor
```

### 2. Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd naar-noor
npm install
```

#### Running the Frontend

**Development Mode:**
```bash
npm run dev
```
The application will be available at `http://localhost:4200`

**Production Build:**
```bash
npm run build
```

**Serve Production Build:**
```bash
npm run serve
```

### 3. Backend Setup

Navigate to the backend directory:

```bash
cd ../api-server
```

#### Restore Dependencies

```bash
dotnet restore
```

#### Running the Backend

**Development Mode:**
```bash
./run-dev.sh
```
Or on Windows:
```bash
dotnet run --project src/NaarNoor.API/NaarNoor.API.csproj
```

The API will be available at `http://localhost:5000`

#### Database Setup

The application uses Entity Framework Core with SQL Server. Migrations are automatically applied on startup.

To manually apply migrations:
```bash
dotnet ef database update --project src/NaarNoor.Infrastructure
```

## Verification

### Frontend Check
- Open `http://localhost:4200` in your browser
- You should see the Naar & Noor homepage

### Backend Check
- Open `http://localhost:5000/swagger` in your browser
- You should see the Swagger API documentation

## Environment Configuration

### Frontend
No additional configuration needed for development.

### Backend
Create an `appsettings.Development.json` file in `api-server/src/NaarNoor.API/`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=.;Database=NaarNoor;Trusted_Connection=true;"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information"
    }
  }
}
```

## Troubleshooting

### Port Already in Use
If port 4200 or 5000 is already in use:

**Frontend:**
```bash
npm run dev -- --port 4300
```

**Backend:**
```bash
dotnet run --project src/NaarNoor.API/NaarNoor.API.csproj --urls "http://localhost:5001"
```

### Database Connection Issues
- Ensure SQL Server is running
- Check the connection string in `appsettings.json`
- Verify database permissions

### Node Modules Issues
```bash
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

- Read the [Project Structure](./PROJECT_STRUCTURE.md) guide
- Check the [API Documentation](./API.md)
- Review the [Frontend Guide](./FRONTEND.md)
- Explore the [Backend Guide](./BACKEND.md)

---

**Need Help?** Check the [Troubleshooting](./TROUBLESHOOTING.md) guide.
