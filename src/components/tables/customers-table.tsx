"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Eye, Edit, Search } from "lucide-react"
import { Pagination } from "@/components/pagination"

export interface Color {
  id: number
  code: string
  name: string
  createdAt: string
}

interface ColorTableProps {
  colors: Color[]
  currentPage: number
  onPageChange: (page: number) => void
  itemsPerPage: number
}

export function ColorsTable({ colors, currentPage, onPageChange, itemsPerPage }: ColorTableProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredColors = colors.filter(
    (color) =>
      color.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      color.code.toLowerCase().includes(searchTerm.toLowerCase()) 
      // color.phone.includes(searchTerm),
  )

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedColors = filteredColors.slice(startIndex, endIndex)
  const totalPages = Math.ceil(filteredColors.length / itemsPerPage)

 

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Quản lý Màu Sắc</h1>
        {/* <p className="text-muted-foreground">Danh sách và thông tin khách hàng</p> */}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm màu sắc..."
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
                  <th className="text-left p-4 font-medium text-muted-foreground">ID</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Mã Màu</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Tên Màu</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Ngày Tạo</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {paginatedColors.map((color) => (
                  <tr key={color.id} className="border-b hover:bg-muted/30">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="font-medium text-foreground">{color.id}</div>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground">{color.code}</td>
                    <td className="p-4 text-muted-foreground">{color.name}</td>
                    <td className="p-4 text-muted-foreground">{color.createdAt}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
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
