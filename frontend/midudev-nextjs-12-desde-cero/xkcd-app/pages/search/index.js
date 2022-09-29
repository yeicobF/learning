import Head from "next/head"
import { Layout } from "components/Layout"
import Link from "next/link"
import Image from "next/image"
import { search } from "services/search"

export default function Search({ query, results }) {
  return (
    <>
      <Head>
        <title>xkcd - Results for {query}</title>
        <meta name="description" content={`Search results for ${query}`} />
      </Head>

      <Layout>
        <h1>
          {results.length} resultados para {query}
        </h1>
        {results.map((result) => {
          return (
            <Link key={result.id} href={`/comic/${result.id}`}>
              <a className="flex flex-row items-center justify-start bg-slate-300 hover:bg-slate-50">
                <Image
                  className="rounded-full"
                  src={result.img}
                  width="50"
                  height="50"
                  alt={result.alt}
                />
                <div>
                  <h2>{result.title}</h2>
                </div>
              </a>
            </Link>
          )
        })}
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

  const { results } = await search({ query: q })

  return {
    props: {
      query: q,
      results,
    },
  }
}
