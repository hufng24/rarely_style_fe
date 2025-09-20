
// API response interfaces
export interface ApiResponse<T> {
  data: T[]
  metadata: {
    page: number
    size: number
    total: number
    totalPage: number
  }
}

export interface TableColumn<T> {
  key: keyof T | string
  title: string
  render?: (value: any, record: T, index: number) => React.ReactNode
  sortable?: boolean
  searchable?: boolean
  width?: string
}

export interface DataTableProps<T> {
  columns: TableColumn<T>[]
  service: (params: {
    page: number
    size: number
    search?: string
    sortBy?: string
    sortOrder?: "asc" | "desc"
  }) => Promise<ApiResponse<T>>
  pageSize?: number
  searchPlaceholder?: string
  onEdit?: (record: T) => void
  onDelete?: (record: T) => void
  showActions?: boolean
  loading?: boolean
  reloadKey?: number
}
import type React from "react"
// API response interfaces
export interface ApiResponse<T> {
  data: T[]
  metadata: {
    page: number
    size: number
    total: number
    totalPage: number
  }
}

export interface TableColumn<T> {
  key: keyof T | string
  title: string
  render?: (value: any, record: T, index: number) => React.ReactNode
  sortable?: boolean
  searchable?: boolean
  width?: string
}

export interface DataTableProps<T> {
  columns: TableColumn<T>[]
  service: (params: {
    page: number
    size: number
    search?: string
    sortBy?: string
    sortOrder?: "asc" | "desc"
  }) => Promise<ApiResponse<T>>
  pageSize?: number
  searchPlaceholder?: string
  onEdit?: (record: T) => void
  onDelete?: (record: T) => void
  showActions?: boolean
  loading?: boolean
  reloadKey?: number
}
