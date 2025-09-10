import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import clsx from "clsx"
import "./globals.css"

export const metadata: Metadata = {
  title: "Rarely Admin Dashboard",
  description: "Created with Rarely",
  generator: "Rarely.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={clsx(GeistSans.variable, GeistMono.variable, "font-sans antialiased")}
      >
        {children}
      </body>
    </html>
  )
}
