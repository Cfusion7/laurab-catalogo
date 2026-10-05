import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bodoni-moda/opsz.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "./globals.css";
import CartProvider from "@/components/CartProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCartBar from "@/components/MobileCartBar";

export const metadata: Metadata = {
  title: "Laura B | Catálogo 2026",
  description:
    "Bodys, enterizos, conjuntos, vestidos y más. Compra al detal o por mayor desde 6 prendas surtidas y haz tu pedido por WhatsApp.",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-dvh">
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <MobileCartBar />
        </CartProvider>
      </body>
    </html>
  );
}
