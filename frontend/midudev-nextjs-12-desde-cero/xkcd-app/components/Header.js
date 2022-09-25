import Link from "next/link"

export default function Header() {
  return (
    <>
      <div class="">
        <sm>
          next <span style={{ fontWeight: "bold" }}>xkcd</span>
        </sm>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
            <Link href="/about">
              <a>About</a>
            </Link>
            <Link href="/search">
              <a>Search</a>
            </Link>
          </li>
        </ul>
      </nav>
      <div>Header</div>
    </>
  )
}
