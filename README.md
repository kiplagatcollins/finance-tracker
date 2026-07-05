# FinanceHub - Personal Finance Tracker

A full-stack personal finance tracker for managing income, expenses, categories, budgets, and visualizing spending habits.

## Features

- **Dashboard** — Summary cards, income/expense trend chart, category breakdown pie chart, recent transactions
- **Transaction Management** — Add, edit, delete transactions with category and date filtering
- **Categories** — Color-coded income/expense categories with CRUD management
- **Budgets** — Monthly budget tracking with progress bars and spent vs. remaining
- **Reports** — Monthly bar charts, expense breakdown, category-level details
- **Authentication** — User registration and login with JWT

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16, React 19, TypeScript, Tailwind CSS v4, Recharts, Axios, Lucide React, date-fns |
| **Backend** | Go 1.25, Fiber v2, Bun ORM, PostgreSQL |
| **Auth** | JWT (golang-jwt/v5), bcrypt |

## Project Structure

```
FinanceTracker/
├── backend/               # Go/Fiber REST API
│   ├── main.go
│   ├── config/            # Viper config loader
│   ├── controller/        # HTTP handlers
│   ├── data/              # Request/response DTOs
│   ├── database/          # PostgreSQL connection (Bun)
│   ├── models/            # User, Transaction, Category, Budget
│   ├── routes/            # Route definitions
│   ├── service/           # Business logic layer
│   └── middleware/        # JWT auth middleware
├── frontend/              # Next.js SPA
│   ├── app/               # App Router pages
│   │   ├── dashboard/     # Financial overview with charts
│   │   ├── transactions/  # CRUD transaction management
│   │   ├── categories/    # Category management
│   │   ├── budgets/       # Monthly budget tracking
│   │   ├── reports/       # Analytics and reports
│   │   ├── login/         # Authentication
│   │   └── register/      # Registration
│   ├── components/        # Reusable UI
│   │   ├── ui/            # Primitives (Button, Input, Modal, etc.)
│   │   ├── charts/        # Recharts wrappers (TrendChart, PieChart, BarChart)
│   │   └── ...            # Feature components
│   └── lib/               # Types, API client, auth context, utils
├── docs/                  # Design specs and plans
└── Makefile               # Root build orchestrator
```

## Getting Started

### Prerequisites

- Go 1.25+
- Bun (or npm/yarn)
- PostgreSQL

### Quick Start

```bash
# 1. Install all dependencies
make install

# 2. Configure backend
cp backend/config.yaml backend/config.yaml  # edit database credentials

# 3. Configure frontend
echo "NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1" > frontend/.env.local

# 4. Run both servers concurrently
make run
```

- Frontend: http://localhost:3000
- Backend: http://localhost:8080

### Individual Commands

| Command | Description |
|---------|-------------|
| `make run` | Start backend + frontend |
| `make run-backend` | Start Go API server only |
| `make run-frontend` | Start Next.js dev server only |
| `make build` | Build both for production |
| `make lint` | Lint frontend |
| `make test` | Run backend tests |
| `make clean` | Remove build artifacts |

## Configuration

### Backend (`backend/config.yaml`)

```yaml
server:
  port: "8080"
  env: "development"
database:
  user: "postgres"
  password: "your_password"
  host: "localhost"
  port: "5432"
  name: "finance_db"
```

### Frontend (`frontend/.env.local`)

```
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```

## API Endpoints

All endpoints are prefixed with `/api/v1`.

### Auth
| Method | Path | Description |
|--------|------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and receive JWT |

### Users
| Method | Path | Description |
|--------|------|-------------|
| GET | `/users/me` | Get current user profile |
| PUT | `/users/me` | Update profile |

### Categories
| Method | Path | Description |
|--------|------|-------------|
| GET | `/categories` | List user's categories |
| POST | `/categories` | Create a category |
| GET | `/categories/:id` | Get category by ID |
| PUT | `/categories/:id` | Update category |
| DELETE | `/categories/:id` | Delete category |

### Transactions
| Method | Path | Description |
|--------|------|-------------|
| GET | `/transactions` | List transactions (filters: `type`, `category_id`, `start_date`, `end_date`, `page`, `limit`) |
| POST | `/transactions` | Create a transaction |
| GET | `/transactions/:id` | Get transaction by ID |
| PUT | `/transactions/:id` | Update transaction |
| DELETE | `/transactions/:id` | Delete transaction |

### Budgets
| Method | Path | Description |
|--------|------|-------------|
| GET | `/budgets` | List budgets (filter: `month`) |
| POST | `/budgets` | Create a budget |
| GET | `/budgets/:id` | Get budget by ID |
| PUT | `/budgets/:id` | Update budget |
| DELETE | `/budgets/:id` | Delete budget |

### Reports
| Method | Path | Description |
|--------|------|-------------|
| GET | `/reports/summary` | Total income/expense/balance + category breakdown |
| GET | `/reports/monthly` | Monthly income/expense trends (`?year=2026`) |

## License

MIT
