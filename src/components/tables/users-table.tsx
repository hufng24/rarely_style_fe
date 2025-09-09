"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Eye, Edit, Trash2, Search, Plus } from "lucide-react"
import { Pagination } from "@/components/pagination"

interface User {
  id: number
  name: string
  email: string
  phone: string
  role: string
  status: string
  lastLogin: string
}

interface UsersTableProps {
  users: User[]
  currentPage: number
  onPageChange: (page: number) => void
  onAddUser: () => void
  onEditUser: (user: User) => void
  onDeleteUser: (user: User) => void
  itemsPerPage: number
}

export function UsersTable({
  users,
  currentPage,
  onPageChange,
  onAddUser,
  onEditUser,
  onDeleteUser,
  itemsPerPage,
}: UsersTableProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex)
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: "Hoạt động", variant: "default" as const },
      inactive: { label: "Không hoạt động", variant: "secondary" as const },
    }
    return statusConfig[status as keyof typeof statusConfig] || { label: status, variant: "outline" as const }
  }

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      admin: { label: "Quản trị viên", variant: "default" as const },
      manager: { label: "Quản lý", variant: "secondary" as const },
      staff: { label: "Nhân viên", variant: "outline" as const },
      customer: { label: "Khách hàng", variant: "secondary" as const },
    }
    return roleConfig[role as keyof typeof roleConfig] || { label: role, variant: "outline" as const }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý người dùng</h1>
          <p className="text-muted-foreground">Quản lý tài khoản và phân quyền người dùng</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={onAddUser}>
          <Plus className="h-4 w-4 mr-2" />
          Thêm người dùng
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm người dùng..."
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
                  <th className="text-left p-4 font-medium text-muted-foreground">Người dùng</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Email</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Số điện thoại</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Vai trò</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Trạng thái</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Đăng nhập cuối</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-muted/30">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="font-medium text-foreground">{user.name}</div>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground">{user.email}</td>
                    <td className="p-4 text-muted-foreground">{user.phone}</td>
                    <td className="p-4">
                      <Badge variant={getRoleBadge(user.role).variant}>{getRoleBadge(user.role).label}</Badge>
                    </td>
                    <td className="p-4">
                      <Badge variant={getStatusBadge(user.status).variant}>{getStatusBadge(user.status).label}</Badge>
                    </td>
                    <td className="p-4 text-muted-foreground">{user.lastLogin}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => onEditUser(user)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => onDeleteUser(user)}
                        >
                          <Trash2 className="h-4 w-4" />
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
