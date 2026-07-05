import { Card, CardContent } from "./ui/Card"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface SummaryCardProps {
  title: string
  value: string
  icon: LucideIcon
  trend?: { value: string; positive: boolean }
  variant?: "default" | "income" | "expense"
}

export function SummaryCard({ title, value, icon: Icon, trend, variant = "default" }: SummaryCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {trend && (
              <p className={cn("text-sm", trend.positive ? "text-emerald-600" : "text-red-600")}>
                {trend.value}
              </p>
            )}
          </div>
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl",
              variant === "income" && "bg-emerald-50 text-emerald-600",
              variant === "expense" && "bg-red-50 text-red-600",
              variant === "default" && "bg-indigo-50 text-indigo-600",
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
