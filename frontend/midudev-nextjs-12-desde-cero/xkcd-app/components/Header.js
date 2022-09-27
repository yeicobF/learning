import { Button, Container, Text } from "@nextui-org/react"
import { Link as NextUILink } from "@nextui-org/react"
import Link from "next/link"
import { useRouter } from "next/router"

const XKCD_URL = "https://xkcd.com"

export function Header() {
  return (
    <Container
      as="header"
      display="flex"
      alignItems="center"
      justify="space-between"
      className="gap-2"
    >
      <h1 className="flex gap-2">
        <Text weight="bold">next</Text>
        <Text weight="extrabold">
          <NextUILink href={XKCD_URL} color="error" rel="noopener noreferrer">
            xkcd comics
          </NextUILink>
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
            <Link href="/about" passHref>
              <NextUILink underline className="font-semibold">
                About
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
    </Container>
  )
}
