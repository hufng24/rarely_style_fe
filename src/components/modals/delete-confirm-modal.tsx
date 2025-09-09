"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Product {
  id: number
  name: string
  category: string
  price: string
  stock: number
  status: string
}

interface DeleteConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product | null
  onConfirm: () => void
}

export function DeleteConfirmModal({ isOpen, onClose, product, onConfirm }: DeleteConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Xác nhận xóa</DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn xóa sản phẩm "{product?.name}"? Hành động này không thể hoàn tác.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Xóa sản phẩm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
