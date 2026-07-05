"use client"

import { useState, useEffect, useCallback } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Modal } from "@/components/ui/Modal"
import { BudgetCard } from "@/components/BudgetCard"
import { BudgetForm } from "@/components/BudgetForm"
import { Spinner } from "@/components/ui/Spinner"
import api from "@/lib/api"
import type { Budget, Category } from "@/lib/types"

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Budget | null>(null)
  const [saving, setSaving] = useState(false)
  const [month, setMonth] = useState(() => {
    const d = new Date()
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
  })

  const fetchBudgets = useCallback(async () => {
    try {
      const { data } = await api.get(`/budgets?month=${month}`)
      setBudgets(data.data ?? data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [month])

  const fetchCategories = useCallback(async () => {
    try {
      const { data } = await api.get("/categories")
      setCategories(data.data ?? data)
    } catch (err) {
      console.error(err)
    }
  }, [])

  useEffect(() => { fetchCategories() }, [fetchCategories])
  useEffect(() => { fetchBudgets() }, [fetchBudgets])

  const handleSubmit = async (formData: any) => {
    setSaving(true)
    try {
      if (editing) {
        await api.put(`/budgets/${editing.id}`, formData)
      } else {
        await api.post("/budgets", formData)
      }
      setShowForm(false)
      setEditing(null)
      fetchBudgets()
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this budget?")) return
    try {
      await api.delete(`/budgets/${id}`)
      fetchBudgets()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Budgets</h1>
          <p className="text-gray-500">Set and track spending limits</p>
        </div>
        <Button onClick={() => { setEditing(null); setShowForm(true) }}>
          <Plus className="mr-2 h-4 w-4" /> Add Budget
        </Button>
      </div>

      <div className="w-48">
        <Input id="month" type="month" value={month} onChange={(e) => { setMonth(e.target.value); setLoading(true) }} />
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Spinner /></div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {budgets.map((budget) => (
            <BudgetCard
              key={budget.id}
              budget={budget}
              onEdit={(b) => { setEditing(b); setShowForm(true) }}
              onDelete={handleDelete}
            />
          ))}
          {budgets.length === 0 && (
            <p className="col-span-full text-center py-12 text-gray-500">No budgets set for this month.</p>
          )}
        </div>
      )}

      <Modal open={showForm} onClose={() => { setShowForm(false); setEditing(null) }} title={editing ? "Edit Budget" : "New Budget"}>
        <BudgetForm categories={categories} budget={editing} onSubmit={handleSubmit} onCancel={() => { setShowForm(false); setEditing(null) }} loading={saving} />
      </Modal>
    </div>
  )
}
