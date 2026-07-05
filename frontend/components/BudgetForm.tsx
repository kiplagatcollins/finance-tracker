"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { Select } from "./ui/Select"
import type { Budget, Category } from "@/lib/types"

interface BudgetFormProps {
  categories: Category[]
  budget?: Budget | null
  onSubmit: (data: { category_id: number; month: string; amount: number }) => void
  onCancel: () => void
  loading?: boolean
}

export function BudgetForm({ categories, budget, onSubmit, onCancel, loading }: BudgetFormProps) {
  const today = new Date()
  const currentMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`
  const [categoryId, setCategoryId] = useState(budget?.category_id?.toString() || "")
  const [month, setMonth] = useState(budget?.month || currentMonth)
  const [amount, setAmount] = useState(budget?.amount?.toString() || "")

  useEffect(() => {
    if (budget) {
      setCategoryId(budget.category_id.toString())
      setMonth(budget.month)
      setAmount(budget.amount.toString())
    }
  }, [budget])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!categoryId) return
    onSubmit({ category_id: Number(categoryId), month, amount: Number(amount) })
  }

  const expenseCategories = categories.filter((c) => c.type === "expense")

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select
        label="Category"
        id="category_id"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        placeholder="Select a category"
        options={expenseCategories.map((c) => ({ value: c.id.toString(), label: c.name }))}
        required
      />
      <Input
        label="Month"
        id="month"
        type="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        required
      />
      <Input
        label="Budget Amount"
        id="amount"
        type="number"
        step="0.01"
        min="0"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        placeholder="0.00"
      />
      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" loading={loading}>{budget ? "Update" : "Create"} Budget</Button>
      </div>
    </form>
  )
}
