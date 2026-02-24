"use client"
import { useState } from "react"

interface InputQuantityInterface{
    initValue: number,
    handleCloseInput: ()=>void
}

export default function InputQuantity({initValue = 0, handleCloseInput}: InputQuantityInterface){
    const [count, setCount] = useState(initValue)

    function handleDecrease(){
        let countValue = 0
        if(count >= 1){
            countValue = count - 1
        }
        if(countValue === 0){
            handleCloseInput()
        }
        setCount(countValue)
    }
    function handleIncrease(){
        setCount((prev)=>prev+1)
    }
    return<div className="h-13 w-full bg-gray-300 flex rounded-full">
        <p className="h-full w-13 text-2xl flex justify-center items-center" onClick={()=>handleDecrease()}>-</p>
        <input className="text-center flex-1" type="nunber" value={count} min={0}/>
        <p className="h-full w-13 text-2xl flex justify-center items-center" onClick={()=>handleIncrease()}>+</p>
    </div>
}