"use client";

import { useCart } from "@/context/CartContext";

export default function CartToast() {
  const { message } = useCart();

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] rounded-md bg-black px-4 py-3 text-sm text-white shadow-lg">
      {message}
    </div>
  );
}