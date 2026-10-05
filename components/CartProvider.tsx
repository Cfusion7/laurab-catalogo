"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { calcularPedido, claveDe, type LineaCarrito } from "@/lib/pedido";

const LLAVE = "laurab-pedido-v1";

type Ctx = {
  lineas: LineaCarrito[];
  listo: boolean;
  agregar: (productoId: string, cantidad: number, color?: string, nombre?: string) => void;
  cambiarCantidad: (clave: string, cantidad: number) => void;
  quitar: (clave: string) => void;
  vaciar: () => void;
  resumen: ReturnType<typeof calcularPedido>;
};

const CartCtx = createContext<Ctx | null>(null);

export function useCarrito() {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCarrito debe usarse dentro de CartProvider");
  return c;
}

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [lineas, setLineas] = useState<LineaCarrito[]>([]);
  const [listo, setListo] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cargar el pedido guardado
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LLAVE);
      if (raw) {
        const data = JSON.parse(raw);
        if (Array.isArray(data)) setLineas(data);
      }
    } catch {}
    setListo(true);
  }, []);

  // Guardar en cada cambio
  useEffect(() => {
    if (!listo) return;
    try {
      localStorage.setItem(LLAVE, JSON.stringify(lineas));
    } catch {}
  }, [lineas, listo]);

  const agregar = useCallback((productoId: string, cantidad: number, color?: string, nombre?: string) => {
    const clave = claveDe(productoId, color);
    setLineas((prev) => {
      const existe = prev.find((l) => l.clave === clave);
      if (existe) return prev.map((l) => (l.clave === clave ? { ...l, cantidad: l.cantidad + cantidad } : l));
      return [...prev, { clave, productoId, color, cantidad }];
    });
    setAviso(`${nombre ?? "Prenda"}${color ? ` (${color})` : ""} agregada a tu pedido`);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAviso(null), 2600);
  }, []);

  const cambiarCantidad = useCallback((clave: string, cantidad: number) => {
    setLineas((prev) =>
      cantidad <= 0 ? prev.filter((l) => l.clave !== clave) : prev.map((l) => (l.clave === clave ? { ...l, cantidad } : l)),
    );
  }, []);

  const quitar = useCallback((clave: string) => setLineas((prev) => prev.filter((l) => l.clave !== clave)), []);
  const vaciar = useCallback(() => setLineas([]), []);

  const resumen = useMemo(() => calcularPedido(lineas), [lineas]);

  return (
    <CartCtx.Provider value={{ lineas, listo, agregar, cambiarCantidad, quitar, vaciar, resumen }}>
      {children}
      <div
        aria-live="polite"
        className={`pointer-events-none fixed inset-x-0 top-20 z-50 flex justify-center px-4 transition-all duration-300 ${
          aviso ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
        }`}
      >
        {aviso && (
          <div className="pointer-events-auto flex items-center gap-4 rounded-full bg-tinta py-2.5 pl-5 pr-2.5 text-sm text-white shadow-lg">
            <span>{aviso}</span>
            <Link href="/carrito" className="rounded-full bg-fucsia px-3.5 py-1.5 font-medium text-tinta">
              Ver pedido
            </Link>
          </div>
        )}
      </div>
    </CartCtx.Provider>
  );
}
