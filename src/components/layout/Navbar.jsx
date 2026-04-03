"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

const links = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/commissions", label: "Commissions" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { cartCount } = useCart();

  return (
    <nav className="flex flex-wrap items-center justify-end gap-3 md:gap-6">
      {links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm font-medium transition ${
              isActive
                ? "text-black underline underline-offset-4"
                : "text-gray-700 hover:text-black"
            }`}
          >
            {link.label}
          </Link>
        );
      })}

      <Link
        href="/cart"
        className={`text-sm font-medium transition ${
          pathname === "/cart"
            ? "text-black underline underline-offset-4"
            : "text-gray-700 hover:text-black"
        }`}
      >
        Cart{cartCount > 0 ? ` (${cartCount})` : ""}
      </Link>
    </nav>
  );
}