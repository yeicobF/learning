// No podemos desestructurar porque 'fs-extra' es un módulo de CommonJS y no de
// ES6. En este caso hay que importar con el default export y luego de ese valor
// ya podemos desestructurar.
import fs from "fs-extra"
import axios from "axios"

// Primer comic que queremos guardar en el file system.
const INITIAL_ID_XKCD_COMIC = 2600

// Último comic que queremos guardar en el file system. En este caso, es el
// último publicado (2676 -> 23/SEP/2022).
//
// https://xkcd.com/2676/info.0.json
const MAX_ID_XKCD_COMIC = 2676
const COMICS_DIR = "./comics"

// Vamos a hacer peticiones y descargar los archivos JSON de cada comic en el
// sistema de archivos.
for (let id = INITIAL_ID_XKCD_COMIC; id <= MAX_ID_XKCD_COMIC; id++) {
  const url = `https://xkcd.com/${id}/info.0.json`
  const file = `${COMICS_DIR}/${id}.json`

  // Top level await que nos permite hacer porque el proyecto es `type: module`
  // (indicado en el `package.json`).
  const { data } = await axios.get(url)

  // Desestructuramos para sacar las propiedades que no necesitamos y obtener
  // las restantes en `restOfComic`.
  const { num, news, transcript, ...restOfComic } = data

  const comicToStore = {
    id,
    ...restOfComic,
  }

  try {
    // Verificar que el directorio existe. Si no existe, crearlo.
    // https://github.com/jprichardson/node-fs-extra/blob/HEAD/docs/ensureDir.md
    /* await fs.ensureDir(COMICS_DIR) */

    // Se asegura de que el archivo exista. Si el requerimos que el archivo se
    // cree en un directorio inexistente, se crea. Si el archivo ya existe, NO
    // SE MODIFICA.
    //
    // https://github.com/jprichardson/node-fs-extra/blob/HEAD/docs/ensureFile.md
    await fs.ensureFile(file)

    // Top level await. Para añadir un archivo en esa ruta hay que tener el
    // directorio creado. También podríamos hacerlo programáticamente. Este
    // método si sobreescribe el archivo.
    await fs.writeJSON(file, comicToStore)
  } catch (error) {
    console.error(error)
  }
}
