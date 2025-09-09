"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Eye, Edit, Trash2, Search, Plus, ChevronDown, ChevronRight } from "lucide-react"
import { Pagination } from "@/components/pagination"
import type { Product } from "@/config/products"

interface ProductsTableProps {
  products: Product[]
  currentPage: number
  onPageChange: (page: number) => void
  onAddProduct: () => void
  onEditProduct: (product: Product) => void
  onDeleteProduct: (product: Product) => void
  itemsPerPage: number
}

export function ProductsTable({
  products,
  currentPage,
  onPageChange,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  itemsPerPage,
}: ProductsTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedProducts, setExpandedProducts] = useState<Set<number>>(new Set())

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.baseSku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: "Hoạt động", variant: "default" as const },
      inactive: { label: "Không hoạt động", variant: "secondary" as const },
      out_of_stock: { label: "Hết hàng", variant: "destructive" as const },
    }
    return statusConfig[status as keyof typeof statusConfig] || { label: status, variant: "outline" as const }
  }

  const toggleProductExpansion = (productId: number) => {
    const newExpanded = new Set(expandedProducts)
    if (newExpanded.has(productId)) {
      newExpanded.delete(productId)
    } else {
      newExpanded.add(productId)
    }
    setExpandedProducts(newExpanded)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý sản phẩm</h1>
          <p className="text-muted-foreground">Quản lý danh sách sản phẩm và biến thể của cửa hàng</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={onAddProduct}>
          <Plus className="h-4 w-4 mr-2" />
          Thêm sản phẩm
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm sản phẩm..."
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
                  <th className="text-left p-4 font-medium text-muted-foreground">Sản phẩm</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">SKU gốc</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Danh mục</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Thương hiệu</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Giá từ</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Tổng tồn kho</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Biến thể</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Trạng thái</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProducts.map((product) => (
                  <>
                    <tr key={product.id} className="border-b hover:bg-muted/30">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover border"
                          />
                          <div>
                            <div className="font-medium text-foreground">{product.name}</div>
                            <div className="text-sm text-muted-foreground">{product.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground font-mono text-sm">{product.baseSku}</td>
                      <td className="p-4 text-muted-foreground">{product.category}</td>
                      <td className="p-4 text-muted-foreground">{product.brand}</td>
                      <td className="p-4 text-foreground font-medium">
                        {Math.min(...product.variants.map((v) => v.price)).toLocaleString()} ₫
                      </td>
                      <td className="p-4">
                        <span className={`${product.totalStock === 0 ? "text-destructive" : "text-muted-foreground"}`}>
                          {product.totalStock}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{product.variants.length} biến thể</Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleProductExpansion(product.id)}
                            className="p-1"
                          >
                            {expandedProducts.has(product.id) ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant={getStatusBadge(product.status).variant}>
                          {getStatusBadge(product.status).label}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => onEditProduct(product)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => onDeleteProduct(product)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>

                    {expandedProducts.has(product.id) &&
                      product.variants.map((variant, index) => (
                        <tr key={`${product.id}-variant-${variant.id}`} className="bg-muted/20 border-b">
                          <td className="p-4 pl-12">
                            <div className="flex items-center gap-3">
                              {variant.image && (
                                <img
                                  src={variant.image || "/placeholder.svg"}
                                  alt={variant.name}
                                  className="w-8 h-8 rounded object-cover border"
                                />
                              )}
                              <div>
                                <div className="text-sm font-medium text-foreground">↳ {variant.name}</div>
                                <div className="text-xs text-muted-foreground">
                                  {variant.attributes.color && `Màu: ${variant.attributes.color}`}
                                  {variant.attributes.color && variant.attributes.storage && " • "}
                                  {variant.attributes.storage && `Dung lượng: ${variant.attributes.storage}`}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-muted-foreground font-mono text-sm">{variant.sku}</td>
                          <td className="p-4 text-muted-foreground">-</td>
                          <td className="p-4 text-muted-foreground">-</td>
                          <td className="p-4 text-foreground font-medium">{variant.price.toLocaleString()} ₫</td>
                          <td className="p-4">
                            <span className={`${variant.stock === 0 ? "text-destructive" : "text-muted-foreground"}`}>
                              {variant.stock}
                            </span>
                          </td>
                          <td className="p-4">
                            <Badge variant="secondary" className="text-xs">
                              Biến thể {index + 1}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <Badge variant={variant.stock > 0 ? "default" : "destructive"} className="text-xs">
                              {variant.stock > 0 ? "Còn hàng" : "Hết hàng"}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </>
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
