import { Button, Container, Text } from "@nextui-org/react"
import { Link as NextUILink } from "@nextui-org/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useRef, useState } from "react"

export function Header() {
  const [results, setResults] = useState([])
  const searchRef = useRef()
  // Optional chaining porque value podría no existir, ser undefined.
  const q = searchRef.current?.value

  const handleChange = () => {
    if (!q) {
      setResults([])
      return
    }

    fetch(`/api/search?q=${q}`)
      .then((res) => res.json())
      .then((searchResults) => {
        setResults(searchResults)
      })
  }

  return (
    <header className="m-auto flex max-w-xl items-center justify-between p-4">
      <h1 className="flex gap-2 transition hover:opacity-80">
        <Text weight="bold">
          <Link href="/" passHref>
            <NextUILink color="secondary" underline>
              next xkcd
            </NextUILink>
          </Link>
        </Text>
      </h1>
      <nav>
        <ul className="flex flex-row items-center gap-2">
          <li className="relative">
            <input
              type="search"
              onChange={handleChange}
              ref={searchRef}
              className="rounded-3xl border border-gray-400 px-4 py-1 text-xs"
              // className="p-1 rounded-t-sm bg-orange-100 border-b-orange-500 border-b-2"
            />

            {Boolean(results.length) && (
              <ul className="absolute left-0 top-full z-10 w-full overflow-hidden rounded-lg border border-gray-50 bg-white shadow-xl">
                {results.map((result) => {
                  return (
                    <li key={result.id} className="m-0">
                      <Link href={`/comic/${result.id}`}>
                        <a className="block px-2 py-1 text-sm font-semibold hover:bg-slate-200">
                          {result.title}
                        </a>
                      </Link>
                    </li>
                  )
                })}

                <li key="all-results" className="m-0">
                  <Link href={`/search?q=${q}`}>
                    <a className="block overflow-hidden text-ellipsis whitespace-nowrap px-2 py-1 text-sm font-semibold italic text-gray-400 hover:bg-slate-200">
                      Ver {results.length} resultados
                    </a>
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </header>
  )
}
