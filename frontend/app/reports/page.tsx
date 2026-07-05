"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { MonthlyBarChart } from "@/components/charts/MonthlyBarChart"
import { CategoryPieChart } from "@/components/charts/CategoryPieChart"
import { Spinner } from "@/components/ui/Spinner"
import { formatCurrency } from "@/lib/utils"
import api from "@/lib/api"
import type { SummaryReport, MonthlyReport } from "@/lib/types"

export default function ReportsPage() {
  const [summary, setSummary] = useState<SummaryReport | null>(null)
  const [monthly, setMonthly] = useState<MonthlyReport[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const year = new Date().getFullYear()
    Promise.all([
      api.get<SummaryReport>("/reports/summary"),
      api.get<MonthlyReport[]>(`/reports/monthly?year=${year}`),
    ])
      .then(([s, m]) => {
        setSummary(s.data)
        setMonthly(m.data)
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
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-500">Analyze your financial data</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-gray-500">Total Income</p>
            <p className="text-2xl font-bold text-emerald-600">{formatCurrency(summary?.total_income || 0)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-gray-500">Total Expenses</p>
            <p className="text-2xl font-bold text-red-600">{formatCurrency(summary?.total_expense || 0)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-gray-500">Net Balance</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(summary?.balance || 0)}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Monthly Income vs Expenses</h2>
        </CardHeader>
        <CardContent>
          <MonthlyBarChart data={monthly} />
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Expense Breakdown</h2>
          </CardHeader>
          <CardContent>
            <CategoryPieChart data={summary?.category_breakdown || []} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Category Details</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(summary?.category_breakdown || []).map((cat) => (
                <div key={cat.category} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-sm text-gray-700">{cat.category}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{formatCurrency(cat.amount)}</span>
                </div>
              ))}
              {(!summary?.category_breakdown || summary.category_breakdown.length === 0) && (
                <p className="text-sm text-gray-500">No expense data yet.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
