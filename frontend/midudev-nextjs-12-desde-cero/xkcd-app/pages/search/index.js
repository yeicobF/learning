import Head from "next/head"
import { Layout } from "components/Layout"

export default function Component({ query }) {
  return (
    <>
      <Head>
        <title>xkcd - Results for {query}</title>
        <meta name="description" content={`Search results for ${query}`} />
      </Head>

      <Layout>
        <h1>Resultados para {query}</h1>
      </Layout>
    </>
  )
}

export async function getServerSideProps(context) {
  const { query } = context
  // Si la query no recibe nada, no puede serializar undefined, por lo que se
  // romperá el programa. Con un string vacío predeterminado, no se romperá, ya
  // que evidentemente se pasa a string.
  const { q = "" } = query

  // Llamar a la API de Algolia para buscar los resultados.

  return {
    props: {
      query: q,
    },
  }
}
