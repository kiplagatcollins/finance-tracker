"use client"

import { useState, useEffect, useCallback } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Select } from "@/components/ui/Select"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { Modal } from "@/components/ui/Modal"
import { TransactionTable } from "@/components/TransactionTable"
import { TransactionForm } from "@/components/TransactionForm"
import { Spinner } from "@/components/ui/Spinner"
import api from "@/lib/api"
import type { Transaction, Category } from "@/lib/types"

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Transaction | null>(null)
  const [saving, setSaving] = useState(false)
  const [filterType, setFilterType] = useState("")
  const [filterCategory, setFilterCategory] = useState("")

  const fetchTransactions = useCallback(async () => {
    try {
      const params = new URLSearchParams()
      if (filterType) params.set("type", filterType)
      if (filterCategory) params.set("category_id", filterCategory)
      const { data } = await api.get(`/transactions?${params}`)
      setTransactions(data.data ?? data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [filterType, filterCategory])

  const fetchCategories = useCallback(async () => {
    try {
      const { data } = await api.get("/categories")
      setCategories(data.data ?? data)
    } catch (err) {
      console.error(err)
    }
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  const handleSubmit = async (formData: any) => {
    setSaving(true)
    try {
      if (editing) {
        await api.put(`/transactions/${editing.id}`, formData)
      } else {
        await api.post("/transactions", formData)
      }
      setShowForm(false)
      setEditing(null)
      fetchTransactions()
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this transaction?")) return
    try {
      await api.delete(`/transactions/${id}`)
      fetchTransactions()
    } catch (err) {
      console.error(err)
    }
  }

  const openEdit = (t: Transaction) => {
    setEditing(t)
    setShowForm(true)
  }

  const openCreate = () => {
    setEditing(null)
    setShowForm(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-500">Manage your income and expenses</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="mr-2 h-4 w-4" /> Add Transaction
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap gap-4">
            <div className="w-40">
              <Select
                id="filter-type"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                placeholder="All types"
                options={[
                  { value: "income", label: "Income" },
                  { value: "expense", label: "Expense" },
                ]}
              />
            </div>
            <div className="w-48">
              <Select
                id="filter-category"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                placeholder="All categories"
                options={categories.map((c) => ({ value: c.id.toString(), label: c.name }))}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12"><Spinner /></div>
          ) : (
            <TransactionTable
              transactions={transactions}
              onEdit={openEdit}
              onDelete={handleDelete}
            />
          )}
        </CardContent>
      </Card>

      <Modal open={showForm} onClose={() => { setShowForm(false); setEditing(null) }} title={editing ? "Edit Transaction" : "New Transaction"}>
        <TransactionForm
          categories={categories}
          transaction={editing}
          onSubmit={handleSubmit}
          loading={saving}
        />
      </Modal>
    </div>
  )
}
