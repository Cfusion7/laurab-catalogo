"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCarrito } from "@/components/CartProvider";
import MayoristaMeter from "@/components/MayoristaMeter";
import { negocio } from "@/data/negocio";
import { cop, enlaceWhatsApp, mensajeWhatsApp, type DatosCliente } from "@/lib/pedido";

const campo =
  "h-12 w-full rounded-xl border border-linea bg-white px-4 text-[15px] outline-none transition-colors focus:border-tinta";

export default function Carrito() {
  const { lineas, listo, resumen, cambiarCantidad, quitar, vaciar } = useCarrito();
  const [datos, setDatos] = useState<DatosCliente>({
    nombre: "",
    ciudad: "",
    entrega: "envio",
    direccion: "",
    pago: "anticipado",
    nota: "",
  });
  const set = <K extends keyof DatosCliente>(k: K, v: DatosCliente[K]) => setDatos((d) => ({ ...d, [k]: v }));

  if (!listo) return <div className="min-h-[60vh]" />;

  if (resumen.unidades === 0) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
        <h1 className="display text-4xl">Tu pedido está vacío</h1>
        <p className="mt-3 text-humo">Agrega prendas desde el catálogo y aquí verás el total antes de enviarlo por WhatsApp.</p>
        <Link href="/catalogo" className="mt-8 rounded-full bg-tinta px-8 py-4 font-medium text-white hover:bg-frambuesa">
          Ver catálogo
        </Link>
      </section>
    );
  }

  const enviar = () => {
    const texto = mensajeWhatsApp(lineas, datos);
    window.open(enlaceWhatsApp(texto), "_blank", "noopener,noreferrer");
  };

  return (
    <section className="mx-auto max-w-6xl px-4 pb-10 pt-8 sm:px-6 md:pt-12">
      <div className="flex items-baseline justify-between gap-4">
        <h1 className="display text-4xl sm:text-5xl">Tu pedido</h1>
        <button type="button" onClick={vaciar} className="text-sm text-humo underline underline-offset-4 hover:text-tinta">
          Vaciar
        </button>
      </div>

      {/* Progreso hacia precio mayorista */}
      <div className={`mt-6 rounded-2xl p-5 ${resumen.esMayorista ? "bg-tinta text-white" : "bg-rubor"}`}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {resumen.esMayorista ? (
              <>
                <p className="display text-2xl">Precio mayorista activado</p>
                <p className="mt-1 text-sm text-white/75">
                  Llevas {resumen.unidades} prendas y ahorras {cop(resumen.ahorro)} frente al precio al detal.
                </p>
              </>
            ) : (
              <>
                <p className="display text-2xl">
                  Te {resumen.faltan === 1 ? "falta 1 prenda" : `faltan ${resumen.faltan} prendas`} para precio mayorista
                </p>
                {resumen.ahorroPotencial > 0 && (
                  <p className="mt-1 text-sm text-humo">
                    Con lo que llevas, ahorrarías {cop(resumen.ahorroPotencial)} o más. Puedes surtir referencias y colores.
                  </p>
                )}
              </>
            )}
          </div>
          <MayoristaMeter unidades={resumen.unidades} />
        </div>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        {/* Lista de prendas */}
        <ul className="divide-y divide-linea border-y border-linea">
          {resumen.lineas.map((l) => (
            <li key={l.clave} className="flex gap-4 py-4">
              <div className="relative h-28 w-22 shrink-0 overflow-hidden rounded-xl bg-rubor">
                <Image src={l.producto.foto} alt="" fill sizes="88px" className="object-cover object-top" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="display text-lg leading-tight">{l.producto.nombre}</p>
                    <p className="mt-0.5 text-xs text-humo">
                      Ref. {l.producto.ref}
                      {l.color ? `, ${l.color}` : ", color por confirmar"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => quitar(l.clave)}
                    className="shrink-0 text-xs text-humo underline underline-offset-4 hover:text-tinta"
                  >
                    Quitar
                  </button>
                </div>
                <p className="mt-1 text-sm">
                  {cop(l.precioUnitario)} c/u
                  {l.precioUnitario < l.producto.precioDetal && (
                    <span className="ml-2 text-xs text-humo line-through">{cop(l.producto.precioDetal)}</span>
                  )}
                </p>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <div className="flex h-10 items-center rounded-full border border-linea">
                    <button
                      type="button"
                      onClick={() => cambiarCantidad(l.clave, l.cantidad - 1)}
                      className="h-10 w-9 text-lg leading-none text-humo hover:text-tinta"
                      aria-label={`Quitar una ${l.producto.nombre}`}
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm font-medium tabular-nums">{l.cantidad}</span>
                    <button
                      type="button"
                      onClick={() => cambiarCantidad(l.clave, l.cantidad + 1)}
                      className="h-10 w-9 text-lg leading-none text-humo hover:text-tinta"
                      aria-label={`Agregar una ${l.producto.nombre}`}
                    >
                      +
                    </button>
                  </div>
                  <span className="font-semibold tabular-nums">{cop(l.subtotal)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Resumen y datos */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-linea p-5">
            <dl className="space-y-2 text-[15px]">
              <div className="flex justify-between">
                <dt className="text-humo">Prendas</dt>
                <dd className="tabular-nums">{resumen.unidades}</dd>
              </div>
              {resumen.ahorro > 0 && (
                <div className="flex justify-between text-frambuesa">
                  <dt>Ahorro por mayor</dt>
                  <dd className="tabular-nums">−{cop(resumen.ahorro)}</dd>
                </div>
              )}
              <div className="flex items-baseline justify-between border-t border-linea pt-3">
                <dt className="font-medium">Total estimado</dt>
                <dd className="text-2xl font-semibold tabular-nums">{cop(resumen.total)}</dd>
              </div>
            </dl>
            <p className="mt-2 text-xs leading-relaxed text-humo">
              Más el envío, que cotiza la transportadora según peso y destino.
            </p>
          </div>

          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              enviar();
            }}
          >
            <p className="display text-2xl">Tus datos</p>
            <p className="-mt-2 text-sm text-humo">Todo es opcional; nos ayuda a responderte más rápido.</p>

            <label className="block">
              <span className="mb-1.5 block text-sm">Nombre</span>
              <input className={campo} value={datos.nombre} onChange={(e) => set("nombre", e.target.value)} autoComplete="name" />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm">Ciudad</span>
              <input
                className={campo}
                value={datos.ciudad}
                onChange={(e) => set("ciudad", e.target.value)}
                autoComplete="address-level2"
              />
            </label>

            <fieldset>
              <legend className="mb-1.5 text-sm">Entrega</legend>
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    ["envio", "Envío"],
                    ["recoger", "Recoger en boutique"],
                  ] as const
                ).map(([v, t]) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => set("entrega", v)}
                    aria-pressed={datos.entrega === v}
                    className={`min-h-12 rounded-xl border px-3 text-sm transition-colors ${
                      datos.entrega === v ? "border-tinta bg-tinta text-white" : "border-linea hover:border-tinta"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </fieldset>

            {datos.entrega === "envio" && (
              <label className="block">
                <span className="mb-1.5 block text-sm">Dirección</span>
                <input
                  className={campo}
                  value={datos.direccion}
                  onChange={(e) => set("direccion", e.target.value)}
                  autoComplete="street-address"
                />
              </label>
            )}

            {datos.entrega === "envio" && resumen.esMayorista && (
              <fieldset>
                <legend className="mb-1.5 text-sm">Pago</legend>
                <div className="grid grid-cols-2 gap-2">
                  {(
                    [
                      ["anticipado", "Pago anticipado"],
                      ["contraentrega", "Contra entrega"],
                    ] as const
                  ).map(([v, t]) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => set("pago", v)}
                      aria-pressed={datos.pago === v}
                      className={`min-h-12 rounded-xl border px-3 text-sm transition-colors ${
                        datos.pago === v ? "border-tinta bg-tinta text-white" : "border-linea hover:border-tinta"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                {datos.pago === "contraentrega" && (
                  <p className="mt-2 text-xs leading-relaxed text-humo">
                    Pagas el 30% para confirmar y el 70% más el envío al recibir, por {negocio.transportadoras}.
                  </p>
                )}
              </fieldset>
            )}

            <label className="block">
              <span className="mb-1.5 block text-sm">Nota</span>
              <textarea
                className={`${campo} h-24 resize-none py-3`}
                value={datos.nota}
                onChange={(e) => set("nota", e.target.value)}
                placeholder="Colores que prefieres, otra referencia que viste en Instagram…"
              />
            </label>

            <button
              type="submit"
              className="flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-fucsia text-base font-semibold text-tinta transition-colors hover:bg-polvo"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.7 11.7 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.4-.3Z" />
              </svg>
              Enviar pedido por WhatsApp
            </button>
            <p className="text-center text-xs text-humo">Te confirmamos disponibilidad antes de que pagues.</p>
          </form>
        </div>
      </div>
    </section>
  );
}
