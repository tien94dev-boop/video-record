"use client"
import { useState, useEffect } from "react"
import ProductItem from "@/components/home/ProductItem";

interface Product {
    "id": number,
    "name": string,
    "rate": number,
    "originalPrice": number,
    "discountPercent": number,
    "imgURL": string
}
export default function Product() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState<Boolean>(false)

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true)
                const response = await fetch("https://google-api-pearl.vercel.app/api/products")
                if (!response?.ok) {
                    throw new Error("Kiểm tra lại link API!!!")
                }
                const products = await response.json()
                setProducts(products)
                setLoading(false)
            } catch (e) {
                console.log("Lỗi goi API", e)
                setLoading(false)
            }

        }
        fetchData()
    }, [])
    return <div className="lg:px-25 md:px-4 px-4">
        <h2 className="text-5xl font-bold pb-8 text-center">NEW ARRIVALS</h2>
        {loading ? <div className="grid grid-cols-4 gap-4">Loading...</div> : <div className="grid grid-cols-4 gap-4">
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
        </div>}


    </div>
}