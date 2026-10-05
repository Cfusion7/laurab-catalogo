import Image from "next/image";
import Link from "next/link";
import { negocio, politicas } from "@/data/negocio";
import CategoryGrid from "@/components/CategoryGrid";
import MayoristaMeter from "@/components/MayoristaMeter";
import Wordmark from "@/components/Wordmark";

const fotosPortada = [
  { src: "/fotos/conjuntos/946-conjunto.jpg", alt: "Conjunto negro con ribete blanco" },
  { src: "/fotos/bodys/2184-body-kendal.jpg", alt: "Body Kendal negro en malla" },
  { src: "/fotos/bodys/2164-body-grill.jpg", alt: "Body Grill blanco" },
];

export default function Inicio() {
  return (
    <>
      {/* PORTADA */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 pt-10 sm:px-6 md:grid-cols-[1.05fr_1fr] md:gap-12 md:pb-20 md:pt-16">
        <div className="entrada">
          <h1>
            <Wordmark className="block text-[23vw] leading-[0.85] sm:text-[8.5rem] md:text-[9rem] lg:text-[10.5rem]" />
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-humo sm:text-xl">{negocio.eslogan}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/catalogo"
              className="flex h-14 items-center justify-center rounded-full bg-tinta px-8 text-base font-medium text-white transition-colors hover:bg-frambuesa"
            >
              Ver catálogo
            </Link>
            <Link
              href="/mayoristas"
              className="flex h-14 items-center justify-center rounded-full border border-tinta px-8 text-base font-medium transition-colors hover:bg-rubor"
            >
              Comprar por mayor
            </Link>
          </div>
          {negocio.direccion && (
            <p className="mt-6 text-sm text-humo">
              {negocio.mapsUrl ? (
                <a href={negocio.mapsUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                  {negocio.direccion}
                </a>
              ) : (
                negocio.direccion
              )}
            </p>
          )}
        </div>

        <div className="entrada grid grid-cols-3 gap-2.5 sm:gap-4" style={{ animationDelay: "120ms" }}>
          {fotosPortada.map((f, i) => (
            <div
              key={f.src}
              className={`relative aspect-[3/5] overflow-hidden rounded-full bg-rubor ${i === 1 ? "-translate-y-6 md:-translate-y-10" : "translate-y-2"}`}
            >
              <Image src={f.src} alt={f.alt} fill priority sizes="(min-width: 768px) 16vw, 32vw" className="object-cover object-top" />
            </div>
          ))}
        </div>
      </section>

      {/* MAYORISTA */}
      <section className="bg-rubor">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between md:py-14">
          <div className="max-w-xl">
            <h2 className="display text-3xl leading-tight sm:text-4xl">Desde 6 prendas, pagas precio mayorista</h2>
            <p className="mt-3 leading-relaxed text-humo">
              Puedes surtir: mezcla referencias, colores y categorías. Tu pedido cambia a precio mayorista solo, en cuanto
              sumas la sexta prenda.
            </p>
            <Link href="/mayoristas" className="mt-4 inline-block text-sm font-medium text-frambuesa underline underline-offset-4">
              Cómo funciona la compra por mayor
            </Link>
          </div>
          <MayoristaMeter unidades={negocio.minimoMayorista} tam="lg" />
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 md:pt-20">
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <h2 className="display text-3xl sm:text-4xl">Catálogo 2026</h2>
          <Link href="/catalogo" className="text-sm text-humo underline underline-offset-4 hover:text-tinta">
            Ver todo
          </Link>
        </div>
        <CategoryGrid />
      </section>

      {/* POLÍTICAS */}
      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 md:pt-24">
        <h2 className="display text-3xl sm:text-4xl">Antes de comprar</h2>
        <ul className="mt-6 grid gap-x-10 gap-y-6 md:grid-cols-2">
          {politicas.map((p) => (
            <li key={p.titulo} className="border-t border-linea pt-4">
              <h3 className="font-medium">{p.titulo}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-humo">{p.texto}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
