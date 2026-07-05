import { Card, CardContent } from "./ui/Card"
import { formatCurrency } from "@/lib/utils"
import type { Budget } from "@/lib/types"

interface BudgetCardProps {
  budget: Budget
  onEdit: (b: Budget) => void
  onDelete: (id: number) => void
}

export function BudgetCard({ budget, onEdit, onDelete }: BudgetCardProps) {
  const percentage = budget.amount > 0 ? Math.min((budget.spent / budget.amount) * 100, 100) : 0
  const isOverBudget = budget.spent > budget.amount
  const color = budget.category?.color || "#6366f1"

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-5">
        <div className="mb-3 flex items-start justify-between">
          <div>
            <p className="font-medium text-gray-900" style={{ color }}>
              {budget.category?.name || "Unknown"}
            </p>
            <p className="text-sm text-gray-500">{budget.month}</p>
          </div>
          <button
            onClick={() => onEdit(budget)}
            className="text-sm text-indigo-600 hover:text-indigo-800"
          >
            Edit
          </button>
        </div>

        <div className="mb-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">{formatCurrency(budget.spent)} spent</span>
            <span className="text-gray-500">{formatCurrency(budget.amount)} budget</span>
          </div>
          <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${percentage}%`,
                backgroundColor: isOverBudget ? "#ef4444" : color,
              }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className={`text-sm font-medium ${isOverBudget ? "text-red-600" : "text-emerald-600"}`}>
            {percentage.toFixed(0)}% used
          </span>
          <span className="text-sm text-gray-500">
            {formatCurrency(budget.amount - budget.spent)} remaining
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
