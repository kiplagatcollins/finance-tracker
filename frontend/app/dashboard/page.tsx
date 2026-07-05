"use client"

import { useState, useEffect } from "react"
import { ArrowUpRight, ArrowDownRight, Wallet } from "lucide-react"
import { SummaryCard } from "@/components/SummaryCard"
import { TrendChart } from "@/components/charts/TrendChart"
import { CategoryPieChart } from "@/components/charts/CategoryPieChart"
import { TransactionTable } from "@/components/TransactionTable"
import { Spinner } from "@/components/ui/Spinner"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { formatCurrency } from "@/lib/utils"
import api from "@/lib/api"
import type { SummaryReport, MonthlyReport, Transaction } from "@/lib/types"

export default function DashboardPage() {
  const [summary, setSummary] = useState<SummaryReport | null>(null)
  const [monthly, setMonthly] = useState<MonthlyReport[]>([])
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get<SummaryReport>("/reports/summary"),
      api.get<MonthlyReport[]>("/reports/monthly"),
      api.get<{ data: Transaction[] }>("/transactions?limit=5"),
    ])
      .then(([s, m, t]) => {
        setSummary(s.data)
        setMonthly(m.data)
        setRecentTransactions(t.data.data)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Your financial overview</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <SummaryCard
          title="Total Income"
          value={formatCurrency(summary?.total_income || 0)}
          icon={ArrowUpRight}
          variant="income"
        />
        <SummaryCard
          title="Total Expenses"
          value={formatCurrency(summary?.total_expense || 0)}
          icon={ArrowDownRight}
          variant="expense"
        />
        <SummaryCard
          title="Balance"
          value={formatCurrency(summary?.balance || 0)}
          icon={Wallet}
          variant="default"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Income vs Expenses</h2>
          </CardHeader>
          <CardContent>
            <TrendChart data={monthly} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Spending by Category</h2>
          </CardHeader>
          <CardContent>
            <CategoryPieChart data={summary?.category_breakdown || []} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
            <a href="/transactions" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              View all
            </a>
          </div>
        </CardHeader>
        <CardContent>
          <TransactionTable
            transactions={recentTransactions}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        </CardContent>
      </Card>
    </div>
  )
}
