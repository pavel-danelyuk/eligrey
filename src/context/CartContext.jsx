"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");

    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const showMessage = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);

    if (product.status === "sold") {
      showMessage("This artwork is sold.");
      return;
    }

    if (existing) {
      showMessage("This artwork is already in your cart.");
      return;
    }

    setCart((prev) => [...prev, { ...product, quantity: 1 }]);
    showMessage("Artwork added to cart.");
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    showMessage("Artwork removed from cart.");
  };

  const clearCart = () => {
    setCart([]);
    showMessage("Cart cleared.");
  };

  const isInCart = (id) => {
    return cart.some((item) => item.id === id);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartCount,
        cartTotal,
        isInCart,
        message,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}