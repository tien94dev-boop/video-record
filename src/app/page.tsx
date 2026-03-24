"use client"
import { useState } from "react"
import Image from "next/image";
import ProductItem from "@/components/home/ProductItem";
import Banner from "@/components/home/Banner"
import NotificationSignUp from "@/components/home/NotificationSignUp"
import FormLogin from "@/components/home/FormLogin"
import ThemeToggle from "@/components/common/ThemeToggle"
import { useTheme } from "@/context/ThemeContext"
import { useShoppingCart } from "@/context/ShoppingCartContext"

export default function Home() {
  const { theme } = useTheme()
  const { total } = useShoppingCart()
  const [showNotification, setShowNotification] = useState(true)
  const products = [
    {
      id: 1,
      name: "T-SHIRT WITH TAPE DETAILS",
      rate: 4.4,
      originalPrice: 140,
      discountPercent: 0,
      imgURL: "/images/product1.png",
    },
    {
      id: 2,
      name: "SKINNY FIT JEANS",
      rate: 3.6,
      originalPrice: 260,
      discountPercent: 15,
      imgURL: "/images/product2.png",
    },
    {
      id: 3,
      name: "CHECKERED SHIRT",
      rate: 4.5,
      originalPrice: 200,
      discountPercent: 0,
      imgURL: "/images/product3.png",
    },
    {
      id: 4,
      name: "SLEEVE STRIPED T-SHIRT",
      rate: 3.4,
      originalPrice: 180,
      discountPercent: 20,
      imgURL: "/images/product4.png",
    }
  ]
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
      <FormLogin />
      {showNotification && <NotificationSignUp handleNotificationClose={handleNotificationClose} />}
      <div className="lg:px-25 md:px-4 px-4">
        <h2 className="text-5xl font-bold pb-8 text-center">NEW ARRIVALS</h2>
        <div className="grid grid-cols-4 gap-4">
          {products.map((product) => {
            const { id, name: productName, rate, originalPrice, discountPercent, imgURL } = product
            return <ProductItem
              key={id}
              productName={productName}
              rate={rate}
              originalPrice={originalPrice}
              discountPercent={discountPercent}
              imgURL={imgURL}
              productId={id}
            />
          })}
        </div>
      </div>
      <Banner data={bannerData} />
      <ThemeToggle></ThemeToggle>
      <div className="fixed bottom-4 right-4">
        <div className="relative">
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 font-bold text-center">{total}</div>
             <p
                className="h-13 w-13 flex items-center justify-center bg-black text-xl text-white rounded-full font-bold"
                onClick={() => {}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>

            </p>
        </div>
   
      </div>

    </div>

  );
}
