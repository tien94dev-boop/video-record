"use client";
import Image from "next/image"
import Link from "next/link"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Input from "@/components/common/Input3"
import { useCart } from "../contexts/CartContext"

export default function clothesPage() {
  const { addToCart, totalQty, handleCartOperation, items } = useCart();
  const [clothes, setclothes] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(items)

  useEffect(() => {
    // Cách fetch đơn giản nhất
    fetch('https://google-api-uerx.onrender.com/api/clothes')
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setclothes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi lấy dữ liệu:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-10 text-center text-xl">Đang tải dữ liệu...</div>;

  return (
    <div className="p-8 max-w-full mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Best seller</h1>
      <div className="space-y-4 grid grid-cols-2 gap-4 w-full">
        {(clothes || []).map((clothe: any, index) => {
          const currentItem = items.find((item: any) => item.id === clothe.id)
          return <div key={clothe.id} className="flex w-full justify-between p-4 border rounded-lg shadow-sm bg-white hover:bg-gray-50 md:col-span-1 col-span-2 h-full">
            <div key={index} className="grid grid-cols-2 gap-4 w-full">
                <div className="">
                  <Image
                    src={clothe.image}
                    alt={clothe.name}
                    width={200}
                    height={200}
                    className="w-full"
                  />
                </div>
                <div className="flex flex-col justify-between flex-1 w-full">
                  <div className="flex gap-4 flex-col">
                  <h2 className="text-2xl font-semibold text-sky-700 pb-2">{clothe.name}</h2>
                  <p className="text-gray-600 text-xl"><span>Type:</span><br/><span className="italic font-bold">{clothe.type}</span></p>
                  <p className="text-gray-600 text-xl"><span>Price:</span><br/> <span className="italic text-orange-500">{clothe.price}</span></p>
                  </div>
       
                  <div className="px-2 flex justify-end">
                    {currentItem && currentItem.quantity > 0 ? <Input
                      initialValue={currentItem?.quantity || 0} onChange={(value: number) => {
                        handleCartOperation(clothe, value)
                      }}></Input> : <div
                        onClick={() => {
                          handleCartOperation(clothe, 1)
                        }}
                        className="h-12 w-12 bg-orange-500 text-white text-4xl font-bold flex justify-center items-center rounded-full"
                      >+</div>}
                  </div>
                </div>
            </div>

          </div>
        })}
      </div>

      {clothes.length === 0 && <p className="text-center text-gray-500">Không tìm thấy sách nào.</p>}
    </div>
  );
}