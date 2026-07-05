"use client"

import { formatCurrency, formatDate } from "@/lib/utils"
import { CategoryBadge } from "./CategoryBadge"
import { Button } from "./ui/Button"
import { Pencil, Trash2 } from "lucide-react"
import type { Transaction } from "@/lib/types"
import { cn } from "@/lib/utils"

interface TransactionTableProps {
  transactions: Transaction[]
  onEdit: (t: Transaction) => void
  onDelete: (id: number) => void
}

export function TransactionTable({ transactions, onEdit, onDelete }: TransactionTableProps) {
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <p className="text-lg font-medium">No transactions yet</p>
        <p className="text-sm">Add your first transaction to get started.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-gray-500">
            <th className="pb-3 pr-4 font-medium">Date</th>
            <th className="pb-3 pr-4 font-medium">Description</th>
            <th className="pb-3 pr-4 font-medium">Category</th>
            <th className="pb-3 pr-4 font-medium text-right">Amount</th>
            <th className="pb-3 pr-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {transactions.map((t) => (
            <tr key={t.id} className="hover:bg-gray-50">
              <td className="py-3 pr-4 text-gray-600">{formatDate(t.date)}</td>
              <td className="py-3 pr-4 font-medium text-gray-900">{t.description}</td>
              <td className="py-3 pr-4">
                {t.category && <CategoryBadge name={t.category.name} color={t.category.color} />}
              </td>
              <td className={cn("py-3 pr-4 text-right font-medium tabular-nums", t.type === "income" ? "text-emerald-600" : "text-red-600")}>
                {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
              </td>
              <td className="py-3 text-right">
                <div className="flex justify-end gap-1">
                  <Button variant="ghost" size="sm" onClick={() => onEdit(t)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onDelete(t.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
