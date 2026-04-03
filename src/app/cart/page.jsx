"use client";

import PageContainer from "@/components/layout/PageContainer";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart } = useCart();

  return (
    <PageContainer>
      <h1 className="mb-8 text-3xl font-bold">Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            {cart.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </div>

          <CartSummary />
        </div>
      )}
    </PageContainer>
  );
}