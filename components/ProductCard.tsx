"use client";

import Image from "next/image";
import { useState } from "react";
import type { Producto } from "@/data/productos";
import { cop } from "@/lib/pedido";
import { useCarrito } from "./CartProvider";

export default function ProductCard({ p, prioridad = false }: { p: Producto; prioridad?: boolean }) {
  const { agregar } = useCarrito();
  const [color, setColor] = useState<string | undefined>(p.colores[0]);
  const [cantidad, setCantidad] = useState(1);
  const [hecho, setHecho] = useState(false);

  const descuento = p.precioAntes ? Math.round((1 - p.precioDetal / p.precioAntes) * 100) : 0;

  const onAgregar = () => {
    agregar(p.id, cantidad, color, p.nombre);
    setHecho(true);
    setCantidad(1);
    setTimeout(() => setHecho(false), 1600);
  };

  return (
    <article className="flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] bg-rubor">
        <Image
          src={p.foto}
          alt={`${p.nombre}, referencia ${p.ref}`}
          fill
          sizes="(min-width: 1024px) 280px, (min-width: 640px) 33vw, 50vw"
          className="object-cover object-top"
          priority={prioridad}
        />
        {descuento > 0 && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-fucsia px-2.5 py-1 text-xs font-semibold text-tinta">
            -{descuento}%
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col pt-3">
        <h3 className="display text-[19px] leading-tight sm:text-[22px]">{p.nombre}</h3>
        <p className="mt-0.5 text-xs text-humo">Ref. {p.ref}</p>
        <p className="mt-1.5 text-[13px] leading-snug text-humo">{p.descripcion}</p>

        <div className="mt-2.5">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="text-lg font-semibold">{cop(p.precioDetal)}</span>
            {p.precioAntes && <span className="text-sm text-humo line-through">{cop(p.precioAntes)}</span>}
          </div>
          {p.precioMayorista && (
            <p className="text-[13px] text-frambuesa">
              Por mayor <span className="font-semibold">{cop(p.precioMayorista)}</span>
            </p>
          )}
        </div>

        {p.colores.length > 0 ? (
          <fieldset className="mt-3">
            <legend className="mb-1.5 text-xs text-humo">Color</legend>
            <div className="flex flex-wrap gap-1.5">
              {p.colores.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  aria-pressed={color === c}
                  className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                    color === c ? "border-tinta bg-tinta text-white" : "border-linea hover:border-tinta"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </fieldset>
        ) : (
          <p className="mt-3 text-xs text-humo">Colores: te mostramos los disponibles por WhatsApp</p>
        )}

        <div className="mt-auto pt-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="flex h-11 items-center justify-between rounded-full border border-linea sm:justify-start">
              <button
                type="button"
                onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                className="h-11 w-9 text-lg leading-none text-humo hover:text-tinta"
                aria-label="Quitar una"
              >
                −
              </button>
              <span className="w-5 text-center text-sm font-medium tabular-nums" aria-live="polite">
                {cantidad}
              </span>
              <button
                type="button"
                onClick={() => setCantidad((c) => c + 1)}
                className="h-11 w-9 text-lg leading-none text-humo hover:text-tinta"
                aria-label="Agregar una"
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={onAgregar}
              className={`h-11 w-full rounded-full text-sm font-medium transition-colors sm:w-auto sm:flex-1 ${
                hecho ? "bg-fucsia text-tinta" : "bg-tinta text-white hover:bg-frambuesa"
              }`}
            >
              {hecho ? "Agregada" : "Agregar"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
