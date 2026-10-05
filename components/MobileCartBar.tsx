"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCarrito } from "./CartProvider";
import { cop } from "@/lib/pedido";
import MayoristaMeter from "./MayoristaMeter";

/** Barra fija abajo (en celular) con el total del pedido */
export default function MobileCartBar() {
  const { resumen, listo } = useCarrito();
  const ruta = usePathname();
  if (!listo || resumen.unidades === 0 || ruta === "/carrito") return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-linea bg-white px-4 pb-[max(env(safe-area-inset-bottom),12px)] pt-3 shadow-[0_-8px_24px_rgba(0,0,0,0.06)] md:hidden">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold">{cop(resumen.total)}</span>
            <span className="text-sm text-humo">
              {resumen.unidades} {resumen.unidades === 1 ? "prenda" : "prendas"}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <MayoristaMeter unidades={resumen.unidades} tam="sm" />
            <span className="truncate text-xs text-frambuesa">
              {resumen.esMayorista ? "Precio mayorista" : `${resumen.faltan} más para mayorista`}
            </span>
          </div>
        </div>
        <Link href="/carrito" className="shrink-0 rounded-full bg-tinta px-5 py-3 text-sm font-medium text-white">
          Ver pedido
        </Link>
      </div>
    </div>
  );
}
