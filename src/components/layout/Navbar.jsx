import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/commissions", label: "Commissions" },
  { href: "/contact", label: "Contact" },
  { href: "/cart", label: "Cart" },
];

export default function Navbar() {
  return (
    <nav className="flex flex-wrap items-center justify-end gap-3 md:gap-6">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm font-medium text-gray-700 transition hover:text-black"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}