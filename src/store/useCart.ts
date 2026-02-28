import { create } from "zustand";
import type { ICartItem } from "../interface";
import toast from "react-hot-toast";
import {
  addCartItem,
  getCartItems,
  removeCartItem,
  updateCartItem,
} from "../Service/cart.service";

interface ICartState {
  cartItems: ICartItem[];
  countItems: number;
  isLoadingCart: boolean;

  fetchCart: () => Promise<void>;
  addItem: (productId: number, quantity: number) => Promise<void>;
  updateItem: (id: number, quantity: number) => Promise<void>;
  removeItem: (id: number) => Promise<void>;
}

export const useCart = create<ICartState>((set, get) => ({
  cartItems: [],
  countItems: 0,
  isLoadingCart: false,

  fetchCart: async () => {
    set({ isLoadingCart: true });

    try {
      const items = await getCartItems();

      set({
        cartItems: items,
        countItems: items.reduce((acc, item) => acc + item.quantity, 0), // total count
      });
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast.error("Failed to load cart items");
    } finally {
      set({ isLoadingCart: false });
    }
  },

  addItem: async (productId: number, quantity = 1) => {
    try {
      await addCartItem(productId, quantity);
      await get().fetchCart();
      toast.success("Item added to cart");
    } catch (error) {
      console.error("Error adding item:", error);
      toast.error("Failed to add item to cart");
    }
  },

  updateItem: async (id: number, quantity: number) => {
    try {
      await updateCartItem(id, quantity);
      await get().fetchCart();
      toast.success("Cart updated");
    } catch (error) {
      console.error("Error updating item:", error);
      toast.error("Failed to update cart item");
    }
  },

  removeItem: async (id: number) => {
    try {
      await removeCartItem(id);
      await get().fetchCart();
      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item");
    }
  },
}));
