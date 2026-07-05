"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { X } from "lucide-react"

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const el = dialogRef.current
    if (!el) return
    if (open && !el.open) el.showModal()
    if (!open && el.open) el.close()
  }, [open])

  useEffect(() => {
    const el = dialogRef.current
    if (!el) return
    const handler = () => onClose()
    el.addEventListener("close", handler)
    return () => el.removeEventListener("close", handler)
  }, [onClose])

  if (!open) return null

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-50 m-auto w-full max-w-lg rounded-xl bg-white p-0 shadow-2xl backdrop:bg-black/50 open:flex open:flex-col"
      onClick={(e) => { if (e.target === dialogRef.current) onClose() }}
    >
      <div className="flex items-center justify-between border-b px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <button onClick={onClose} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="px-6 py-4">{children}</div>
    </dialog>
  )
}
