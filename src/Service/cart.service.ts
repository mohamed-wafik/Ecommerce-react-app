import axiosInstance from "../config/axiosInstance";
import type { ICartItem, ICartResponse } from "../interface";

export const getCartItems = async (): Promise<ICartItem[]> => {
  const res = await axiosInstance.get<ICartResponse>("/cart");
  console.log(res.data.data);
  return res.data.data;
};

export const addCartItem = async (productId: number, quantity: number) => {
  const res = await axiosInstance.post<ICartResponse>("/cart", {
    product_id: productId,
    quantity,
  });

  return res.data.data;
};

export const updateCartItem = async (id: number, quantity: number) => {
  const res = await axiosInstance.put<ICartResponse>(`/cart/${id}`, {
    quantity,
  });

  return res.data.data;
};

export const removeCartItem = async (id: number) => {
  const res = await axiosInstance.delete<ICartResponse>(`/cart/${id}`);
  return res.data.data;
};
