export interface User {
  id: number
  first_name: string
  last_name: string
  email: string
  created_at: string
  updated_at: string
}

export interface Category {
  id: number
  name: string
  type: "income" | "expense"
  icon: string
  color: string
  user_id: number
  created_at: string
}

export interface Transaction {
  id: number
  user_id: number
  category_id: number
  type: "income" | "expense"
  amount: number
  description: string
  date: string
  created_at: string
  updated_at: string
  category?: Category
}

export interface Budget {
  id: number
  user_id: number
  category_id: number
  month: string
  amount: number
  spent: number
  created_at: string
  category?: Category
}

export interface AuthResponse {
  user: User
  token: string
}

export interface SummaryReport {
  total_income: number
  total_expense: number
  balance: number
  category_breakdown: { category: string; amount: number; color: string }[]
}

export interface MonthlyReport {
  month: string
  income: number
  expense: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}
