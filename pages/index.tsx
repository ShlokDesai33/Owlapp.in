import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { List, X } from 'phosphor-react'
import Link from 'next/link'
import Image from 'next/image'
import logoSvg from '../public/images/logo.svg'
import Spinner from '../components/lib/spinner'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { NextPage } from 'next/types'

const navigation = [
  { name: 'About Us', href: '/about' },
  { name: 'Our Vision', href: '/vision' },
  { name: 'Terms & Conditions', href: '/terms&conditions' },
  { name: 'Privacy Policy', href: '/policy' },
]

/**
 * Landing page for the app
 * @returns {NextPage} next page without layout
 */
const Home: NextPage = () => {
  // define states
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  if (loading) {
    return (
      <>
        <Head>
          <title>Owl</title>
          <meta name="description" content="Owl's landing page"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
          <meta name="keywords" content="Owl, Home, Log In, Sign Up, Landing Page"></meta>
          <meta name="author" content="Owl"></meta>
          <link rel="icon" href="/images/favicon.ico"/>
        </Head>

        <div className="flex w-screen h-screen items-center justify-center">
          <Spinner />
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Owl</title>
        <meta name="description" content="Owl's landing page"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta name="keywords" content="Owl, Home, Log In, Sign Up, Landing Page"></meta>
        <meta name="author" content="Owl"></meta>
        <link rel="icon" href="/images/favicon.ico"/>
      </Head>

      <div className="isolate bg-white h-screen">
        <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
          <svg
            className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
              fillOpacity=".3"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#9089FC" />
                <stop offset={1} stopColor="#FF80B5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="px-6 pt-6 lg:px-8">
          <div>
            <nav className="flex h-9 items-center justify-between" aria-label="Global">
              <div className="flex lg:min-w-0 lg:flex-1" aria-label="Global">
                <div className="-m-1.5 p-1.5">
                  <span className="sr-only">Owl</span>
                  <Image
                    src={logoSvg}
                    alt="Logo"
                    width={50}
                    height={50}
                  />
                </div>
              </div>
              <div className="flex lg:hidden">
                <button
                  type="button"
                  className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <span className="sr-only">Open main menu</span>
                  <List size={30} className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-center lg:gap-x-12">
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href} passHref>
                    <button className="font-semibold text-gray-900 hover:text-gray-900 shrink-0 hover:underline underline-offset-2">
                      {item.name}
                    </button>
                  </Link>
                ))}
              </div>
              <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-end">
                <button 
                  className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                  onClick={e => {
                    e.preventDefault();
                    setLoading(true);
                    router.push('/auth/signin');
                  }}
                >
                  Log in
                </button>
              </div>
            </nav>
            <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
              <Dialog.Panel className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden">
                <div className="flex h-9 items-center justify-between">
                  <div className="flex">
                    <div className="-m-1.5 p-1.5">
                      <span className="sr-only">Owl</span>
                      <Image
                        src={logoSvg}
                        alt="Logo"
                        width={50}
                        height={50}
                      />
                    </div>
                  </div>
                  <div className="flex">
                    <button
                      type="button"
                      className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <X size={30} className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-gray-500/10">
                    <div className="space-y-2 py-6">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                    <div className="py-6">
                      <div 
                        className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                        onClick={e => {
                          e.preventDefault();
                          setLoading(true);
                          router.push('/auth/signin');
                        }}
                      >
                        Log in
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Dialog>
          </div>
        </div>
        <main className="h-full pb-20">
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
                    Find and Rent Scientific Resources at <span className="text-white header-stroke font-extrabold tracking-wide sm:tracking-normal">Owl</span>
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
                    <Link href="/resources" passHref>
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
        </main>
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-40rem)]">
          <svg
            className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
              fillOpacity=".3"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#9089FC" />
                <stop offset={1} stopColor="#FF80B5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </>
  )
}

export default Home