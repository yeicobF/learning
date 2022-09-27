/* https://www.algolia.com/doc/api-client/getting-started/initialize/javascript/?client=javascript */
// For the search only version
import algoliasearch from "algoliasearch/lite"

// https://www.algolia.com/account/api-keys/all?applicationId=APP_ID
const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_SEARCH_KEY,
)
const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME)

export default async function handler(req, res) {
  // Desestructuración para obtener la q.
  const {
    query: { q },
  } = req

  // https://www.algolia.com/doc/api-reference/api-methods/search/
  const { hits } = await index.search(q, {
    // attributesToRetrieve: Atributos que queremos obtener.
    attributesToRetrieve: ["id", "title", "img", "alt"],
    // hitsPerPage: Número de resultados que queremos.
    hitsPerPage: 10,
  })

  // No hace falta hacer un return. Es una cuestión de preferencias. En este
  // caso, Midu lo ponía porque le gusta más.
  return res.status(200).json(hits)
}
