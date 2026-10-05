import type { Metadata } from "next";
import CategoryBar from "@/components/CategoryBar";
import CategoryGrid from "@/components/CategoryGrid";

export const metadata: Metadata = { title: "Catálogo | Laura B" };

export default function Catalogo() {
  return (
    <>
      <CategoryBar />
      <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 md:pt-12">
        <h1 className="display text-4xl sm:text-5xl">Catálogo 2026</h1>
        <p className="mt-2 max-w-lg text-humo">
          Elige una categoría. Todas las prendas son talla única y el precio mayorista se activa desde 6 prendas surtidas.
        </p>
        <div className="mt-8">
          <CategoryGrid />
        </div>
      </section>
    </>
  );
}
