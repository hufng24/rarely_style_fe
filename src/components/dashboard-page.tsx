// src/app/dashboard/page.tsx
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp, DollarSign, ShoppingBag, Users, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const stats = [
    {
      title: "Tổng doanh thu",
      value: "56,433,244 ₫",
      change: "+12%",
      icon: DollarSign,
    },
    { title: "Đơn hàng mới", value: "2,683", change: "+8%", icon: ShoppingBag },
    { title: "Khách hàng mới", value: "203", change: "+15%", icon: Users },
    { title: "Sản phẩm", value: "5,332", change: "+3%", icon: Package },
  ];

  const recentOrders = [
    { id: "#001", customer: "Nguyễn Văn A", total: "4,550,000 ₫", status: "completed", date: "2024-01-15" },
    { id: "#002", customer: "Trần Thị B", total: "1,520,000 ₫", status: "pending", date: "2024-01-15" },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { label: "Hoàn thành", variant: "default" as const },
      pending: { label: "Chờ xử lý", variant: "secondary" as const },
      processing: { label: "Đang xử lý", variant: "outline" as const },
      cancelled: { label: "Đã hủy", variant: "destructive" as const },
    };
    return statusConfig[status as keyof typeof statusConfig] || { label: status, variant: "outline" as const };
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Tổng quan về hoạt động bán hàng</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-accent flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                {stat.change} so với tháng trước
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Đơn hàng gần đây</CardTitle>
          <CardDescription>Danh sách các đơn hàng mới nhất</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium text-foreground">{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.customer}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium text-foreground">{order.total}</p>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                  <Badge variant={getStatusBadge(order.status).variant}>
                    {getStatusBadge(order.status).label}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
