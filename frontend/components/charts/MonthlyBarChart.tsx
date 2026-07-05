"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { formatCurrency } from "@/lib/utils"
import type { MonthlyReport } from "@/lib/types"

interface MonthlyBarChartProps {
  data: MonthlyReport[]
}

export function MonthlyBarChart({ data }: MonthlyBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6b7280" }} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
        <Tooltip
          contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb" }}
          formatter={(value) => formatCurrency(Number(value))}
        />
        <Legend />
        <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} name="Income" />
        <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} name="Expense" />
      </BarChart>
    </ResponsiveContainer>
  )
}
