"use client";

import { Users, UserPlus, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function UsersPage() {
  const users = [
    { id: 1, name: "Nguyễn Văn A", email: "nguyenvana@email.com", role: "Admin", status: "Active" },
    { id: 2, name: "Trần Thị B", email: "tranthib@email.com", role: "User", status: "Active" },
    { id: 3, name: "Lê Văn C", email: "levanc@email.com", role: "User", status: "Inactive" },
    { id: 4, name: "Phạm Thị D", email: "phamthid@email.com", role: "Moderator", status: "Active" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quản lý người dùng</h1>
          <p className="text-muted-foreground">
            Quản lý tài khoản và quyền hạn người dùng
          </p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Thêm người dùng
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách người dùng</CardTitle>
          <CardDescription>
            Quản lý tất cả người dùng trong hệ thống
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Tìm kiếm người dùng..." className="pl-8" />
            </div>
          </div>
          
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                  <span className="text-sm text-muted-foreground">{user.role}</span>
                  <Button variant="outline" size="sm">
                    Chỉnh sửa
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
