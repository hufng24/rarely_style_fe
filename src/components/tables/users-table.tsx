"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Eye, Edit, Trash2, Search, Plus } from "lucide-react";
import { Pagination } from "@/components/pagination";
import { UserResponse } from "@/types/response/user-response";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatDate, formatGender } from "@/lib/utils";
import { Metadata } from "@/types/response/base-response";


interface UsersTableProps {
  users: UserResponse[];
  currentPage: number;
  onPageChange: (page: number) => void;
  onAddUser: () => void;
  onEditUser: (user: UserResponse) => void;
  onDeleteUser: (user: UserResponse) => void;
  itemsPerPage: number;
  metadata: Metadata | undefined;
  onChangeFilter: (valueSearch:string) => void
  searchTerm:string
}

export function UsersTable({
  users,
  currentPage,
  onPageChange,
  onAddUser,
  onEditUser,
  onDeleteUser,
  itemsPerPage,
  searchTerm,
  onChangeFilter,
  metadata
}: UsersTableProps) {



 
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: "Hoạt động", variant: "default" as const },
      inactive: { label: "Không hoạt động", variant: "secondary" as const },
    };
    return (
      statusConfig[status as keyof typeof statusConfig] || {
        label: status,
        variant: "outline" as const,
      }
    );
  };

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      admin: { label: "Quản trị viên", variant: "default" as const },
      manager: { label: "Quản lý", variant: "secondary" as const },
      staff: { label: "Nhân viên", variant: "outline" as const },
      customer: { label: "Khách hàng", variant: "secondary" as const },
    };
    return (
      roleConfig[role as keyof typeof roleConfig] || {
        label: role,
        variant: "outline" as const,
      }
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Quản lý người dùng
          </h1>
          <p className="text-muted-foreground">
            Quản lý tài khoản và phân quyền người dùng
          </p>
        </div>
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={onAddUser}
        >
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
            onChange={(e) => onChangeFilter(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-medium text-muted-foreground">
                    ID
                  </th>
                  <th className="text-left p-4 font-medium text-muted-foreground">
                    Họ và tên
                  </th>
                  <th className="text-left p-4 font-medium text-muted-foreground">
                    Email
                  </th>
                  <th className="text-left p-4 font-medium text-muted-foreground">
                    Số điện thoại
                  </th>
                  <th className="text-left p-4 font-medium text-muted-foreground">
                    Vai trò
                  </th>
                  <th className="text-left p-4 font-medium text-muted-foreground">
                    Giới tính
                  </th>
                  <th className="text-left p-4 font-medium text-muted-foreground">
                    Trạng thái
                  </th>
                  <th className="text-left p-4 font-medium text-muted-foreground">
                    Ngày tạo
                  </th>
                  <th className="text-left p-4 font-medium text-muted-foreground">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-muted/30">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="font-medium text-foreground">
                          {user.id}
                        </div>
                      </div>
                    </td>
                    <div className="flex items-center gap-3 p-4 text-muted-foreground">
                       <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} alt={user.fullName} />
                          <AvatarFallback>
                            {user.fullName.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      {user.fullName}
                    </div>
                    <td className="p-4 text-muted-foreground">{user.email}</td>
                    <td className="p-4 text-muted-foreground">
                      {user.phoneNumber || "Không có số điện thoại"}
                    </td>
                    <td className="p-4">
                      {user.roles && user.roles.length > 0 ? (
                        user.roles.map((role) => (
                          <Badge
                            key={role}
                            variant={getRoleBadge(role).variant}
                          >
                            {getRoleBadge(role).label}
                          </Badge>
                        ))
                      ) : (
                        <Badge variant="secondary">No Role</Badge>
                      )}
                    </td>
                    <td className="p-4 text-muted-foreground">{formatGender(user.gender)}</td>

                    <td className="p-4">
                      <Badge variant={getStatusBadge(user.status).variant}>
                        {getStatusBadge(user.status).label}
                      </Badge>
                    </td>
                    <td className="p-4 text-muted-foreground">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEditUser(user)}
                        >
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
            <Pagination
              currentPage={currentPage}
              totalPages={Number(metadata?.totalPage)}
              onPageChange={onPageChange}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
