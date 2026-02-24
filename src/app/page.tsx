"use client"
import { useState } from "react"
import Image from "next/image";
import ProductItem from "@/components/home/ProductItem";
import Banner from "@/components/home/Banner"
import NotificationSignUp from "@/components/home/NotificationSignUp"
import FormLogin from "@/components/home/FormLogin"

export default function Home() {
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
  function handleNotificationClose(){
    setShowNotification(false)
  }
  return (
    <div>
            <FormLogin/>
      {showNotification && <NotificationSignUp handleNotificationClose={handleNotificationClose}/>}
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
              />
          })}
        </div>
      </div>
      <Banner data={bannerData} />

    </div>

  );
}
