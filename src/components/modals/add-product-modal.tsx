"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus, Upload, X, ImageIcon } from "lucide-react"
import {
  productCategories,
  productBrands,
  variantColors,
  variantStorages,
  type ProductVariant,
} from "@/config/products"

interface AddProductModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddProductModal({ isOpen, onClose }: AddProductModalProps) {
  const [variants, setVariants] = useState<ProductVariant[]>([])
  const [currentVariant, setCurrentVariant] = useState({
    name: "",
    price: "",
    stock: "",
    sku: "",
    color: "",
    storage: "",
    images: [] as string[],
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setCurrentVariant({
        ...currentVariant,
        images: [...currentVariant.images, ...newImages],
      })
    }
  }

  const removeImage = (index: number) => {
    const newImages = currentVariant.images.filter((_, i) => i !== index)
    setCurrentVariant({ ...currentVariant, images: newImages })
  }

  const addVariant = () => {
    if (currentVariant.name && currentVariant.price && currentVariant.stock) {
      const newVariant: ProductVariant = {
        id: `variant-${Date.now()}`,
        name: currentVariant.name,
        price: Number.parseInt(currentVariant.price),
        stock: Number.parseInt(currentVariant.stock),
        sku: currentVariant.sku,
        attributes: {
          color: currentVariant.color || undefined,
          storage: currentVariant.storage || undefined,
        },
        images: currentVariant.images,
      }
      setVariants([...variants, newVariant])
      setCurrentVariant({
        name: "",
        price: "",
        stock: "",
        sku: "",
        color: "",
        storage: "",
        images: [],
      })
    }
  }

  const removeVariant = (id: string) => {
    setVariants(variants.filter((v) => v.id !== id))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Thêm sản phẩm mới</DialogTitle>
          <DialogDescription>Nhập thông tin sản phẩm mới và các biến thể vào form bên dưới.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Thông tin cơ bản</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Tên sản phẩm</Label>
                <Input id="name" placeholder="iPhone 15 Pro Max" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="baseSku">SKU gốc</Label>
                <Input id="baseSku" placeholder="IP15PM" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Danh mục</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    {productCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand">Thương hiệu</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn thương hiệu" />
                  </SelectTrigger>
                  <SelectContent>
                    {productBrands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Mô tả</Label>
              <Textarea id="description" placeholder="Mô tả sản phẩm..." />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Biến thể sản phẩm</h3>

            {/* Add variant form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Thêm biến thể mới</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="variantName">Tên biến thể</Label>
                    <Input
                      id="variantName"
                      placeholder="128GB - Đen"
                      value={currentVariant.name}
                      onChange={(e) => setCurrentVariant({ ...currentVariant, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="variantSku">SKU</Label>
                    <Input
                      id="variantSku"
                      placeholder="IP15PM-128-BLK"
                      value={currentVariant.sku}
                      onChange={(e) => setCurrentVariant({ ...currentVariant, sku: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="variantPrice">Giá (VNĐ)</Label>
                    <Input
                      id="variantPrice"
                      type="number"
                      placeholder="25000000"
                      value={currentVariant.price}
                      onChange={(e) => setCurrentVariant({ ...currentVariant, price: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="variantStock">Tồn kho</Label>
                    <Input
                      id="variantStock"
                      type="number"
                      placeholder="50"
                      value={currentVariant.stock}
                      onChange={(e) => setCurrentVariant({ ...currentVariant, stock: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="variantColor">Màu sắc</Label>
                    <Select
                      value={currentVariant.color}
                      onValueChange={(value) => setCurrentVariant({ ...currentVariant, color: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn màu" />
                      </SelectTrigger>
                      <SelectContent>
                        {variantColors.map((color) => (
                          <SelectItem key={color} value={color}>
                            {color}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="variantStorage">Dung lượng</Label>
                    <Select
                      value={currentVariant.storage}
                      onValueChange={(value) => setCurrentVariant({ ...currentVariant, storage: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn dung lượng" />
                      </SelectTrigger>
                      <SelectContent>
                        {variantStorages.map((storage) => (
                          <SelectItem key={storage} value={storage}>
                            {storage}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="variantColor">Màu sắc</Label>
                    <Select
                      value={currentVariant.color}
                      onValueChange={(value) => setCurrentVariant({ ...currentVariant, color: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn màu" />
                      </SelectTrigger>
                      <SelectContent>
                        {variantColors.map((color) => (
                          <SelectItem key={color} value={color}>
                            {color}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Upload and manage images for variant */}
                <div className="space-y-2">
                  <Label>Hình ảnh biến thể</Label>
                  <div className="space-y-3">
                    {/* Upload button */}
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("variant-image-upload")?.click()}
                        className="flex items-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        Thêm ảnh
                      </Button>
                      <input
                        id="variant-image-upload"
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      <span className="text-sm text-muted-foreground">{currentVariant.images.length} ảnh đã chọn</span>
                    </div>

                    {/* Image preview grid */}
                    {currentVariant.images.length > 0 && (
                      <div className="grid grid-cols-4 gap-3">
                        {currentVariant.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <div className="aspect-square rounded-lg border-2 border-dashed border-gray-300 overflow-hidden">
                              <img
                                src={image || "/placeholder.svg"}
                                alt={`Variant image ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeImage(index)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={addVariant} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm biến thể
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Variants list */}
            {variants.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Danh sách biến thể ({variants.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {variants.map((variant) => (
                      <div key={variant.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{variant.name}</span>
                              <Badge variant="outline">{variant.sku}</Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Giá: {variant.price.toLocaleString()} ₫ • Tồn kho: {variant.stock}
                              {variant.attributes.color && ` • Màu: ${variant.attributes.color}`}
                              {variant.attributes.storage && ` • Dung lượng: ${variant.attributes.storage}`}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeVariant(variant.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Display images of variant */}
                        {variant.images.length > 0 && (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm font-medium">
                              <ImageIcon className="w-4 h-4" />
                              Hình ảnh ({variant.images.length})
                            </div>
                            <div className="grid grid-cols-6 gap-2">
                              {variant.images.map((image, index) => (
                                <div key={index} className="aspect-square rounded border overflow-hidden">
                                  <img
                                    src={image || "/placeholder.svg"}
                                    alt={`${variant.name} image ${index + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button onClick={onClose}>Thêm sản phẩm ({variants.length} biến thể)</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
