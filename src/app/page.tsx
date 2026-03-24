"use client"
import { useState } from "react"
import Image from "next/image";
import Product from "@/components/home/Product";
import Banner from "@/components/home/Banner"
import NotificationSignUp from "@/components/home/NotificationSignUp"
import FormLogin from "@/components/home/FormLogin"
import ThemeToggle from "@/components/common/ThemeToggle"
import { useTheme } from "@/context/ThemeContext"
import { useShoppingCart } from "@/context/ShoppingCartContext"
import Menu from "@/components/home/Menu";

export default function Home() {
  const { theme } = useTheme()
  const { total } = useShoppingCart()
  const [showNotification, setShowNotification] = useState(true)
  
  const bannerData = {
    title: "FIND CLOTHES THAT MATCHES YOUR STYLE",
    des: "Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.",
    btnName: "Shop Now",
    bannerDesktopUrl: "/images/banner.jpg",
    bannerMobileUrl: "/images/banner-mobile.png",
    bannerItems: [
      {
        statistic: "200+",
        statisticName: "International Brands",
      },
      {
        statistic: "2,000+",
        statisticName: "High-Quality Products",
      },
      {
        statistic: "30,000+",
        statisticName: "Happy Customers",
      },
    ]
  }
  function handleNotificationClose() {
    setShowNotification(false)
  }
  return (
    <div className={`${theme === "dark" && "bg-black"}`}>
      <Menu/>
      <Product/>
      <FormLogin />
      {showNotification && <NotificationSignUp handleNotificationClose={handleNotificationClose} />}
      <Banner data={bannerData} />
      <ThemeToggle></ThemeToggle>


    </div>

  );
}
