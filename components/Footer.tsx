import Image from "next/image";
import Link from "next/link";
import { negocio } from "@/data/negocio";
import { categorias } from "@/data/productos";
import Wordmark from "./Wordmark";

export default function Footer() {
  return (
    <footer className="mt-20 bg-tinta pb-28 pt-14 text-white md:pb-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/logo-laurab.png" alt="" width={48} height={48} className="h-12 w-12 ring-1 ring-white/20 rounded-full" />
            <Wordmark className="text-3xl text-white" />
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">{negocio.eslogan}</p>
          {negocio.direccion && (
            <p className="mt-4 text-sm text-white/80">
              {negocio.mapsUrl ? (
                <a href={negocio.mapsUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                  {negocio.direccion}
                </a>
              ) : (
                negocio.direccion
              )}
            </p>
          )}
          {negocio.horario && <p className="mt-1 text-sm text-white/60">{negocio.horario}</p>}
        </div>

        <div>
          <p className="display text-xl">Catálogo</p>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            {categorias.map((c) => (
              <li key={c.slug}>
                <Link href={`/catalogo/${c.slug}`} className="hover:text-white">
                  {c.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="display text-xl">Escríbenos</p>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>
              <a href={`https://wa.me/${negocio.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={`https://instagram.com/${negocio.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Instagram @{negocio.instagram}
              </a>
            </li>
            <li>
              <Link href="/mayoristas" className="hover:text-white">
                Compras por mayor
              </Link>
            </li>
            <li className="text-white/50">Envíos por {negocio.transportadoras}</li>
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-6xl px-4 text-xs text-white/40 sm:px-6">© {new Date().getFullYear()} Laura B</p>
    </footer>
  );
}
