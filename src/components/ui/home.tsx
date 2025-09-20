"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Dropdown, Layout, Menu, theme, Carousel, Button } from "antd"
import Image from "next/image"
import { SearchOutlined, FacebookFilled, YoutubeFilled } from "@ant-design/icons"
import { TikTokFilled } from "@ant-design/icons" // nếu TikTokFilled không có trong antd thì bạn cần dùng icon khác
import { useResponsive } from "antd-style"
import { useRouter } from "next/navigation"
import ImageCarousel from "./imagecarousel"
import EhancedCarousel from "./enhanced-carousel";

const { Header, Footer } = Layout

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "900px",
  width: "1905px",
  position: "relative",
  overflow: "hidden",
}

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const { xxl, lg, md, sm } = useResponsive()

  const [userInfo, setUserInfo] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem("userInfo")
    if (stored) setUserInfo(JSON.parse(stored))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("userInfo")
    setUserInfo(null)
  }

  const handleLogin = () => {
    router.push("/login")
  }

  const dropdownMenu = {
    items: userInfo
      ? [
          {
            key: "profile",
            label: (
              <div>
                <p style={{ fontWeight: 500 }}>{userInfo.name}</p>
                <p style={{ fontSize: "12px", color: "gray" }}>{userInfo.email}</p>
              </div>
            ),
            disabled: true,
          },
          { key: "logout", label: <span onClick={handleLogout}>Đăng xuất</span> },
        ]
      : [{ key: "login", label: <span onClick={handleLogin}>Đăng nhập</span> }],
  }

  const items = [
    { key: "1", label: "Trang chủ" },
    { key: "2", label: "Dịch Vụ" },
    { key: "3", label: "Dự án" },
    { key: "4", label: "Về FOX" },
    { key: "5", label: "En/Vi" },
  ]

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
          padding: "0 2rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          height: "80px",
        }}
      >
        {/* Logo Section */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            minWidth: "120px",
          }}
        >
          <Image src="/logo.png" alt="Fox Media Logo" width={100} height={60} style={{ objectFit: "contain" }} />
        </div>

        {/* Navigation Menu */}
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <Menu
            mode="horizontal"
            items={items.map((item) => ({
              ...item,
              style: {
                padding: "0 1.5rem",
                fontSize: "16px",
                fontWeight: "500",
              },
            }))}
            style={{
              backgroundColor: "white",
              borderBottom: "none",
              width: "100%",
              justifyContent: "center",
            }}
          />
        </div>

        {/* User Actions */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            minWidth: "120px",
            justifyContent: "flex-end",
          }}
        >
          <SearchOutlined
            style={{
              fontSize: "20px",
              color: "#FF5500",
              cursor: "pointer",
              padding: "8px",
              borderRadius: "50%",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          />

          <Dropdown menu={dropdownMenu} trigger={["click"]}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                padding: "4px",
                borderRadius: "50%",
                transition: "background-color 0.3s",
              }}
            >
              <img
                src={userInfo?.avatar || "https://i.pravatar.cc/40"}
                alt="User Avatar"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid #f0f0f0",
                }}
              />
            </div>
          </Dropdown>
        </div>
      </Header>

      {/* Carousel Section */}
      <div style={{ width: "100%", margin: "0 auto" }}>
      <Carousel autoplay autoplaySpeed={1000}>
        <div>
          <img
            src="/image4.jpg"
            alt="Image4"
            style={{ width: "100%", height: "900px", objectFit: "cover" }}
          />
        </div>
        <div>
          <img
            src="/image5.jpg"
            alt="Image5"
            style={{ width: "100%", height: "900px", objectFit: "cover" }}
          />
        </div>
        <div>
          <img
            src="/image6.jpg"
            alt="Image6"
            style={{ width: "100%", height: "900px", objectFit: "cover" }}
          />
        </div>
      </Carousel>
    </div>

      {/* About Section */}
      <div
        style={{
          position: "relative",
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image src="/chungtoilaai.jpg" alt="About Fox Media" fill style={{ objectFit: "cover" }} />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            // background: "linear-gradient(135deg, rgba(0,0,0,0.2), rgba(255,255,255,0.1))",
            zIndex: 1,
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "3rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
            display: "flex",
            gap: "1.5rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Button
            type="primary"
            danger
            size="large"
            style={{
              height: "50px",
              minWidth: "140px",
              borderRadius: "25px",
              fontSize: "16px",
              fontWeight: "600",
              boxShadow: "0 4px 15px rgba(255, 0, 0, 0.3)",
              transition: "all 0.3s ease",
            }}
          >
            <YoutubeFilled style={{ fontSize: "20px" }} />
            YouTube
          </Button>

          <Button
            type="primary"
            size="large"
            style={{
              height: "50px",
              minWidth: "140px",
              backgroundColor: "#000",
              borderColor: "#000",
              borderRadius: "25px",
              fontSize: "16px",
              fontWeight: "600",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
              transition: "all 0.3s ease",
            }}
          >
            <TikTokFilled style={{ fontSize: "20px" }} />
            TikTok
          </Button>

          <Button
            type="primary"
            size="large"
            style={{
              height: "50px",
              minWidth: "140px",
              backgroundColor: "#1877F3",
              borderColor: "#1877F3",
              borderRadius: "25px",
              fontSize: "16px",
              fontWeight: "600",
              boxShadow: "0 4px 15px rgba(24, 119, 243, 0.3)",
              transition: "all 0.3s ease",
            }}
          >
            <FacebookFilled style={{ fontSize: "20px" }} />
            Facebook
          </Button>
        </div>
      </div>

      {/* ImageCarousel Component */}
      <div>
        <ImageCarousel />
      </div>
      <div>
        <EhancedCarousel />
      </div>

      <Footer
        style={{
          textAlign: "center",
          backgroundColor: "#f8f9fa",
          color: "#333",
          padding: "2rem 0",
          fontSize: "16px",
          borderTop: "4px solid #FF5500",
        }}
      >
        <div style={{ marginBottom: "1rem" }}>
          <strong>Fox Media</strong> ©{new Date().getFullYear()} Created by Hùng Nguyễn
        </div>
        <div style={{ fontSize: "14px", opacity: 0.7 }}>
          Connecting brands with audiences through creative digital solutions
        </div>
      </Footer>
    </Layout>
  )
}

export default App
