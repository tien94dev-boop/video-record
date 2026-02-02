'use client'
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import _ from 'lodash';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
  totalQty: number;
}

type CartAction =
  | { type: 'SET_ITEMS'; payload: CartItem[] }
  | { type: 'CLEAR_CART' };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'SET_ITEMS':
      return {
        items: action.payload,
        // Tính toán tập trung để đảm bảo tính nhất quán của dữ liệu
        totalAmount: _.sumBy(action.payload, (item) => item.price * item.quantity),
        totalQty: _.sumBy(action.payload, 'quantity'),
      };
    case 'CLEAR_CART':
      return { items: [], totalAmount: 0, totalQty: 0 };
    default:
      return state;
  }
};

const CartContext = createContext<any>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { 
    items: [], 
    totalAmount: 0, 
    totalQty: 0 
  });

  /**
   * HÀM CHUNG DUY NHẤT: Xử lý logic nghiệp vụ cho Giỏ hàng
   * - Nếu targetQuantity <= 0: Xóa sản phẩm khỏi mảng.
   * - Nếu sản phẩm đã tồn tại: Cập nhật số lượng mới.
   * - Nếu sản phẩm chưa có: Thêm mới vào mảng.
   */
  const handleCartOperation = (product: Omit<CartItem, 'quantity'>, targetQuantity: number) => {
    const existingItemIndex = state.items.findIndex((item) => item.id === product.id);
    let updatedItems = [...state.items];

    if (targetQuantity <= 0) {
      updatedItems = updatedItems.filter((item) => item.id !== product.id);
    } else if (existingItemIndex > -1) {
      updatedItems[existingItemIndex] = { ...updatedItems[existingItemIndex], quantity: targetQuantity };
    } else {
      updatedItems.push({ ...product, quantity: targetQuantity });
    }

    dispatch({ type: 'SET_ITEMS', payload: updatedItems });
  };

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider 
      value={{ 
        state, 
        handleCartOperation, 
        clearCart, 
        items: state.items,
        totalQty: state.totalQty // Trả về totalQty từ state đã được tính toán trong Reducer
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};