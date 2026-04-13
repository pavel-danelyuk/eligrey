import Link from "next/link";

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium cursor-pointer transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-black/30";

  const variants = {
    primary:
      "bg-black text-white border border-black hover:bg-white hover:text-black hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm",

    secondary:
      "bg-white text-black border border-black hover:bg-black hover:text-white hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm",

    ghost:
      "bg-transparent text-black hover:underline",
  };

  const styles = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
}