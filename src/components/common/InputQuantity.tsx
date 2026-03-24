"use client"
import { useState, useEffect } from "react"
import { useShoppingCart } from "@/context/ShoppingCartContext"

interface InputQuantityInterface {
    initValue: number,
    handleCloseInput: () => void,
    productId: string | number
}

export default function InputQuantity({ initValue = 0, handleCloseInput, productId }: InputQuantityInterface) {
    const { updateTotal } = useShoppingCart()
    const [count, setCount] = useState(initValue)

    function handleDecrease() {
        let countValue = 0
        if (count >= 1) {
            countValue = count - 1
        }
        if (countValue === 0) {
            handleCloseInput()
        }
        setCount(countValue)
    }
    function handleIncrease() {
        setCount((prev) => prev + 1)
    }
    useEffect(() => {
        if (typeof updateTotal === "function") {
            updateTotal({ quantity: count, productId: productId })
        }
        return () => {
            if (typeof updateTotal === "function") {
                updateTotal({ quantity: 0, productId: productId })
            }
        }
    }, [count])

    return <div className="h-13 w-full bg-gray-300 flex rounded-full">
        <p className="h-full w-13 text-2xl flex justify-center items-center" onClick={() => handleDecrease()}>-</p>
        <input className="text-center flex-1" type="nunber" value={count} min={0} onChange={() => { }} />
        <p className="h-full w-13 text-2xl flex justify-center items-center" onClick={() => handleIncrease()}>+</p>
    </div>
}