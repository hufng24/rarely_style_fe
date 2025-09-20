"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Order {
  id: string
  customer: string
  total: string
  status: string
  date: string
}

interface ViewOrderModalProps {
  isOpen: boolean
  onClose: () => void
  order: Order | null
}

const getStatusBadge = (status: string) => {
  const statusConfig = {
    completed: { label: "Hoàn thành", variant: "default" as const },
    pending: { label: "Chờ xử lý", variant: "secondary" as const },
    processing: { label: "Đang xử lý", variant: "outline" as const },
    cancelled: { label: "Đã hủy", variant: "destructive" as const },
  }
  return statusConfig[status as keyof typeof statusConfig] || { label: status, variant: "outline" as const }
}

export function ViewOrderModal({ isOpen, onClose, order }: ViewOrderModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Chi tiết đơn hàng {order?.id}</DialogTitle>
          <DialogDescription>Thông tin chi tiết về đơn hàng của khách hàng {order?.customer}.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Khách hàng</Label>
              <p className="text-foreground font-medium">{order?.customer}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Ngày đặt</Label>
              <p className="text-foreground">{order?.date}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Tổng tiền</Label>
              <p className="text-foreground font-bold text-lg">{order?.total}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Trạng thái</Label>
              <Badge variant={getStatusBadge(order?.status || "").variant} className="mt-1">
                {getStatusBadge(order?.status || "").label}
              </Badge>
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium text-muted-foreground">Sản phẩm</Label>
            <div className="mt-2 space-y-2">
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium">iPhone 15 Pro</p>
                  <p className="text-sm text-muted-foreground">Số lượng: 1</p>
                </div>
                <p className="font-medium">25,000,000 ₫</p>
              </div>
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium text-muted-foreground">Địa chỉ giao hàng</Label>
            <p className="text-foreground mt-1">123 Đường ABC, Quận 1, TP.HCM</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Đóng
          </Button>
          <Button>Cập nhật trạng thái</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
