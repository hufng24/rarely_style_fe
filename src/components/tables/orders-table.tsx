"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Eye, Edit, Search } from "lucide-react"
import { Pagination } from "@/components/pagination"

interface Order {
  id: string
  customer: string
  total: string
  status: string
  date: string
}

interface OrdersTableProps {
  orders: Order[]
  currentPage: number
  onPageChange: (page: number) => void
  onViewOrder: (order: Order) => void
  itemsPerPage: number
}

export function OrdersTable({ orders, currentPage, onPageChange, onViewOrder, itemsPerPage }: OrdersTableProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex)
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { label: "Hoàn thành", variant: "default" as const },
      pending: { label: "Chờ xử lý", variant: "secondary" as const },
      processing: { label: "Đang xử lý", variant: "outline" as const },
      cancelled: { label: "Đã hủy", variant: "destructive" as const },
    }
    return statusConfig[status as keyof typeof statusConfig] || { label: status, variant: "outline" as const }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Quản lý đơn hàng</h1>
        <p className="text-muted-foreground">Theo dõi và xử lý các đơn hàng</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm đơn hàng..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-medium text-muted-foreground">Mã đơn</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Khách hàng</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Tổng tiền</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Ngày đặt</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Trạng thái</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-muted/30">
                    <td className="p-4">
                      <div className="font-medium text-foreground">{order.id}</div>
                    </td>
                    <td className="p-4 text-muted-foreground">{order.customer}</td>
                    <td className="p-4 text-foreground font-medium">{order.total}</td>
                    <td className="p-4 text-muted-foreground">{order.date}</td>
                    <td className="p-4">
                      <Badge variant={getStatusBadge(order.status).variant}>{getStatusBadge(order.status).label}</Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => onViewOrder(order)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
