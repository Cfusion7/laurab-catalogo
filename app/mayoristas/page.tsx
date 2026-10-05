import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { negocio } from "@/data/negocio";
import MayoristaMeter from "@/components/MayoristaMeter";

export const metadata: Metadata = { title: "Compras por mayor | Laura B" };

const pasos = [
  {
    t: "Arma tu pedido de 6 prendas o más",
    d: "Pueden ser surtidas: mezcla referencias, colores y categorías como prefieras.",
  },
  {
    t: "El precio mayorista se aplica solo",
    d: "En cuanto sumas la sexta prenda, tu pedido cambia a precio por mayor y ves cuánto ahorras.",
  },
  {
    t: "Envíalo por WhatsApp",
    d: "Te confirmamos disponibilidad de cada prenda y color antes de que pagues.",
  },
  {
    t: "Paga completo o contra entrega",
    d: `Contra entrega: pagas el 30% para confirmar y el 70% más el envío al recibir, por ${negocio.transportadoras}.`,
  },
];

export default function Mayoristas() {
  const grupo = `https://wa.me/${negocio.whatsapp}?text=${encodeURIComponent(
    `Hola ${negocio.nombre}, quiero unirme al grupo de difusión de mayoristas.`,
  )}`;

  return (
    <>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 pt-10 sm:px-6 md:grid-cols-[1.2fr_1fr] md:items-center md:pt-16">
        <div>
          <h1 className="display text-5xl leading-[0.95] sm:text-6xl">Compra por mayor y haz crecer tu negocio</h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-humo">
            Desde 6 prendas surtidas, cada referencia te sale a precio mayorista. Si llevas menos, compras al detal.
          </p>
          <div className="mt-6">
            <MayoristaMeter unidades={negocio.minimoMayorista} tam="lg" />
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/catalogo"
              className="flex h-14 items-center justify-center rounded-full bg-tinta px-8 font-medium text-white hover:bg-frambuesa"
            >
              Armar mi pedido
            </Link>
            <a
              href={grupo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 items-center justify-center rounded-full border border-tinta px-8 font-medium hover:bg-rubor"
            >
              Unirme al grupo de difusión
            </a>
          </div>
        </div>
        <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-t-full bg-rubor">
          <Image
            src="/fotos/enterizos/1269-enterizo.jpg"
            alt="Enterizos Laura B en dos colores"
            fill
            sizes="(min-width: 768px) 384px, 90vw"
            className="object-cover object-top"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 md:pt-24">
        <h2 className="display text-3xl sm:text-4xl">Así funciona</h2>
        <ol className="mt-8 grid gap-8 md:grid-cols-4 md:gap-6">
          {pasos.map((p, i) => (
            <li key={p.t} className="border-t border-tinta pt-4">
              <span className="display text-4xl text-fucsia">{i + 1}</span>
              <h3 className="mt-2 font-medium">{p.t}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-humo">{p.d}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
