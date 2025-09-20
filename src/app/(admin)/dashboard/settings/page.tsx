"use client";

import { Settings, Save, Bell, Shield, Palette, Database } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Cài đặt</h1>
        <p className="text-muted-foreground">
          Quản lý cài đặt hệ thống và tài khoản
        </p>
      </div>

      <div className="grid gap-6">
        {/* Thông tin cửa hàng */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Thông tin cửa hàng
            </CardTitle>
            <CardDescription>
              Cập nhật thông tin cơ bản của cửa hàng
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="store-name">Tên cửa hàng</Label>
                <Input id="store-name" placeholder="Nhập tên cửa hàng" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-email">Email</Label>
                <Input id="store-email" type="email" placeholder="store@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="store-address">Địa chỉ</Label>
              <Textarea id="store-address" placeholder="Nhập địa chỉ cửa hàng" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="store-phone">Số điện thoại</Label>
                <Input id="store-phone" placeholder="0123456789" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-website">Website</Label>
                <Input id="store-website" placeholder="https://example.com" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cài đặt thông báo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Thông báo
            </CardTitle>
            <CardDescription>
              Quản lý các thông báo và cảnh báo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Thông báo đơn hàng mới</Label>
                <p className="text-sm text-muted-foreground">
                  Nhận thông báo khi có đơn hàng mới
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Thông báo sản phẩm hết hàng</Label>
                <p className="text-sm text-muted-foreground">
                  Nhận cảnh báo khi sản phẩm sắp hết hàng
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Thông báo email</Label>
                <p className="text-sm text-muted-foreground">
                  Gửi thông báo qua email
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Bảo mật */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Bảo mật
            </CardTitle>
            <CardDescription>
              Cài đặt bảo mật và quyền truy cập
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">Mật khẩu mới</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Xác nhận mật khẩu</Label>
              <Input id="confirm-password" type="password" />
            </div>
          </CardContent>
        </Card>

        {/* Giao diện */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Giao diện
            </CardTitle>
            <CardDescription>
              Tùy chỉnh giao diện và chủ đề
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Chế độ tối</Label>
                <p className="text-sm text-muted-foreground">
                  Chuyển đổi giữa chế độ sáng và tối
                </p>
              </div>
              <Switch />
            </div>
            <div className="space-y-2">
              <Label>Ngôn ngữ</Label>
              <select className="w-full p-2 border rounded-md">
                <option value="vi">Tiếng Việt</option>
                <option value="en">English</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Dữ liệu */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Dữ liệu
            </CardTitle>
            <CardDescription>
              Quản lý và sao lưu dữ liệu
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Sao lưu dữ liệu</p>
                <p className="text-sm text-muted-foreground">
                  Tạo bản sao lưu dữ liệu hệ thống
                </p>
              </div>
              <Button variant="outline">Sao lưu</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Khôi phục dữ liệu</p>
                <p className="text-sm text-muted-foreground">
                  Khôi phục từ bản sao lưu
                </p>
              </div>
              <Button variant="outline">Khôi phục</Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Lưu cài đặt
          </Button>
        </div>
      </div>
    </div>
  );
}
