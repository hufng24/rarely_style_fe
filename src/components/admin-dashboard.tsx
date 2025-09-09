"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  Settings,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Bell,
  Menu,
  X,
  LogOut,
  User,
  HelpCircle,
  UserPlus,
} from "lucide-react"

import { AddProductModal } from "@/components/modals/add-product-modal"
import { EditProductModal } from "@/components/modals/edit-product-modal"
import { ViewOrderModal } from "@/components/modals/view-order-modal"
import { DeleteConfirmModal } from "@/components/modals/delete-confirm-modal"
import { AddUserModal } from "@/components/modals/add-user-modal"
import { EditUserModal } from "@/components/modals/edit-user-modal"

import { ProductsTable } from "@/components/tables/products-table"
import { OrdersTable } from "@/components/tables/orders-table"
import { Color, ColorsTable } from "@/components/tables/customers-table"
import { UsersTable } from "@/components/tables/users-table"

import useFetch from "react-fetch-hook";


import { defaultProducts } from "@/config/products"
import { BASE_URL } from "@/constant/base"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false)
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false)
  const [isViewOrderModalOpen, setIsViewOrderModalOpen] = useState(false)
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false)
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)

  const [currentProductPage, setCurrentProductPage] = useState(1)
  const [currentOrderPage, setCurrentOrderPage] = useState(1)
  const [currentUserPage, setCurrentUserPage] = useState(1)
  const [currentCustomerPage, setCurrentCustomerPage] = useState(1)
  const itemsPerPage = 5

   const { data, error } = useFetch<Color[]>(
    `${BASE_URL}/colors`
  )




  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "products", label: "Sản phẩm", icon: Package },
    { id: "orders", label: "Đơn hàng", icon: ShoppingCart },
    { id: "customers", label: "Màu Sắc", icon: Users },
    { id: "users", label: "Người dùng", icon: UserPlus },
    { id: "settings", label: "Cài đặt", icon: Settings },
  ]

  const stats = [
    { title: "Tổng doanh thu", value: "56,433,244 ₫", change: "+12%", icon: DollarSign },
    { title: "Đơn hàng mới", value: "2,683", change: "+8%", icon: ShoppingBag },
    { title: "Khách hàng mới", value: "203", change: "+15%", icon: Users },
    { title: "Sản phẩm", value: "5,332", change: "+3%", icon: Package },
  ]

  const recentOrders = [
    { id: "#001", customer: "Nguyễn Văn Quyền", total: "4,550,000 ₫", status: "completed", date: "2024-01-15" },
    { id: "#002", customer: "Trần Thị Hoa", total: "1,520,000 ₫", status: "pending", date: "2024-01-15" },
    { id: "#003", customer: "Lê Văn Cường", total: "4,800,000 ₫", status: "processing", date: "2024-01-14" },
    { id: "#004", customer: "Phạm Thị Dung", total: "750,000 ₫", status: "cancelled", date: "2024-01-14" },
    { id: "#005", customer: "Hoàng Văn E", total: "890,000 ₫", status: "completed", date: "2024-01-13" },
    { id: "#006", customer: "Vũ Thị F", total: "220,000 ₫", status: "pending", date: "2024-01-13" },
    { id: "#007", customer: "Đặng Văn G", total: "560,000 ₫", status: "processing", date: "2024-01-12" },
  ]

 
  const users = [
    {
      id: 1,
      name: "Nguyễn Văn Admin",
      email: "admin@example.com",
      phone: "0123456789",
      role: "admin",
      status: "active",
      lastLogin: "2024-01-15",
    },
    {
      id: 2,
      name: "Trần Thị Manager",
      email: "manager@example.com",
      phone: "0987654321",
      role: "manager",
      status: "active",
      lastLogin: "2024-01-15",
    },
    {
      id: 3,
      name: "Lê Văn Staff",
      email: "staff@example.com",
      phone: "0456789123",
      role: "staff",
      status: "active",
      lastLogin: "2024-01-14",
    },
    {
      id: 4,
      name: "Phạm Thị Customer",
      email: "customer@example.com",
      phone: "0789123456",
      role: "customer",
      status: "inactive",
      lastLogin: "2024-01-10",
    },
    {
      id: 5,
      name: "Hoàng Văn User",
      email: "user@example.com",
      phone: "0321654987",
      role: "customer",
      status: "active",
      lastLogin: "2024-01-13",
    },
    {
      id: 6,
      name: "Vũ Thị Test",
      email: "test@example.com",
      phone: "0654987321",
      role: "staff",
      status: "active",
      lastLogin: "2024-01-12",
    },
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { label: "Hoàn thành", variant: "default" as const },
      pending: { label: "Chờ xử lý", variant: "secondary" as const },
      processing: { label: "Đang xử lý", variant: "outline" as const },
      cancelled: { label: "Đã hủy", variant: "destructive" as const },
      active: { label: "Hoạt động", variant: "default" as const },
      inactive: { label: "Không hoạt động", variant: "secondary" as const },
      out_of_stock: { label: "Hết hàng", variant: "destructive" as const },
    }
    return statusConfig[status as keyof typeof statusConfig] || { label: status, variant: "outline" as const }
  }

  const handleDeleteProduct = () => {
    console.log("[v0] Deleting product:", selectedItem?.name)
    // Logic xóa sản phẩm sẽ được thêm ở đây
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
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
                    <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
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
                  {recentOrders.slice(0, 4).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-medium text-foreground">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.customer}</p>
                        </div>
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
        )

      case "products":
        return (
          <ProductsTable
            products={defaultProducts}
            currentPage={currentProductPage}
            onPageChange={setCurrentProductPage}
            onAddProduct={() => setIsAddProductModalOpen(true)}
            onEditProduct={(product) => {
              setSelectedItem(product)
              setIsEditProductModalOpen(true)
            }}
            onDeleteProduct={(product) => {
              setSelectedItem(product)
              setIsDeleteConfirmModalOpen(true)
            }}
            itemsPerPage={itemsPerPage}
          />
        )

      case "orders":
        return (
          <OrdersTable
            orders={recentOrders}
            currentPage={currentOrderPage}
            onPageChange={setCurrentOrderPage}
            onViewOrder={(order) => {
              setSelectedItem(order)
              setIsViewOrderModalOpen(true)
            }}
            itemsPerPage={itemsPerPage}
          />
        )

      case "customers":
        return (
          <ColorsTable
            colors={ data?.data || []}
            currentPage={currentCustomerPage}
            onPageChange={setCurrentCustomerPage}
            itemsPerPage={itemsPerPage}
          />
        )

      case "users":
        return (
          <UsersTable
            users={users}
            currentPage={currentUserPage}
            onPageChange={setCurrentUserPage}
            onAddUser={() => setIsAddUserModalOpen(true)}
            onEditUser={(user) => {
              setSelectedItem(user)
              setIsEditUserModalOpen(true)
            }}
            onDeleteUser={(user) => {
              setSelectedItem(user)
              setIsDeleteConfirmModalOpen(true)
            }}
            itemsPerPage={itemsPerPage}
          />
        )

      case "settings":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Cài đặt</h1>
              <p className="text-muted-foreground">Cấu hình hệ thống và tài khoản</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin cửa hàng</CardTitle>
                  <CardDescription>Cập nhật thông tin cơ bản của cửa hàng</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Tên cửa hàng</label>
                    <Input placeholder="Nhập tên cửa hàng" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Địa chỉ</label>
                    <Input placeholder="Nhập địa chỉ" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Số điện thoại</label>
                    <Input placeholder="Nhập số điện thoại" className="mt-1" />
                  </div>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Lưu thay đổi</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cài đặt hệ thống</CardTitle>
                  <CardDescription>Cấu hình các tùy chọn hệ thống</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Đơn vị tiền tệ</label>
                    <Input value="VND" disabled className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Múi giờ</label>
                    <Input value="Asia/Ho_Chi_Minh" disabled className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Ngôn ngữ</label>
                    <Input value="Tiếng Việt" disabled className="mt-1" />
                  </div>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Cập nhật</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <AddProductModal isOpen={isAddProductModalOpen} onClose={() => setIsAddProductModalOpen(false)} />
      <EditProductModal
        isOpen={isEditProductModalOpen}
        onClose={() => setIsEditProductModalOpen(false)}
        product={selectedItem}
      />
      <ViewOrderModal
        isOpen={isViewOrderModalOpen}
        onClose={() => setIsViewOrderModalOpen(false)}
        order={selectedItem}
      />
      <DeleteConfirmModal
        isOpen={isDeleteConfirmModalOpen}
        onClose={() => setIsDeleteConfirmModalOpen(false)}
        product={selectedItem}
        onConfirm={handleDeleteProduct}
      />
      <AddUserModal isOpen={isAddUserModalOpen} onClose={() => setIsAddUserModalOpen(false)} />
      <EditUserModal isOpen={isEditUserModalOpen} onClose={() => setIsEditUserModalOpen(false)} user={selectedItem} />

      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 ease-in-out lg:transform-none
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="flex items-center justify-between p-6 lg:justify-start">
          <div>
            <h2 className="text-xl font-bold text-sidebar-foreground">Admin Panel</h2>
            <p className="text-sm text-sidebar-foreground/70">Quản lý bán hàng</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-sidebar-foreground"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="px-4 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id)
                  setIsMobileMenuOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </button>
            )
          })}
        </nav>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-background border-b border-border px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsMobileMenuOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold text-foreground">
                  {sidebarItems.find((item) => item.id === activeTab)?.label || "Dashboard"}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/admin-avatar.png" alt="Admin" />
                      <AvatarFallback className="bg-primary text-primary-foreground">AD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Admin User</p>
                      <p className="text-xs leading-none text-muted-foreground">admin@example.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Thông tin cá nhân</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Cài đặt</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Trợ giúp</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Đăng xuất</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 lg:p-8">{renderContent()}</main>
      </div>
    </div>
  )
}
