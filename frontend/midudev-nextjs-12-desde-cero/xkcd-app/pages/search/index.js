import Head from "next/head"
import { Layout } from "components/Layout"
import Link from "next/link"
import Image from "next/image"

export default function Component({ query, results }) {
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
              <a className="flex flex-row justify-start bg-slate-300 hover:bg-slate-50 items-center">
                <Image
                  className="rounded-full"
                  src={result.img}
                  width="50"
                  height="50"
                  alt={result.alt}
                  title={result.title}
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

  /**
    Llamar a la API de Algolia para buscar los resultados. Obtenemos un arreglo
    con los JSON de los resultados.

    https://nextjs.org/docs/routing/introduction#linking-to-dynamic-paths

    No podemos hacer una búsqueda con una ruta relativa.

    - Es una mala práctica utilizar rutas absolutas. Si utilizamos una ruta
      absoluta al entorno de desarrollo, no funcionará en producción. Hay formas
      de detectar si estamos en desarrollo o producción, pero no es lo mejor. 
    - Tampoco está muy bien utilizar `process.env.HOST`. Funciona, pero no es
      correcto.


    ```js
    const results = await fetch(
      `http://localhost:3000/api/search?q=${encodeURIComponent(q)}`,
    ).then((res) => res.json())

    ## ¿Por qué está mal?

    No tiene sentido hacerlo así, porque podríamos extraer la lógica del
    microservicio que creamos en Next al otro fichero (podemos dejar el endpoint
    porque nos puede interesar tenerlo), pero aún así podría petar si mantenemos
    el código.

    Cuando Vercel despliega el microservicio, lo hace separado de la aplicación
    uno del otro, ya que está en lambdas. 

    ## ¿Qué podría ocurrir?

    Podría ocurrir que despleguemos la web y no esté lo otro desplegado aún y
    por eso se rompa, ya que no es capaz de encontrarlo. Nos puede pasar con el
    `serverSideProps` o el `getStaticProps`.

    Si con el getStaticProps intentamos hacer un fetch, entraremos como en un
    loop porque si no puede hacer el fetch al microservicio (que aún no existe)
    no podrá hacer la build, por lo que no se podrá desplegar el microservicio.

    ## ¿Qué está bien?

    ### Servicio externo

    Si es un servicio externo (API de terceros), sí podemos obtener el host para
    poder hacer la petición. Esto aquí sí estaría bien.

    ```js
    const host = process.env.NEXT_PUBLIC_HOST

    const res = await fetch(`${host}/api/search?q=${q}`)
    ```

## Servicio interno (nuestro microservicio)

Solo está mal si es un servicio nuestro. No tiene sentido que intentemos hacer
el fetch de nuestro propio microservicio.
    */

  /* 
    Una forma para obtener los results, en lugar de las promesas concatenadas y
    obtenidas con await. 

    const response = await fetch(
      `http://localhost:3000/api/search?q=${encodeURIComponent(q)}`,
    )
    const results = await response.json() 
  */

  // No es lo mejor. En un momento modificaré la implementación. Voy en el
  // minuto [05:34:41/08:25:24] del vídeo.
  const results = await fetch(
    `http://localhost:3000/api/search?q=${encodeURIComponent(q)}`,
  ).then((res) => res.json())

  return {
    props: {
      query: q,
      results,
    },
  }
}
