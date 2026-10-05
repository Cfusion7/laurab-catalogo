import Image from "next/image";
import Link from "next/link";
import { categorias, productosDe } from "@/data/productos";

export default function CategoryGrid() {
  return (
    <ul className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-5 md:grid-cols-4">
      {categorias.map((c) => {
        const n = productosDe(c.slug).length;
        const promo = c.slug === "promociones";
        return (
          <li key={c.slug}>
            <Link href={`/catalogo/${c.slug}`} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] bg-rubor">
                <Image
                  src={c.foto}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
                {promo && (
                  <span className="absolute left-2.5 top-2.5 rounded-full bg-fucsia px-2.5 py-1 text-xs font-semibold text-tinta">
                    Hasta -50%
                  </span>
                )}
              </div>
              <div className="mt-2.5 flex items-baseline justify-between gap-2">
                <span className="display text-xl leading-tight sm:text-2xl">{c.nombre}</span>
                <span className="text-xs text-humo">{n}</span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
