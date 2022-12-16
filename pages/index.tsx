import { useState } from 'react'
import Link from 'next/link'
import Spinner from '../components/lib/spinner'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { NextPageWithLayout } from '../typescript/nextpage'
import Layout from '../components/layout'
import Gradient from '../components/layout/components/gradient'

/**
 * Landing page for the app
 * @returns {NextPage} next page without layout
 */
const Home: NextPageWithLayout = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  if (loading) {
    return (
      <>
        <Head>
          <title>Instrumus</title>
          <meta name="description" content="Owl's landing page"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
          <meta name="keywords" content="Owl, Home, Log In, Sign Up, Landing Page"></meta>
          <meta name="author" content="Owl"></meta>
          <link rel="icon" href="/images/favicon.ico"/>
        </Head>

        <div className="flex w-full h-full items-center justify-center">
          <Spinner />
          <Gradient />
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Instrumus</title>
        <meta name="description" content="Owl's landing page"/>
        <meta name="keywords" content="Owl, Home, Log In, Sign Up, Landing Page"></meta>
      </Head>

      <main className="h-full">
        <div className="relative px-6 lg:px-8 h-full">
          <div className="mx-auto max-w-3xl h-full flex items-center">
            <div>
              <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                <div className="relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                  <span className="text-gray-600">
                    Admin or Organization?{' '}
                    <a href="https://owl-console.vercel.app/" className="font-semibold text-primary">
                      <span className="absolute inset-0" aria-hidden="true" />
                      Go to console<span aria-hidden="true">&rarr;</span>
                    </a>
                  </span>
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl">
                  Find and Rent Scientific Resources at <span className="text-white header-stroke font-extrabold tracking-wide sm:tracking-normal">Instrumus</span>
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-center">
                  We make it exceptionaly easy to book scientific and research oriented
                  resources offered by universities, colleges and private organizations. 
                </p>
                <div className="mt-8 flex gap-x-4 sm:justify-center">
                  <button
                    className="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700"
                    onClick={e => {
                      e.preventDefault();
                      setLoading(true);
                      router.push('/auth/signup');
                    }}
                  >
                    Get started
                    <span className="text-indigo-200" aria-hidden="true">
                      &rarr;
                    </span>
                  </button>
                  <Link href="/browse" passHref>
                    <button className="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                      Browse
                      <span className="text-gray-400" aria-hidden="true">
                        &rarr;
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Gradient />
      </main>
    </>
  )
}

// return the Home page wrapped in the Layout component
Home.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
}

export default Home