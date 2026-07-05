"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { Select } from "./ui/Select"
import type { Category } from "@/lib/types"

interface CategoryFormProps {
  category?: Category | null
  onSubmit: (data: { name: string; type: "income" | "expense"; color: string }) => void
  onCancel: () => void
  loading?: boolean
}

const colorOptions = [
  { value: "#6366f1", label: "Indigo" },
  { value: "#ef4444", label: "Red" },
  { value: "#10b981", label: "Emerald" },
  { value: "#f59e0b", label: "Amber" },
  { value: "#3b82f6", label: "Blue" },
  { value: "#ec4899", label: "Pink" },
  { value: "#8b5cf6", label: "Purple" },
  { value: "#14b8a6", label: "Teal" },
]

export function CategoryForm({ category, onSubmit, onCancel, loading }: CategoryFormProps) {
  const [name, setName] = useState(category?.name || "")
  const [type, setType] = useState<"income" | "expense">(category?.type || "expense")
  const [color, setColor] = useState(category?.color || "#6366f1")

  useEffect(() => {
    if (category) {
      setName(category.name)
      setType(category.type)
      setColor(category.color)
    }
  }, [category])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ name, type, color })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Name" id="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. Groceries" />
      <Select
        label="Type"
        id="type"
        value={type}
        onChange={(e) => setType(e.target.value as "income" | "expense")}
        options={[
          { value: "expense", label: "Expense" },
          { value: "income", label: "Income" },
        ]}
      />
      <Select
        label="Color"
        id="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        options={colorOptions}
      />
      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" loading={loading}>{category ? "Update" : "Create"}</Button>
      </div>
    </form>
  )
}
