"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/commissions", label: "Commissions" },
  { href: "/contact", label: "Contact" },
  { href: "/cart", label: "Cart" },
];

export default function Navbar() {
  const pathname = usePathname();

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
                ? "text-black border-b border-black pb-1"
                : "text-gray-700 hover:text-black"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}