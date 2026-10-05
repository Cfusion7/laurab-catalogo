import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryBar from "@/components/CategoryBar";
import ProductCard from "@/components/ProductCard";
import { categoriaPorSlug, categorias, productosDe } from "@/data/productos";

type Props = { params: Promise<{ categoria: string }> };

export function generateStaticParams() {
  return categorias.map((c) => ({ categoria: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params;
  const c = categoriaPorSlug(categoria);
  return { title: c ? `${c.nombre} | Laura B` : "Laura B" };
}

export default async function PaginaCategoria({ params }: Props) {
  const { categoria } = await params;
  const cat = categoriaPorSlug(categoria);
  if (!cat) notFound();
  const lista = productosDe(cat.slug);
  const i = categorias.findIndex((c) => c.slug === cat.slug);
  const siguiente = categorias[(i + 1) % categorias.length];

  return (
    <>
      <CategoryBar activa={cat.slug} />
      <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 md:pt-12">
        <h1 className="display text-4xl sm:text-5xl">{cat.nombre}</h1>
        <p className="mt-2 text-humo">
          {cat.slug === "promociones"
            ? "Prendas con precio rebajado. Talla única."
            : "Talla única. Desde 6 prendas surtidas pagas el precio por mayor."}
        </p>

        <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4">
          {lista.map((p, idx) => (
            <ProductCard key={p.id} p={p} prioridad={idx < 2} />
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            href={`/catalogo/${siguiente.slug}`}
            className="rounded-full border border-tinta px-7 py-3.5 text-sm font-medium hover:bg-rubor"
          >
            Seguir con {siguiente.nombre.toLowerCase()}
          </Link>
        </div>
      </section>
    </>
  );
}
