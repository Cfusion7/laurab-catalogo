"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { categorias } from "@/data/productos";

/** Barra de categorías fija bajo el encabezado, para saltar entre ellas */
export default function CategoryBar({ activa }: { activa?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    ref.current?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [activa]);

  return (
    <div className="sticky top-16 z-30 border-b border-linea bg-white/95 backdrop-blur">
      <nav className="sin-scroll mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 sm:px-6" aria-label="Categorías">
        {categorias.map((c) => {
          const on = c.slug === activa;
          return (
            <Link
              key={c.slug}
              ref={on ? ref : undefined}
              href={`/catalogo/${c.slug}`}
              aria-current={on ? "page" : undefined}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${
                on ? "border-tinta bg-tinta text-white" : "border-linea text-humo hover:border-tinta hover:text-tinta"
              }`}
            >
              {c.nombre}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
