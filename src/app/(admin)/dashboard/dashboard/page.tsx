"use client";

import { BarChart3, Package, ShoppingCart, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const stats = [
    {
      title: "Tổng sản phẩm",
      value: "1,234",
      description: "+20.1% so với tháng trước",
      icon: Package,
    },
    {
      title: "Đơn hàng",
      value: "567",
      description: "+15.3% so với tháng trước",
      icon: ShoppingCart,
    },
    {
      title: "Khách hàng",
      value: "2,345",
      description: "+8.2% so với tháng trước",
      icon: Users,
    },
    {
      title: "Doanh thu",
      value: "₫45,231,000",
      description: "+12.5% so với tháng trước",
      icon: BarChart3,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Tổng quan về hoạt động của cửa hàng
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Biểu đồ doanh thu</CardTitle>
            <CardDescription>
              Doanh thu theo tháng trong năm 2024
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              Biểu đồ sẽ được thêm vào đây
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Sản phẩm bán chạy</CardTitle>
            <CardDescription>
              Top 5 sản phẩm bán chạy nhất
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-sm font-medium">
                    {i}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Sản phẩm {i}</p>
                    <p className="text-xs text-muted-foreground">
                      {Math.floor(Math.random() * 100) + 50} đã bán
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
