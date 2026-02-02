# Finance Tracker

Welcome to the Finance Tracker project! This application is designed to help users manage their personal finances effectively by tracking income, expenses, and providing insights into spending habits.

## Table of Contents

*   [Features](#features)
*   [Technologies Used](#technologies-used)
*   [Architecture](#architecture)
*   [Getting Started](#getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Backend Setup](#backend-setup)
    *   [Frontend Setup](#frontend-setup)
    *   [Running the Application](#running-the-application)
*   [Configuration](#configuration)
*   [API Endpoints](#api-endpoints)
*   [Contributing](#contributing)
*   [License](#license)

## Features

*   **Income/Expense Tracking**: Record and categorize all financial transactions.
*   **Categorization**: Assign categories to transactions for better organization (e.g., Food, Transport, Salary).
*   **Budgeting**: Set monthly budgets for different categories.
*   **Dashboard & Visualization**: View financial summaries, trends, and charts.
*   **User Authentication**: Secure user login and registration.

## Technologies Used

### Backend (Go)

*   **Go**: Primary language for the backend API.
*   **Go Modules**: For dependency management.
*   **Database**: PostgreSQL (or SQLite for development).
*   **Web Framework/Router**: e.g., Gorilla Mux or Chi.
*   **ORM/DB Driver**: e.g., GORM or `database/sql` with `pq`.
*   **Authentication**: JWT (JSON Web Tokens).

### Frontend (Next.js)

*   **Next.js**: React framework for building user interfaces.
*   **React**: Core library for UI development.
*   **TypeScript**: (Optional, but recommended) For type-safe code.
*   **Styling**: e.g., Tailwind CSS, Styled Components, or plain CSS/SCSS.
*   **API Client**: Axios or Fetch API.

## Architecture

This project follows a decoupled architecture, with a distinct separation between the backend API and the frontend client.

*   **Backend**: A RESTful API built with Go, responsible for handling business logic, data persistence, and user authentication. It exposes various endpoints for financial operations.
*   **Frontend**: A single-page application (SPA) developed with Next.js, which consumes the backend API to display data and interact with the user.

Communication between the frontend and backend occurs via standard HTTP requests.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

*   **Git**: For cloning the repository.
*   **Go**: [Installation Guide](https://golang.org/doc/install) (version 1.18+ recommended).
*   **Node.js & npm/yarn**: [Installation Guide](https://nodejs.org/en/download/) (Node.js v14+ recommended).
*   **PostgreSQL**: A running instance of PostgreSQL (or Docker for easy setup).

### Backend Setup

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/finance-tracker.git
    cd finance-tracker/backend
    ```

2.  **Install dependencies**:
    ```bash
    go mod tidy
    ```

3.  **Configure environment variables**:
    Create a `.env` file in the `backend` directory. An example `backend/.env` might look like this:
    ```
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=finance_user
    DB_PASSWORD=your_db_password
    DB_NAME=finance_tracker_db
    JWT_SECRET=a_very_secret_key_for_jwt_signing
    API_PORT=8080
    ```

4.  **Database Setup**:
    Ensure your PostgreSQL database is running. Create a database named `finance_tracker_db` (or whatever you set for `DB_NAME`) and a user `finance_user` with the specified password.
    Run database migrations (if your project includes them, e.g.):
    ```bash
    # Example command, adjust based on your migration tool/scripts
    go run ./cmd/migrate/main.go up
    ```

5.  **Run the Backend Server**:
    ```bash
    go run ./cmd/api/main.go # Adjust path to your main entry point
    ```
    The backend API should now be running on `http://localhost:8080` (or your configured `API_PORT`).

### Frontend Setup

1.  **Navigate to the frontend directory**:
    ```bash
    cd ../frontend
    ```

2.  **Install dependencies**:
    ```bash
    npm install # or yarn install
    ```

3.  **Configure environment variables**:
    Create a `.env.local` file in the `frontend` directory. An example `frontend/.env.local` might look like this:
    ```
    NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api # Adjust if your API has a /api prefix
    ```

4.  **Run the Frontend Development Server**:
    ```bash
    npm run dev # or yarn dev
    ```
    The frontend application should now be accessible at `http://localhost:3000`.

### Running the Application

1.  Ensure both the backend (Go) and frontend (Next.js) servers are running concurrently in separate terminal windows.
    *   **Backend**: `cd backend && go run ./cmd/api/main.go`
    *   **Frontend**: `cd frontend && npm run dev`

2.  Open your web browser and navigate to `http://localhost:3000` to start using the Finance Tracker!

## Configuration

### Backend (`backend/.env`)

*   `DB_HOST`: Host for the PostgreSQL database.
*   `DB_PORT`: Port for the PostgreSQL database.
*   `DB_USER`: Username for database access.
*   `DB_PASSWORD`: Password for database access.
*   `DB_NAME`: Name of the database to connect to.
*   `JWT_SECRET`: Secret key used for signing and verifying JWTs. **Crucial for security, use a strong, unique key.**
*   `API_PORT`: Port on which the Go backend API will listen.

### Frontend (`frontend/.env.local`)

*   `NEXT_PUBLIC_API_BASE_URL`: The base URL of your Go backend API. This must be accessible from the frontend.

## API Endpoints

(This section provides a high-level overview. For detailed API documentation, refer to a separate `API.md` file or Swagger/OpenAPI documentation if available.)

The backend API generally follows RESTful conventions and includes endpoints for:

*   `/api/auth`: User registration, login, token refresh.
*   `/api/users`: User profile management.
*   `/api/transactions`: CRUD operations for financial transactions.
*   `/api/categories`: Management of transaction categories.
*   `/api/budgets`: Setting and tracking budgets.
*   `/api/reports`: Generating financial reports and summaries.

## Contributing

We welcome contributions to the Finance Tracker! If you're interested in contributing, please follow these general guidelines:

1.  Fork the repository.
2.  Create a new feature branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes, write tests, and ensure all existing tests pass.
4.  Commit your changes with a clear message (`git commit -m 'feat: Add new feature X'`).
5.  Push your branch to your fork (`git push origin feature/your-feature-name`).
6.  Open a Pull Request to the main repository.

Please ensure your code adheres to the project's coding standards and includes appropriate documentation.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.
