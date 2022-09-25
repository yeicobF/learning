import { Container, Text } from "@nextui-org/react"
import { Link as NextUILink } from "@nextui-org/react"
import Link from "next/link"

export default function Header() {
  return (
    <Container
      as="header"
      display="flex"
      alignItems="center"
      justify="space-between"
      className="gap-2"
    >
      <h1 className="flex gap-2">
        <Text weight="semibold">next</Text>
        <Text weight="extrabold">xkcd</Text>
      </h1>
      <nav>
        <ul className="flex flex-row gap-2 items-center">
          <li>
            <Link href="/" passHref>
              <NextUILink underline>Home</NextUILink>
            </Link>
          </li>
          <li>
            <Link href="/about" passHref>
              <NextUILink underline>About</NextUILink>
            </Link>
          </li>
          <li>
            <Link href="/search" passHref>
              <NextUILink underline>Search</NextUILink>
            </Link>
          </li>
        </ul>
      </nav>
    </Container>
  )
}
