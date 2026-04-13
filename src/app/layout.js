import { Fahkwang } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const fahkwang = Fahkwang({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-fahkwang",
});

export const metadata = {
  title: "Eli Grey Gallery",
  description: "Eli Grey Gallery desc",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${fahkwang.variable} min-h-screen bg-white text-black`}>
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 pb-16 bg-[#e8e6e6]">{children}</main>
            <Footer />
          </div>
      </body>
    </html>
  );
}
