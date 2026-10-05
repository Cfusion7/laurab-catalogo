import Link from "next/link";

export default function NoEncontrado() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <h1 className="display text-4xl">Esta página no existe</h1>
      <p className="mt-3 text-humo">Puede que el enlace haya cambiado. El catálogo completo sigue aquí.</p>
      <Link href="/catalogo" className="mt-8 rounded-full bg-tinta px-8 py-4 font-medium text-white">
        Ver catálogo
      </Link>
    </section>
  );
}
