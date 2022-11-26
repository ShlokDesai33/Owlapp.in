import Head from 'next/head'
import Image from 'next/image'
import logoSvg from '../../public/images/logo.svg'
import Link from 'next/link'
import PasswordInputField from '../../components/auth/input/password'
import { useState } from 'react'
import Spinner from '../../components/lib/spinner'
import { useRouter } from 'next/router'
import { LockSimple } from 'phosphor-react'
import { NextPage } from 'next'
import Gradient from '../../components/layout/components/gradient'

const SignUp: NextPage = () => {
  // state of the page
  const [state, setState] = useState<'default' | 'loading' | '401' | '309' | '500'>('default');
  const router = useRouter();

  if (state === 'loading') {
    return (
      <>
        <Head>
          <title>Sign Up | Owl</title>
          <meta name="description" content="Sign Up"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
          <meta name="keywords" content="owl, home, log up, sign up"></meta>
          <meta name="author" content="Owl"></meta>
          <link rel="icon" href="/images/favicon.ico"/>
        </Head>

        <div className="flex w-full h-full items-center justify-center">
          <Spinner />
        </div>
      </>
    );
  }
  
  return (
    <>
      <Head>
        <title>Sign Up | Owl</title>
        <meta name="description" content="Sign Up"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta name="keywords" content="owl, home, log up, sign up"></meta>
        <meta name="author" content="Owl"></meta>
        <link rel="icon" href="/images/favicon.ico"/>
      </Head>

      <div className="flex h-full pb-20 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <main className="w-full max-w-md space-y-8">
          <div>
            <Link href="/">
              <button className="w-full">
                <Image
                  src={logoSvg}
                  alt="Logo"
                  width={70}
                  height={70}
                />
              </button>
            </Link>

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

          <form className="mt-8 space-y-6" onSubmit={e => {
            e.preventDefault();
            setState('loading');

            const formData = new FormData(e.target as HTMLFormElement);
            // check if the inputs are valid
            const email = formData.get('email');
            const password = formData.get('password');
            const name = formData.get('name');

            if (email === null || password === null || name === null) {
              setState('500');
              return;
            }

            // test email with regex
            if (/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/.test(email as string) === false) {
              setState('500');
              return;
            }

            // test password with regex
            // if (/^$/.test(password as string) === false) {
            //   setState('500');
            //   return;
            // }

            fetch('/api/auth/signup', {
              method: 'POST',
              body: JSON.stringify(
                {
                  email,
                  password,
                  fullname: name
                }
              ),
              headers: { 'Content-Type': 'application/json' }
            })
            .then(res => {
              if (res.status === 200) {
                // redirect to home
                router.push('/dashboard/');
              } else if (res.status === 401) {
                setState('401');
              } else if (res.status === 309) {
                setState('309');
              } else {
                setState('500');
              }
            });
          }}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px shadow-sm">
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
        </main>

        <Gradient />
      </div>
    </>
  )
}

export default SignUp