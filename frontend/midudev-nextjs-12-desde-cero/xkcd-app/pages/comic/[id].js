import Head from "next/head"
import { Header } from "components/Header"
import Image from "next/image"
import { readFile, stat } from "fs/promises"
import Link from "next/link"
import { Link as NextUiLink } from "@nextui-org/react"

export default function Comic({
  id,
  img,
  alt,
  title,
  width,
  height,
  hasPrevious,
  hasNext,
  prevId,
  nextId,
}) {
  return (
    <>
      <Head>
        <title>xkcd - Comics for developers</title>
        <meta name="description" content="Comics for developers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <section className="max-w-lg m-auto">
          <h1 className="font-bold">{title}</h1>
          <Image id={id} width={width} height={height} src={img} alt={alt} />
          <p>{alt}</p>

          <footer className="flex gap-2">
            {hasPrevious && (
              <Link href={`/comic/${prevId}`} passHref>
                <NextUiLink>Previous</NextUiLink>
              </Link>
            )}
            {hasNext && (
              <Link href={`/comic/${nextId}`} passHref>
                <NextUiLink>Next</NextUiLink>
              </Link>
            )}
          </footer>
        </section>
      </main>
    </>
  )
}

/**
 * Devolver cuándo debemos generar una página estática.
 *
 * La necesitamos cuando tenemos un getStaticProps y estamos en una página
 * dinámica.
 *
 * Cuando exportamos la función `getStaticPaths` (SSG) desde una página que
 * utiliza rutas dinámicas, Next.js pre-renderizará estáticamente todas las
 * rutas definidas por `getStaticPaths`.
 *
 * Solamente se ejecuta en el build de producción. No será llamado en runtime.
 */
export async function getStaticPaths() {
  return {
    paths: [
      // En params hay que indicar cada una de las ids que tenemos que generar.
      // entramos a una ruta con un id en este CacheStorage, generaría esa
      // página.
      //
      // Si el id no existe, muestra un 404.
      { params: { id: "2669" } },
      { params: { id: "2670" } },
      { params: { id: "2671" } },
    ],
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  // Aquí recibimos en params lo que regresamos desde getStaticPaths.
  const { id } = params
  const content = await readFile(`./comics/${id}.json`, "utf-8")
  const comic = JSON.parse(content)

  // Paginación. Ver si hay elementos posteriores y anteriores.
  const idNumber = +id
  const prevId = idNumber - 1
  const nextId = idNumber + 1

  // Para que la promesa se resuelva, deben de resolverse todas. Si una falla,
  // ya no se resuelve esta promesa.
  const [prevResult, nextResult] = await Promise.allSettled([
    // stat indica si existe un archivo o no.
    stat(`./comics/${prevId}.json`),
    stat(`./comics/${nextId}.json`),
  ])

  const hasPrevious = prevResult.status === "fulfilled"
  const hasNext = nextResult.status === "fulfilled"

  return {
    props: {
      ...comic,
      hasPrevious,
      hasNext,
      prevId,
      nextId,
    },
  }
}
