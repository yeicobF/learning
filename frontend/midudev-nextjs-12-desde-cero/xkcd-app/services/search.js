/* Archivo en donde está extraída la lógica. */

/* https://www.algolia.com/doc/api-client/getting-started/initialize/javascript/?client=javascript */
// For the search only version
import algoliasearch from "algoliasearch/lite"

// https://www.algolia.com/account/api-keys/all?applicationId=APP_ID
const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_SEARCH_KEY,
)

const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME)

// Caché para el cliente. Se usa para evitar que se haga una petición a la API y
// utilizar lo que tenemos guardado en memoria.
//
// Solo funcionaría en la misma navegación del usuario. El Local Storage
// almacena la información entre navegaciones, pero es más difícil de acceder.
const CACHE = {}

export const search = async ({ query }) => {
  if (CACHE[query]) {
    console.log(`=> from cache: ${query} -> ${CACHE[query].length} results`)

    return { results: CACHE[query] }
  }

  // https://www.algolia.com/doc/api-reference/api-methods/search/
  const { hits } = await index.search(query, {
    // attributesToRetrieve: Atributos que queremos obtener.
    attributesToRetrieve: ["id", "title", "img", "alt", "width", "height"],
    // hitsPerPage: Número de resultados que queremos.
    hitsPerPage: 10,
  })

  CACHE[query] = hits

  return { results: hits }
}
