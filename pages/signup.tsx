import { LockSimple } from 'phosphor-react'
import Image from 'next/image'
import logoSvg from '../public/images/logo.svg'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'next/link'
import Spinner from '../components/lib/spinner'
import PasswordInputField from '../components/auth/input/password'

type Props = {
  pageState: 'default' | '401' | '309' | '500'
}

const SignUp = ({ pageState }: Props) => {
  // state of the page
  const [state, setState] = useState<'default' | 'loading' | '401' | '309' | '500'>(pageState);
  // router
  const router = useRouter();

  if (state === 'loading') {
    return (
      <>
        <Head>
          <title>Sign In | Owl</title>
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
        <title>Sign In | Owl</title>
        <meta name="description" content="Owl's landing page"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta name="keywords" content="Owl, Home, Log In, Sign Up, Landing Page"></meta>
        <meta name="author" content="Owl"></meta>
        <link rel="icon" href="/images/favicon.ico"/>
      </Head>

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

      <div className="flex h-screen pb-20 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <div className="flex justify-center">
              <Image
                src={logoSvg}
                alt="Logo"
                width={70}
                height={70}
              />
            </div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign up to get started
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/auth/signin">
                <button
                  type="button"
                  className="font-medium text-primary hover:text-primary/80"
                  onClick={e => {
                    e.preventDefault();
                    setState('loading');
                    router.push('/auth/signin');
                  }}
                >
                  Sign in
                </button>
              </Link>
            </p>
          </div>

          {
            state === '309' && (
              <p className="text-center text-red-600 text-base">This email is already registered to an account.</p>
            )
          }
          {
            state === '500' && (
              <p className="text-center text-red-600 text-base">An error occured. Please try again later.</p>
            )
          }

          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="full-name" className="sr-only">
                  Full name
                </label>
                <input
                  id="full-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Full name"
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <PasswordInputField />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/forgot" className="font-medium text-primary hover:text-primary/80">
                  <button type="button" className="text-primary hover:text-primary/80">
                    Forgot your password?
                  </button>
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockSimple weight="fill" size={30} className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign up
              </button>
            </div>

            <p className="text-gray-600 text-center text-sm">
              By signing up, you agree to Owl&apos;s{" "}
              <button className="underline underline-offset-2">
                <a href="/terms&conditions" target="_blank">Terms &amp; Conditions</a>
              </button>{" "}and our{" "}
              <button className="underline underline-offset-2">
                <a href="/policy" target="_blank">Privacy Policy</a>
              </button>
              .
            </p>
          </form>
        </div>
      </div>

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
    </>
  )
}

export default SignUp