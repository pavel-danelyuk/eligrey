"use client";

import { useCart } from "@/context/CartContext";

export default function CartSummary() {
  const { cartTotal, clearCart, cartCount } = useCart();

  return (
    <div className="space-y-4 rounded-xl border p-6">
      <h2 className="text-xl font-bold">Order Summary</h2>

      <div className="flex justify-between text-sm text-gray-700">
        <span>Items</span>
        <span>{cartCount}</span>
      </div>

      <div className="flex justify-between text-sm text-gray-700">
        <span>Subtotal</span>
        <span>${cartTotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-sm text-gray-700">
        <span>Shipping</span>
        <span>Calculated at checkout</span>
      </div>

      <button
        type="button"
        className="w-full cursor-pointer rounded-md bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
      >
        Proceed to Checkout
      </button>

      <button
        type="button"
        onClick={clearCart}
        className="w-full cursor-pointer rounded-md border px-5 py-3 text-sm font-medium transition hover:bg-gray-100"
      >
        Clear Cart
      </button>
    </div>
  );
}