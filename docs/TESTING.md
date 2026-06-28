# Testing Guide

## Quick Start

### Backend Tests

Run all backend tests with coverage:
```bash
cd api-server
dotnet test --collect:"XPlat Code Coverage" --settings:../coverlet.runsettings
```

### Frontend Tests

Run frontend tests:
```bash
cd naar-noor
npm run test:ci
```

## Test Structure

### Backend (NaarNoor)
- **Domain Tests** - Entity validation, business rules
- **Application Tests** - Command handlers, query handlers, validators
- **Infrastructure Tests** - Repository, database, persistence
- **API Tests** - Endpoint integration, authorization, exception handling

### Frontend (Angular)
- **Services** - HTTP communication, caching
- **Components** - State management, user interactions
- **E2E** - Complete workflows (Cypress)

## Coverage Requirements

| Layer | Threshold | Status |
|-------|-----------|--------|
| Domain | 85% | ✅ 88.5% |
| Application | 82% | ⚠️ 78.57% (needs 3.43% increase) |
| Infrastructure | 78% | ✅ 78.33% |
| API | 80% | ✅ 82.15% |
| Services | 80% | ⏳ In Progress |
| Components | 75% | ⏳ In Progress |

## Running Coverage Validation

```bash
python scripts/validate-coverage.py --backend-dir api-server/tests
```

## Property-Based Testing

Uses FsCheck for backend tests. Each property test runs 100 iterations with random inputs.

Example:
```csharp
[Property(MaxTest = 100)]
public async Task Property_CreateOperation_PersistsValidChef(string name, string spec)
{
    // Arrange, Act, Assert
}
```

## Pre-Commit Hooks

Tests run automatically before commit:
```bash
git commit -m "message"  # Triggers pre-commit hook
```

Bypass (not recommended):
```bash
git commit --no-verify
```

## Troubleshooting

### Tests not running
- Ensure dotnet SDK 8.0+ installed: `dotnet --version`
- Restore dependencies: `dotnet restore`
- Clean build: `dotnet clean && dotnet build`

### Coverage not generated
- Check coverlet.runsettings exists
- Verify test project has Coverlet.collector dependency
- Run with: `dotnet test --collect:"XPlat Code Coverage"`

### Frontend tests fail
- Install dependencies: `npm ci`
- Ensure Karma configured: `karma.conf.js` exists
- Check Chrome installed (for headless tests)

## CI/CD Integration

GitHub Actions automatically runs:
1. Backend tests with coverage
2. Frontend tests with coverage
3. Coverage gate validation
4. Uploads artifacts
5. Posts PR comments

See `.github/workflows/tests.yml` for workflow definition.
