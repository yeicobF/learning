import { Button, Container, Text } from "@nextui-org/react"
import { Link as NextUILink } from "@nextui-org/react"
import Link from "next/link"
import { useRouter } from "next/router"

export function Header() {
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
          <li>
            <Link href="/search" passHref>
              <NextUILink underline className="font-semibold">
                Search
              </NextUILink>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
