"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  Settings,
  Palette,
  Ruler,
  Layers,
  Tag,
  Grid,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


// ===== JSON cấu hình =====
const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3, path: "/dashboard/dashboard" },
  {
    id: "products",
    label: "Sản phẩm",
    icon: Package,
    children: [
      { id: "categories", label: "Danh mục", icon: Grid, path: "/dashboard/categories" },
      { id: "colors", label: "Màu sắc", icon: Palette, path: "/dashboard/test-table" },
      { id: "sizes", label: "Kích thước", icon: Ruler, path: "/dashboard/size" },
      { id: "brands", label: "Thương hiệu", icon: Tag, path: "/dashboard/brand" },
      { id: "materials", label: "Chất liệu", icon: Layers, path: "/dashboard/material" },
    ],
  },
  { 
    id: "orders", 
    label: "Đơn hàng", 
    icon: ShoppingCart,
    children: [
      { id: "hung", label: "hung", icon: Grid, path: "/dashboard/hung" },
    ]
  },
  { id: "users", label: "Người dùng", icon: Users, path: "/dashboard/users" },
  { id: "settings", label: "Cài đặt", icon: Settings, path: "/dashboard/settings" },
];

interface AdminDashboardProps {
  children?: React.ReactNode;
}

export function AdminDashboard({ children }: AdminDashboardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  // Lấy activeTab từ pathname hiện tại
  const getActiveTabFromPath = () => {
    const allItems = sidebarItems.flatMap(item => 
      item.children ? [item, ...item.children] : [item]
    );
    const currentItem = allItems.find(item => item.path === pathname);
    return currentItem?.id || "dashboard";
  };

  const activeTab = getActiveTabFromPath();

  // Set expanded menus dựa trên path hiện tại
  useEffect(() => {
    const parentItem = sidebarItems.find(item => 
      item.children?.some(child => child.path === pathname)
    );
    if (parentItem) {
      setExpandedMenus([parentItem.id]);
    }
  }, [pathname]);

  const handleChangeTab = (id: string) => {
    const allItems = sidebarItems.flatMap(item => 
      item.children ? [item, ...item.children] : [item]
    );
    const targetItem = allItems.find(item => item.id === id);
    
    if (targetItem?.path) {
      router.push(targetItem.path);
      setIsMobileMenuOpen(false);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedMenus((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Không cần renderContent nữa vì sử dụng routing

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 ease-in-out lg:transform-none ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}>
        <div className="flex items-center justify-between p-6 lg:justify-start">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            ✖
          </Button>
        </div>

        <nav className="px-4 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isExpanded = expandedMenus.includes(item.id);
            const isActive = activeTab === item.id;

            return (
              <div key={item.id}>
                <button
                  onClick={() => {
                    if (item.children) {
                      toggleExpand(item.id);
                    } else {
                      handleChangeTab(item.id);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </div>
                  {item.children &&
                    (isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    ))}
                </button>

                {item.children && isExpanded && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.children.map((child) => {
                      const ChildIcon = child.icon;
                      const isChildActive = activeTab === child.id;
                      return (
                        <button
                          key={child.id}
                          onClick={() => handleChangeTab(child.id)}
                          className={`w-full flex items-center gap-2 px-3 py-1 rounded-md text-left text-sm transition-colors ${
                            isChildActive
                              ? "bg-sidebar-accent text-sidebar-accent-foreground"
                              : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                          }`}
                        >
                          <ChildIcon className="h-4 w-4" />
                          {child.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-background border-b border-border px-4 lg:px-8 py-4 flex justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            ☰
          </Button>
          <h1 className="text-lg font-semibold">
            {activeTab ? 
              sidebarItems
                .flatMap((i) => [i, ...(i.children || [])])
                .find((i) => i.id === activeTab)?.label || "Dashboard"
              : "Dashboard"
            }
          </h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-10 w-10 rounded-full">
                <Avatar>
                  <AvatarImage src="/admin-avatar.png" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Admin</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Đăng xuất</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex-1 overflow-auto p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

