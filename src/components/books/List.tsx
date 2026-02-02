"use client";
import Image from "next/image"
import Link from "next/link"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Input from "@/components/common/Input"
import { useCart } from "../contexts/CartContext"

export default function BooksPage() {
  const { addToCart, totalQty, handleCartOperation, items } = useCart();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(items)

  useEffect(() => {
    // Cách fetch đơn giản nhất
    fetch('https://google-api-uerx.onrender.com/api/books')
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setBooks(data);
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
      <div className="space-y-4 grid grid-cols-3 gap-4">
        {(books || []).map((book: any, index) => {
          const currentItem = items.find((item: any) => item.id === book.id)
          return <div key={book.id} className="flex flex-col justify-between p-4 border rounded-lg shadow-sm bg-white hover:bg-gray-50 md:col-span-1 col-span-2 h-full">
            <div key={index} className="">
              <Link href={'/books'}>
                <div className="mb-4">
                  <Image
                    src={book.image}
                    alt={book.title}
                    width={200}
                    height={200}
                    className="w-full"
                  />
                </div>
                <h2 className="text-2xl font-semibold text-sky-700 pb-2 text-center">{book.title}</h2>
                <p className="text-gray-600 flex justify-between text-xl"><span>Author:</span> <span className="italic font-bold">{book.author}</span></p>
                <p className="text-gray-600 flex justify-between"><span>Price:</span> <span className="italic text-red-500">{book.price}</span></p>
              </Link>
            </div>
            <div className="px-2">
              {currentItem && currentItem.quantity > 0 ? <Input initialValue={currentItem?.quantity || 0} onChange={(value: number) => {
                handleCartOperation(book, value)
              }}></Input> : <div
                onClick={() => {
                  handleCartOperation(book, 1)
                }}
                className="h-12 w-full bg-sky-500 text-white text-xl font-bold flex justify-center items-center rounded"
              >Add to Cart</div>}

            </div>
          </div>
        })}
      </div>

      {books.length === 0 && <p className="text-center text-gray-500">Không tìm thấy sách nào.</p>}
    </div>
  );
}