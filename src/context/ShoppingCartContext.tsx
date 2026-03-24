"use client"

import { createContext, ReactNode, useState, useContext, useEffect } from "react"

interface ShoppingCartInterface {
    total: number,
    updateTotal?: (product: any)=>void
}

export const ShoppingCartContext = createContext<ShoppingCartInterface>({total: 10})

export function ShoppingCartProvider({ children } : {children: ReactNode}) {
    const [total, setTotal] = useState(0)
    const [products, setProduct] = useState<any[]>([])

    function updateTotal(product: any){
        const {productId, quantity} = product

        const productIndex = products.findIndex(p=>p.productId === productId)

        if(productIndex === -1){
            setProduct([...products, product])
        } else{
            let productsClone = [...products]
            productsClone[productIndex] = product
            setProduct(productsClone)
        }
    }

    useEffect(()=>{
        let newTotal = 0
        products.forEach((p: any)=>{
            newTotal += p.quantity
        })
        setTotal(newTotal)
    }, [products])

    return (
        <ShoppingCartContext.Provider value={{ total, updateTotal }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}

export function useShoppingCart(){
    const context = useContext(ShoppingCartContext)
    if(!context){
        throw new Error("useShoppingCart phải được đặt trong ShoppingCartProvider")
    }
    return context
}

