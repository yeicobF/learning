import { Button, Container, Text } from "@nextui-org/react"
import { Link as NextUILink } from "@nextui-org/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"

export function Header() {
  const [results, setResults] = useState([])

  const handleChange = (e) => {
    fetch(`/api/search?q=${e.target.value}`)
      .then((res) => res.json())
      .then((searchResults) => {
        setResults(searchResults)
      })
  }

  return (
    <header className="flex justify-between items-center p-4 max-w-xl m-auto">
      <h1 className="flex gap-2 hover:opacity-80 transition">
        <Text weight="bold">
          <Link href="/" passHref>
            <NextUILink color="secondary" underline>
              next xkcd
            </NextUILink>
          </Link>
        </Text>
      </h1>
      <nav>
        <ul className="flex flex-row gap-2 items-center">
          <li>
            <Link href="/" passHref>
              <NextUILink underline className="font-semibold">
                Home
              </NextUILink>
            </Link>
          </li>
          <li className="relative">
            <input type="search" onChange={handleChange} />
            {Boolean(results.length) && (
              <div className="absolute top-full left-0">
                <ul className="z-50">
                  {results.map((result) => {
                    return (
                      <li key={result.id}>
                        <Link href={`/comic/${result.id}`}>
                          <a className="text-sm font-semibold">
                            {result.title}
                          </a>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  )
}
