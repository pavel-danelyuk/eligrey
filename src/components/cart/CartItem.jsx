"use client";

import { useCart } from "@/context/CartContext";

export default function CartItem({ id, title, price, image, quantity }) {
  const { removeFromCart } = useCart();

  return (
    <div className="flex gap-4 rounded-xl border p-4">
      <div className="h-24 w-24 overflow-hidden rounded-md bg-gray-100">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-gray-600">${price}</p>
          <p className="text-sm text-gray-600">Quantity: {quantity}</p>
        </div>

        <button
          type="button"
          onClick={() => removeFromCart(id)}
          className="cursor-pointer rounded-md border px-3 py-2 text-sm transition hover:bg-gray-100"
        >
          Remove
        </button>
      </div>
    </div>
  );
}