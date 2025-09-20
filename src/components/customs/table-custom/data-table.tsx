"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, ArrowUpDown, ArrowUp, ArrowDown, RefreshCw } from "lucide-react"
import { ConfirmationDialog } from "./confirmation-dialog"

import { SearchInput } from "./search-input"
import { Pagination } from "./pagination"
import { DataTableProps, TableColumn } from "./api"
import { useDataTable } from "./use-data-table"

export function DataTable<T extends Record<string, any>>({
  columns,
  service,
  pageSize = 10,
  searchPlaceholder = "Tìm kiếm...",
  onEdit,
  onDelete,
  showActions = true,
  reloadKey,
}: DataTableProps<T>) {
  const {
    data,
    loading,
    error,
    currentPage,
    totalPages,
    total,
    sortBy,
    sortOrder,
    handleSearch,
    handleSort,
    handlePageChange,
    refresh,
  } = useDataTable({ service, pageSize })

  // When reloadKey changes, refresh data but keep current page
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (reloadKey !== undefined) {
      refresh()
    }
  }, [reloadKey])

  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean
    record: T | null
  }>({ open: false, record: null })

  const handleDeleteClick = (record: T) => {
    setDeleteDialog({ open: true, record })
  }

  const handleDeleteConfirm = () => {
    if (deleteDialog.record && onDelete) {
      onDelete(deleteDialog.record)
      setDeleteDialog({ open: false, record: null })
      // Refresh data after delete
      setTimeout(() => refresh(), 100)
    }
  }

  const renderCellValue = (column: TableColumn<T>, record: T, index: number) => {
    if (column.render) {
      return column.render(record[column.key as keyof T], record, index)
    }

    const value = record[column.key as keyof T]

    // Handle different data types
    if (value === null || value === undefined) {
      return <span className="text-muted-foreground">-</span>
    }

    if (typeof value === "boolean") {
      return <Badge variant={value ? "default" : "secondary"}>{value ? "Có" : "Không"}</Badge>
    }

    if (typeof value === "object") {
      return <span className="text-muted-foreground">Object</span>
    }

    return String(value)
  }

  const getSortIcon = (columnKey: string) => {
    if (sortBy !== columnKey) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />
    }
    return sortOrder === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-destructive">
            <p>Có lỗi xảy ra: {error}</p>
            <Button onClick={refresh} className="mt-4">
              <RefreshCw className="mr-2 h-4 w-4" />
              Thử lại
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (loading && columns.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />
            <p>Đang tải dữ liệu...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (columns.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            <p>Chưa có cấu hình cột nào. Vui lòng kiểm tra dữ liệu hoặc cấu hình columns.</p>
            <Button onClick={refresh} className="mt-4 bg-transparent" variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Thử lại
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <SearchInput onSearch={handleSearch} placeholder={searchPlaceholder} />
            <Button onClick={refresh} variant="outline" size="sm" disabled={loading}>
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Làm mới
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="relative">
            {loading && (
              <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-10">
                <RefreshCw className="h-6 w-6 animate-spin" />
              </div>
            )}

            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((column:any, index:any) => (
                    <TableHead
                      key={index}
                      style={{ width: column.width }}
                      className={column.sortable ? "cursor-pointer select-none" : ""}
                      onClick={() => column.sortable && handleSort(String(column.key))}
                    >
                      <div className="flex items-center">
                        {column.title}
                        {column.sortable && getSortIcon(String(column.key))}
                      </div>
                    </TableHead>
                  ))}
                  {showActions && (onEdit || onDelete) && <TableHead className="w-[120px]">Hành động</TableHead>}
                </TableRow>
              </TableHeader>

              <TableBody>
                {data.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length + (showActions ? 1 : 0)}
                      className="text-center py-8 text-muted-foreground"
                    >
                      {loading ? "Đang tải..." : "Không có dữ liệu"}
                    </TableCell>
                  </TableRow>
                ) : (
                  data.map((record:any, index:any) => (
                    <TableRow key={index}>
                      {columns.map((column:any, colIndex:any) => (
                        <TableCell key={colIndex}>{renderCellValue(column, record, index)}</TableCell>
                      ))}
                      {showActions && (onEdit || onDelete) && (
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {onEdit && (
                              <Button variant="ghost" size="sm" onClick={() => onEdit(record)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                            )}
                            {onDelete && (
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteClick(record)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          total={total}
          pageSize={pageSize}
        />
      )}

      <ConfirmationDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open, record: null })}
        title="Xác nhận xóa"
        description="Bạn có chắc chắn muốn xóa mục này? Hành động này không thể hoàn tác."
        onConfirm={handleDeleteConfirm}
        confirmText="Xóa"
        cancelText="Hủy"
        variant="destructive"
      />
    </div>
  )
}
