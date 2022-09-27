import Head from "next/head"
import { Header } from "components/Header"
import Image from "next/image"
import Link from "next/link"
import { Link as NextUiLink } from "@nextui-org/react"
import { readdir, readFile, stat } from "fs/promises"
import { basename } from "path"

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
          <h1 className="font-bold text-xl text-center mb-4">{`#${id} - ${title}`}</h1>
          <div className="max-w-xs m-auto mb-4">
            <Image
              id={id}
              width={width}
              height={height}
              src={img}
              alt={alt}
              layout="responsive"
            />
          </div>
          <p>{alt}</p>

          <footer className="flex gap-2 justify-between mt-4 font-bold">
            {hasPrevious && (
              <Link href={`/comic/${prevId}`} passHref>
                <NextUiLink color="secondary">⬅️ Previous</NextUiLink>
              </Link>
            )}
            {hasNext && (
              <Link href={`/comic/${nextId}`} passHref>
                <NextUiLink color="secondary">Next ➡️</NextUiLink>
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
  // Obtener todos los archivos de la carpeta `comics` para saber cuáles
  // existen.
  //
  // Si tuviéramos muchos archivos (1 millón, por ejemplo), no valdría la pena
  // hacer este procedimiento desde el build. Estaríamos creando un millón de
  // páginas.
  const files = await readdir("./comics")

  // Arreglo con todos los ids para mandarlos como params al hacer el build de
  // las páginas estáticas.
  const paths = files.map((file) => {
    // Obtener el nombre de un archivo sin su directorio ni extensión. Hay que
    // indicar su extensión para que la extraiga de la cadena. Esto nos ayudará
    // a obtener los IDs de los comics para generar las páginas estáticas en
    // build time.
    const id = basename(file, ".json")

    return {
      // En params hay que indicar cada una de las ids que tenemos que generar.
      // entramos a una ruta con un id en este CacheStorage, generaría esa
      // página.
      //
      // Si el id no existe, muestra un 404.
      params: { id },
    }
  })

  return {
    paths,
    // false or "blocking" - Con fallback: false, si vamos a una página que no
    // tiene id en params, nos mostrará un 404.
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
