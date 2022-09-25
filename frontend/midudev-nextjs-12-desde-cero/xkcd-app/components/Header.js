import { Container, Text } from "@nextui-org/react"
import { Link } from "@nextui-org/react"

export default function Header() {
  return (
    <Container
      as="header"
      display="flex"
      alignItems="center"
      justify="space-between"
      className="gap-2"
    >
      <span className="flex gap-2">
        <Text weight="semibold">next</Text>
        <Text weight="extrabold">xkcd</Text>
      </span>
      <nav>
        <ul className="flex flex-row gap-2 items-center">
          <li>
            <Link href="/" underline>
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" underline>
              About
            </Link>
          </li>
          <li>
            <Link href="/search" underline>
              Search
            </Link>
          </li>
        </ul>
      </nav>
    </Container>
  )
}
