import { Text, Link as NextUILink } from "@nextui-org/react"

const XKCD_URL = "https://xkcd.com"

export function Footer() {
  return (
    <footer className="text-center flex justify-center items-center font-bold pb-4 pt-4">
      <NextUILink
        href={XKCD_URL}
        color="error"
        target="_blank"
        rel="noopener noreferrer"
        underline
        className="text-center"
      >
        All comics by xkcd comics
      </NextUILink>
    </footer>
  )
}
