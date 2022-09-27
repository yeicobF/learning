import { search } from "services/search"

export default async function handler(req, res) {
  // Desestructuración para obtener la q.
  const {
    query: { q },
  } = req

  const { results } = await search({ query: q })

  // No hace falta hacer un return. Es una cuestión de preferencias. En este
  // caso, Midu lo ponía porque le gusta más.
  return res.status(200).json(results)
}
