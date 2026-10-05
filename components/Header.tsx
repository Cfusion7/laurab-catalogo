"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCarrito } from "./CartProvider";
import Wordmark from "./Wordmark";

export default function Header() {
  const { resumen, listo } = useCarrito();
  const ruta = usePathname();
  const n = listo ? resumen.unidades : 0;

  const enlace = (href: string, texto: string) => {
    const activo = href === "/catalogo" ? ruta.startsWith("/catalogo") : ruta === href;
    return (
      <Link
        href={href}
        className={`text-[15px] transition-colors ${activo ? "text-tinta" : "text-humo hover:text-tinta"}`}
        aria-current={activo ? "page" : undefined}
      >
        {texto}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-40 border-b border-linea bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Laura B, inicio">
          <Image src="/logo-laurab.png" alt="" width={40} height={40} className="h-10 w-10" priority />
          <Wordmark className="hidden text-2xl sm:inline" />
        </Link>

        <nav className="flex items-center gap-5 sm:gap-7">
          {enlace("/catalogo", "Catálogo")}
          {enlace("/mayoristas", "Por mayor")}
          <Link
            href="/carrito"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-linea hover:border-tinta"
            aria-label={`Tu pedido, ${n} prendas`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
              <path d="M6 7h12l-1 13H7L6 7Z" strokeLinejoin="round" />
              <path d="M9 7a3 3 0 0 1 6 0" />
            </svg>
            {n > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-fucsia px-1 text-[11px] font-semibold text-tinta">
                {n}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
