import { AdminDashboard } from "@/components/admin-dashboard"
import "./globals.css"
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminDashboard>{children}</AdminDashboard>
}
