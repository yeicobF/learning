import { parse } from "url"
import https from "https"

import sizeOf from "image-size"

export const getImageSize = ({ url }) => {
  /**
   * Lee la información y recupera chunks. Cada que le llega información guarda
   * los chunks, que son como bytes.
   */
  return new Promise((resolve) => {
    https.get(url, (response) => {
      const chunks = []

      response
        .on("data", (chunk) => {
          chunks.push(chunk)
        })
        // Cuando termina de guardar todos los chunks, lo convierte en un Buffer
        // y se manda al sizeOf, que nos daría el cálculo del tamaño.
        .on("end", () => {
          const buffer = Buffer.concat(chunks)
          const { height, width } = sizeOf(buffer)

          // Resolver la promesa una vez que haya terminado de ejecutar sus
          // operaciones. Quedará pending hasta que se resuelva.
          resolve({ height, width })
        })
    })
  })
}
