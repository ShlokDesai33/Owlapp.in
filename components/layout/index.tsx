import Head from "next/head";
import LandingNavbar from "./components/navbar";

export default function Layout({ children, classes }: { children: React.ReactNode, classes?: string }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta name="author" content="Owl"></meta>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>

      <div className="h-full">
        <div className="fixed w-full top-0 z-10">
          <LandingNavbar classes={classes || ''} />
        </div>

        {children}
      </div>
    </>
  )
}