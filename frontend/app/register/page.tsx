"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"

export default function RegisterPage() {
  const router = useRouter()
  const { register } = useAuth()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await register(firstName, lastName, email, password)
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600">
              <span className="text-xl font-bold text-white">F</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Create an account</h1>
            <p className="mt-1 text-sm text-gray-500">Start tracking your finances today</p>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <Input label="First Name" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required placeholder="John" />
              <Input label="Last Name" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required placeholder="Doe" />
            </div>
            <Input label="Email" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" />
            <Input label="Password" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="At least 8 characters" minLength={8} />
            <Button type="submit" className="w-full" loading={loading}>Create account</Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
