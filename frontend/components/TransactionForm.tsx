"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { Select } from "./ui/Select"
import type { Category, Transaction } from "@/lib/types"

interface TransactionFormProps {
  categories: Category[]
  transaction?: Transaction | null
  onSubmit: (data: {
    category_id: number
    type: "income" | "expense"
    amount: number
    description: string
    date: string
  }) => void
  loading?: boolean
}

export function TransactionForm({ categories, transaction, onSubmit, loading }: TransactionFormProps) {
  const [type, setType] = useState<"income" | "expense">(transaction?.type || "expense")
  const [categoryId, setCategoryId] = useState(transaction?.category_id?.toString() || "")
  const [amount, setAmount] = useState(transaction?.amount?.toString() || "")
  const [description, setDescription] = useState(transaction?.description || "")
  const [date, setDate] = useState(transaction?.date?.split("T")[0] || new Date().toISOString().split("T")[0])

  useEffect(() => {
    if (transaction) {
      setType(transaction.type)
      setCategoryId(transaction.category_id.toString())
      setAmount(transaction.amount.toString())
      setDescription(transaction.description)
      setDate(transaction.date.split("T")[0])
    }
  }, [transaction])

  const filteredCategories = categories.filter((c) => c.type === type)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!categoryId) return
    onSubmit({
      category_id: Number(categoryId),
      type,
      amount: Number(amount),
      description,
      date,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select
        label="Type"
        id="type"
        value={type}
        onChange={(e) => { setType(e.target.value as "income" | "expense"); setCategoryId("") }}
        options={[
          { value: "expense", label: "Expense" },
          { value: "income", label: "Income" },
        ]}
      />
      <Select
        label="Category"
        id="category_id"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        placeholder="Select a category"
        options={filteredCategories.map((c) => ({ value: c.id.toString(), label: c.name }))}
        required
      />
      <Input label="Amount" id="amount" type="number" step="0.01" min="0" value={amount} onChange={(e) => setAmount(e.target.value)} required placeholder="0.00" />
      <Input label="Description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What was this for?" />
      <Input label="Date" id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <div className="flex justify-end gap-3 pt-2">
        <Button type="submit" loading={loading}>{transaction ? "Update" : "Create"} Transaction</Button>
      </div>
    </form>
  )
}
