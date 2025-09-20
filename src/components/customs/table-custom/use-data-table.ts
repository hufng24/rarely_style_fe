"use client"

import { useState, useEffect } from "react"
import { ApiResponse } from "./api"

interface UseDataTableParams<T> {
  service: (params: {
    page: number
    size: number
    search?: string
    sortBy?: string
    sortOrder?: "asc" | "desc"
  }) => Promise<ApiResponse<T>>
  pageSize?: number
}

export function useDataTable<T>({ service, pageSize = 10 }: UseDataTableParams<T>) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState<string>("")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  // fetchData function đơn giản, không dùng useCallback
  const fetchData = async (page: number) => {
    console.log("🔄 fetchData called with page:", page)
    console.log("📊 Current state:", {
      currentPage,
      search,
      sortBy,
      sortOrder,
      pageSize
    })
    
    try {
      setLoading(true)
      setError(null)

      const response = await service({
        page, // API 0-based index
        size: pageSize,
        search: search || undefined,
        sortBy: sortBy || undefined,
        sortOrder,
      })

      console.log("✅ API Response:", response)
      setData(response.data)
      setTotalPages(response.metadata.totalPage)
      setTotal(response.metadata.total)
    } catch (err) {
      console.error("❌ API Error:", err)
      setError(err instanceof Error ? err.message : "An error occurred")
      setData([])
    } finally {
      setLoading(false)
    }
  }

  // fetch data khi currentPage thay đổi
  useEffect(() => {
    console.log("🎯 useEffect triggered - currentPage:", currentPage)
    fetchData(currentPage)
  }, [currentPage])

  // fetch data khi search, sort thay đổi (reset về trang 0)
  useEffect(() => {
    if (currentPage === 0) {
      console.log("🎯 useEffect triggered - search/sort changed, currentPage:", currentPage)
      fetchData(0)
    }
  }, [search, sortBy, sortOrder])

  const handleSearch = (searchTerm: string) => {
    console.log("🔍 handleSearch called with:", searchTerm)
    // Chỉ update search nếu khác với giá trị hiện tại
    if (searchTerm !== search) {
      setSearch(searchTerm)
      setCurrentPage(0) // reset về trang đầu khi search
    }
  }

  const handleSort = (column: string) => {
    console.log("🔄 handleSort called with column:", column)
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("asc")
    }
    setCurrentPage(0) // reset về trang đầu khi sort
  }

  const handlePageChange = (page: number) => {
    console.log("📄 handlePageChange called with page:", page)
    console.log("📄 Current page before change:", currentPage)
    setCurrentPage(page) // chỉ đổi trang
  }

  const refresh = () => {
    console.log("🔄 refresh called with currentPage:", currentPage)
    fetchData(currentPage) // refresh đúng trang hiện tại
  }

  return {
    data,
    loading,
    error,
    currentPage,
    totalPages,
    total,
    search,
    sortBy,
    sortOrder,
    handleSearch,
    handleSort,
    handlePageChange,
    refresh,
  }
}
