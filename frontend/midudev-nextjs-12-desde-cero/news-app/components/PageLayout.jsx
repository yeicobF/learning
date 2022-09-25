import Head from "next/head";
import Link from "next/link";

export default function PageLayout({ children, title }) {
  return (
    <>
      <Head>
        <title>{title ?? "NewsApp"}</title>
        <meta
          name="description"
          content="newsapp - the best app to read news"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Link href="/">🗞️ newsapp</Link>
        <Link href="/about">About</Link>
      </header>

      <main>{children}</main>

      <style jsx>{`
        header {
          padding: 20px;
          display: flex;
          width: 100%;
          justify-content: flex-start;
          align-items: baseline;
          gap: 1rem;
        }
      `}</style>
    </>
  );
}
