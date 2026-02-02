"use client"
import Link from "next/link"
import { useCart } from "../contexts/CartContext"
export default function Navbar() {
    const { addToCart, totalQty } = useCart();
    return <div className="flex bg-red-500 justify-between items-center px-4 py-1">
        <div className="text-2xl font-bold text-white">
            <Link href={"/laptops"}>Exam 2</Link>
        </div>
        <div className="flex gap-4 px-4 py-2 items-center">
            <Link href={"/laptops"} className="font-bold text-white hover:bg-white hover:text-red-500 text-xl px-4 rounded">Laptops</Link>
            <Link href={"/laptops/recommendation"} className="font-bold text-white hover:bg-white hover:text-red-500 text-xl px-4 rounded">Recommendation</Link>
            <div className="w-8 h-8 text-white rounded-full bg-ble flex justify-center items-center relative hover:cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                <div className="w-5 h-5 rounded-full -top-2 -right-2 bg-white text-red-500 text-sm items-center align-center absolute font-bold text-center">{totalQty}</div>
            </div>
        </div>
    </div>
}