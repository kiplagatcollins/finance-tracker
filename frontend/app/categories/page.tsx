"use client"

import { useState, useEffect, useCallback } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { Modal } from "@/components/ui/Modal"
import { CategoryBadge } from "@/components/CategoryBadge"
import { CategoryForm } from "@/components/CategoryForm"
import { Spinner } from "@/components/ui/Spinner"
import api from "@/lib/api"
import type { Category } from "@/lib/types"

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)
  const [saving, setSaving] = useState(false)

  const fetchCategories = useCallback(async () => {
    try {
      const { data } = await api.get("/categories")
      setCategories(data.data ?? data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchCategories() }, [fetchCategories])

  const handleSubmit = async (formData: { name: string; type: "income" | "expense"; color: string }) => {
    setSaving(true)
    try {
      if (editing) {
        await api.put(`/categories/${editing.id}`, formData)
      } else {
        await api.post("/categories", formData)
      }
      setShowForm(false)
      setEditing(null)
      fetchCategories()
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const openEdit = (c: Category) => {
    setEditing(c)
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this category?")) return
    try {
      await api.delete(`/categories/${id}`)
      fetchCategories()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-500">Organize your transactions by category</p>
        </div>
        <Button onClick={() => { setEditing(null); setShowForm(true) }}>
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Spinner /></div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Card key={cat.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${cat.color}20` }}
                    >
                      <span className="text-lg" style={{ color: cat.color }}>{cat.icon || "•"}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{cat.name}</p>
                      <CategoryBadge name={cat.type} color={cat.type === "income" ? "#10b981" : "#ef4444"} />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => openEdit(cat)}>Edit</Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(cat.id)} className="text-red-500">Delete</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {categories.length === 0 && (
            <p className="col-span-full text-center py-12 text-gray-500">No categories yet. Create one to get started.</p>
          )}
        </div>
      )}

      <Modal open={showForm} onClose={() => { setShowForm(false); setEditing(null) }} title={editing ? "Edit Category" : "New Category"}>
        <CategoryForm category={editing} onSubmit={handleSubmit} onCancel={() => { setShowForm(false); setEditing(null) }} loading={saving} />
      </Modal>
    </div>
  )
}
