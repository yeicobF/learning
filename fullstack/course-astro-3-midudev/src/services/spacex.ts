import { type Doc, type APISpaceXResponse } from "../types/api"

export const getLaunchById = async ({ id }: { id: string }) => {
  const res = await fetch(`https://api.spacexdata.com/v5/launches/${id}`)
  const launch = (await res.json()) as Doc

  return launch
}

export const getLatestLaunches = async () => {
  // Podemos ejecutar cualquier JavaScript que queramos.
  // Podemos hacer un fetching de datos.

  // Filtramos los datos que queremos obtener utilizando la ruta /query y haciendo
  // un POST con los parámetros.

  const res = await fetch("https://api.spacexdata.com/v5/launches/query", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: {},
      options: {
        sort: {
          date_unix: "asc",
        },
        limit: 12,
      },
    }),
  })
  const { docs: launches } = (await res.json()) as APISpaceXResponse

  return launches
}
