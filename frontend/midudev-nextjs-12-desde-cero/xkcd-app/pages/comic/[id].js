import Head from "next/head"
import { Header } from "components/Header"
import Image from "next/image"
import { readFile } from "fs/promises"

export default function Comic({ id, img, alt, title, width, height }) {
  return (
    <>
      <Head>
        <title>xkcd - Comics for developers</title>
        <meta name="description" content="Comics for developers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <h1>{title}</h1>
        <Image id={id} width={width} height={height} src={img} alt={alt} />
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
    ],
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  // Aquí recibimos en params lo que regresamos desde getStaticPaths.
  const { id } = params
  const content = await readFile(`./comics/${id}.json`, "utf-8")
  const comic = JSON.parse(content)
  console.log("🚀 ~ file: [id].js ~ line 56 ~ getStaticProps ~ comic", comic)

  //   const promisesReadFiles = latestComicsFiles.map(async (fileName) => {
  //     const content = await fs.readFile(`./comics/${fileName}`, "utf-8")
  //
  //     return JSON.parse(content)
  //   })
  //
  //   const latestComics = await Promise.all(promisesReadFiles)

  return {
    props: {},
  }
}
