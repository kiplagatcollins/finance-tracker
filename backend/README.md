# Go Finance Tracker API

This is a robust and scalable backend API for a personal finance tracker application, built using the Go programming language. It provides a secure and efficient way to manage financial data, including transactions, categories, and budgets.

## Features

*   **User Authentication**: Secure user registration and login using JWT (JSON Web Tokens).
*   **Transaction Management**: Create, retrieve, update, and delete financial transactions (income/expense).
*   **Category Management**: Define and manage custom categories for transactions.
*   **Budget Tracking**: Set up and monitor spending budgets against defined categories or periods.
*   **Data Validation**: Robust input validation for all API endpoints.
*   **Database Integration**: Persistent storage using PostgreSQL.

## Technologies Used

*   **Go**: The primary language for building the API.
*   **Fiber**: An expressive and fast HTTP framework for Go.
*   **GORM**: An excellent ORM library for interacting with the database.
*   **PostgreSQL**: A powerful open-source relational database.
*   **golang-jwt/jwt**: For handling JSON Web Tokens for authentication.
*   **Viper**: For configuration management, reading environment variables and `.env` files.
*   **Validator**: For request payload validation.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

*   **Go**: Version 1.18 or higher. You can download it from [golang.org](https://golang.org/dl/).
*   **Git**: For cloning the repository.
*   **PostgreSQL**: A running instance of PostgreSQL.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/finance-tracker-api.git
    cd finance-tracker-api
    ```

2.  **Set up environment variables:**
    Create a `.env` file in the root directory of the project based on the `.env.example` (or similar structure).
    ```
    SERVER_PORT=8080
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_NAME=finance_tracker_db
    JWT_SECRET=supersecretjwtkey
    ```
    *Replace placeholders with your actual database credentials and a strong JWT secret.*

3.  **Install dependencies:**
    ```bash
    go mod tidy
    ```

4.  **Run database migrations:**
    *Ensure your database schema is up-to-date. If using GORM's `AutoMigrate`, ensure it's called at application startup or run a dedicated migration script.*

5.  **Run the application:**
    ```bash
    go run main.go
    ```
    The API should now be running on `http://localhost:8080` (or your specified `SERVER_PORT`).

## API Endpoints

The API is structured with a `/api/v1` prefix.

### Authentication

*   `POST /api/v1/auth/register` - Register a new user.
*   `POST /api/v1/auth/login` - Log in an existing user and receive a JWT.

### Users (Requires Authentication)

*   `GET /api/v1/users/me` - Get current authenticated user details.

### Transactions (Requires Authentication)

*   `GET /api/v1/transactions` - Retrieve all transactions for the authenticated user.
*   `GET /api/v1/transactions/:id` - Retrieve a specific transaction by ID.
*   `POST /api/v1/transactions` - Create a new transaction.
*   `PUT /api/v1/transactions/:id` - Update an existing transaction.
*   `DELETE /api/v1/transactions/:id` - Delete a transaction.

### Categories (Requires Authentication)

*   `GET /api/v1/categories` - Retrieve all categories for the authenticated user.
*   `GET /api/v1/categories/:id` - Retrieve a specific category by ID.
*   `POST /api/v1/categories` - Create a new category.
*   `PUT /api/v1/categories/:id` - Update an existing category.
*   `DELETE /api/v1/categories/:id` - Delete a category.

### Budgets (Requires Authentication)

*   `GET /api/v1/budgets` - Retrieve all budgets for the authenticated user.
*   `GET /api/v1/budgets/:id` - Retrieve a specific budget by ID.
*   `POST /api/v1/budgets` - Create a new budget.
*   `PUT /api/v1/budgets/:id` - Update an existing budget.
*   `DELETE /api/v1/budgets/:id` - Delete a budget.

## Configuration

The application uses `Viper` to manage configuration, prioritizing environment variables over values found in the `.env` file. A `config` package typically loads these settings at application startup.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.
