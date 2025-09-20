export interface ProductVariant {
  id: string
  name: string
  price: number
  stock: number
  sku: string
  attributes: {
    color?: string
    size?: string
    storage?: string
    [key: string]: string | undefined
  }
  images: string[]
}

export interface Product {
  id: number
  name: string
  category: string
  basePrice: number
  status: "active" | "inactive" | "out_of_stock"
  image: string
  description: string
  baseSku: string
  brand: string
  variants: ProductVariant[]
  totalStock: number
}

export const productCategories = [
  "Điện thoại",
  "Laptop",
  "Phụ kiện",
  "Tablet",
  "Đồng hồ thông minh",
  "Tai nghe",
] as const

export const productBrands = ["Apple", "Samsung", "Dell", "Sony", "Xiaomi", "Huawei", "Oppo", "Vivo"] as const

export const productStatuses = [
  { value: "active", label: "Hoạt động" },
  { value: "inactive", label: "Không hoạt động" },
  { value: "out_of_stock", label: "Hết hàng" },
] as const

export const defaultProducts: Product[] = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    category: "Điện thoại",
    basePrice: 25000000,
    status: "active",
    image: "/iphone-15-pro.png",
    description: "Điện thoại thông minh cao cấp với chip A17 Pro",
    baseSku: "IP15P",
    brand: "Apple",
    totalStock: 85,
    variants: [
      {
        id: "ip15p-128-black",
        name: "128GB - Đen",
        price: 25000000,
        stock: 20,
        sku: "IP15P-128-BLK",
        attributes: { storage: "128GB", color: "Đen" },
        images: ["/iphone-15-pro.png"],
      },
      {
        id: "ip15p-256-black",
        name: "256GB - Đen",
        price: 28000000,
        stock: 15,
        sku: "IP15P-256-BLK",
        attributes: { storage: "256GB", color: "Đen" },
        images: [],
      },
      {
        id: "ip15p-128-white",
        name: "128GB - Trắng",
        price: 25000000,
        stock: 25,
        sku: "IP15P-128-WHT",
        attributes: { storage: "128GB", color: "Trắng" },
        images: [],
      },
      {
        id: "ip15p-256-white",
        name: "256GB - Trắng",
        price: 28000000,
        stock: 25,
        sku: "IP15P-256-WHT",
        attributes: { storage: "256GB", color: "Trắng" },
        images: [],
      },
    ],
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    category: "Điện thoại",
    basePrice: 22000000,
    status: "active",
    image: "/samsung-galaxy-s24-smartphone.png",
    description: "Flagship Android với camera AI tiên tiến",
    baseSku: "SGS24",
    brand: "Samsung",
    totalStock: 60,
    variants: [
      {
        id: "sgs24-128-black",
        name: "128GB - Đen",
        price: 22000000,
        stock: 20,
        sku: "SGS24-128-BLK",
        attributes: { storage: "128GB", color: "Đen" },
        images: [],
      },
      {
        id: "sgs24-256-violet",
        name: "256GB - Tím",
        price: 25000000,
        stock: 15,
        sku: "SGS24-256-VLT",
        attributes: { storage: "256GB", color: "Tím" },
        images: [],
      },
      {
        id: "sgs24-128-cream",
        name: "128GB - Kem",
        price: 22000000,
        stock: 25,
        sku: "SGS24-128-CRM",
        attributes: { storage: "128GB", color: "Kem" },
        images: [],
      },
    ],
  },
  {
    id: 3,
    name: "MacBook Air M3",
    category: "Laptop",
    basePrice: 35000000,
    status: "active",
    image: "/macbook-air-m3-laptop.png",
    description: "Laptop siêu mỏng với chip M3 mạnh mẽ",
    baseSku: "MBA-M3",
    brand: "Apple",
    totalStock: 30,
    variants: [
      {
        id: "mba-m3-256-silver",
        name: "256GB - Bạc",
        price: 35000000,
        stock: 12,
        sku: "MBA-M3-256-SLV",
        attributes: { storage: "256GB", color: "Bạc" },
        images: [],
      },
      {
        id: "mba-m3-512-silver",
        name: "512GB - Bạc",
        price: 42000000,
        stock: 8,
        sku: "MBA-M3-512-SLV",
        attributes: { storage: "512GB", color: "Bạc" },
        images: [],
      },
      {
        id: "mba-m3-256-gold",
        name: "256GB - Vàng",
        price: 35000000,
        stock: 10,
        sku: "MBA-M3-256-GLD",
        attributes: { storage: "256GB", color: "Vàng" },
        images: [],
      },
    ],
  },
  {
    id: 4,
    name: "AirPods Pro",
    category: "Phụ kiện",
    basePrice: 6500000,
    status: "out_of_stock",
    image: "/airpods-pro-wireless-earbuds.png",
    description: "Tai nghe không dây với chống ồn chủ động",
    baseSku: "APP",
    brand: "Apple",
    totalStock: 0,
    variants: [
      {
        id: "app-white",
        name: "Trắng",
        price: 6500000,
        stock: 0,
        sku: "APP-WHT",
        attributes: { color: "Trắng" },
        images: [],
      },
    ],
  },
  {
    id: 5,
    name: "Dell XPS 13",
    category: "Laptop",
    basePrice: 28000000,
    status: "active",
    image: "/dell-xps-13-laptop.png",
    description: "Laptop cao cấp với màn hình InfinityEdge",
    baseSku: "DXS13",
    brand: "Dell",
    totalStock: 35,
    variants: [
      {
        id: "dxs13-512-silver",
        name: "512GB - Bạc",
        price: 28000000,
        stock: 18,
        sku: "DXS13-512-SLV",
        attributes: { storage: "512GB", color: "Bạc" },
        images: [],
      },
      {
        id: "dxs13-1tb-black",
        name: "1TB - Đen",
        price: 35000000,
        stock: 17,
        sku: "DXS13-1TB-BLK",
        attributes: { storage: "1TB", color: "Đen" },
        images: [],
      },
    ],
  },
  {
    id: 6,
    name: "Sony WH-1000XM5",
    category: "Phụ kiện",
    basePrice: 8500000,
    status: "active",
    image: "/sony-wh-1000xm5.png",
    description: "Tai nghe chống ồn hàng đầu thế giới",
    baseSku: "SWH-1000XM5",
    brand: "Sony",
    totalStock: 40,
    variants: [
      {
        id: "swh-black",
        name: "Đen",
        price: 8500000,
        stock: 25,
        sku: "SWH-1000XM5-BLK",
        attributes: { color: "Đen" },
        images: [],
      },
      {
        id: "swh-silver",
        name: "Bạc",
        price: 8500000,
        stock: 15,
        sku: "SWH-1000XM5-SLV",
        attributes: { color: "Bạc" },
        images: [],
      },
    ],
  },
]

export const variantColors = ["Đen", "Trắng", "Bạc", "Vàng", "Xanh", "Đỏ", "Tím", "Hồng", "Kem", "Xám"] as const

export const variantSizes = ["XS", "S", "M", "L", "XL", "XXL"] as const

export const variantStorages = ["64GB", "128GB", "256GB", "512GB", "1TB", "2TB"] as const
