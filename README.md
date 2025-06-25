# TypeScript Backend API for Team/Project Management

This is a TypeScript-based backend API for managing users, projects, issues, and comments, using **TypeORM**, **Express**, and **PostgreSQL**. The API includes features such as user authentication, CRUD operations for projects and issues, and seeding data for testing.

**Project Owner**: Sunidhi  
**Task**: LarkLabs Intern Task

---

## Project Structure

### 1. **Configuration & Tooling**
- **package.json / package-lock.json**: Manages project dependencies and scripts.
- **tsconfig.json / tsconfig-paths.js**: TypeScript configuration and module resolution aliases.
- **.eslintrc.json / .eslintignore**: Linting configuration for maintaining consistent code style.
- **.prettierrc**: Prettier configuration to format the code.
- **.gitignore**: Specifies files and directories to ignore by Git.

### 2. **Database Layer**
- **src/database**: Contains files for connecting and seeding the database.
  - `createConnection.ts`: Connects to PostgreSQL using TypeORM.
  - `createGuestAccount.ts` & `createTestAccount.ts`: Seeders for test data (users, projects, issues, comments).
  - `resetDatabase.ts`: Resets the database schema for testing.

### 3. **Entities (ORM Models)**
- **src/entities**: Defines TypeORM models that map to database tables.
  - Includes models for `User`, `Project`, `Issue`, and `Comment`.

### 4. **Constants & Types**
- **src/constants**: Contains enums for project categories, issue statuses, and priority.
- **src/types**: TypeScript types for request/response bodies and environment variables.

### 5. **Controllers (Business Logic)**
- **src/controllers**: Contains route handlers for various resources like users, projects, and issues.
  - Handles user authentication, project CRUD operations, and more.

### 6. **Middleware**
- **src/middleware**: Express middleware for:
  - Authentication (`authentication.ts`)
  - Error handling (`errors.ts`)
  - Response formatting (`response.ts`)

### 7. **Utilities**
- **src/utils**: Helper functions for common tasks.
  - Includes functions for JWT generation/validation and TypeORM operations.

### 8. **Serializers**
- **src/serializers**: Functions for transforming API responses, like issue serialization.

### 9. **Routing**
- **routes.ts**: Attaches API routes to their corresponding controllers.

### 10. **Application Entry Point**
- **index.ts**: The entry point of the application, sets up the Express server and applies middleware.

---

## Getting Started

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **PostgreSQL** (v12 or higher)

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/your-repository-name.git
   cd your-repository-name
