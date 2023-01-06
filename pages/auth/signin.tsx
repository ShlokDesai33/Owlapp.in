import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Cookies from 'cookies'
import Image from 'next/image'
import logoSvg from '../../public/images/logo.svg'
import Link from 'next/link'
import PasswordInputField from '../../components/auth/input/password'
import { useState } from 'react'
import Spinner from '../../components/lib/spinner'
import { useRouter } from 'next/router'
import { ArrowRight, LockSimple } from 'phosphor-react'
import Gradient from '../../components/layout/components/gradient'
import msalInstance from '../../components/auth/msal'

const SignIn: NextPage = () => {
  // state of the page
  const [state, setState] = useState<'default' | 'loading' | '401' | '309' | '500'>('default');
  const router = useRouter();

  if (state === 'loading') {
    return (
      <>
        <Head>
          <title>Sign In | Instrumus</title>
          <meta name="description" content="Sign In"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
          <meta name="keywords" content="owl, log In, sign in, forgot password"></meta>
          <meta name="author" content="Instrumus"></meta>
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
        <title>Sign In | Instrumus</title>
        <meta name="description" content="Sign In"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta name="keywords" content="owl, log In, sign in, forgot password"></meta>
        <meta name="author" content="Instrumus"></meta>
        <link rel="icon" href="/images/favicon.ico"/>
      </Head>

      <div className="flex h-full pb-20 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <main className="w-full max-w-md">
          <div>
            <Link href="/">
              <button className="w-full">
                <Image
                  src={logoSvg}
                  alt="Logo"
                  width={70}
                  height={70}
                  priority
                  
                />
              </button>
            </Link>

            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>

            <p className="mt-2 text-center text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <button type="button" className="font-medium text-primary hover:text-primary/80" onClick={e => {
                e.preventDefault();
                setState('loading');
                router.push('/auth/signup');
              }}>
                Sign up
              </button>
            </p>
          </div>

          {
            state === '500' && (
              <p className="text-center text-red-600 text-base mt-6">An error occured. Please try again later.</p>
            )
          }

          <button
            className="border-2 w-full py-2 border-indigo-500 hover:border-indigo-700 flex justify-between px-3 items-center mt-8"
            type="button"
            onClick={e => {
              e.preventDefault();
              setState('loading');
              msalInstance
                .loginPopup({ scopes: ['User.Read'] })
                .then(() => {
                  // use the account to get an auth-token
                  fetch('/api/auth/msal', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(msalInstance.getAllAccounts()[0])
                  })
                    .then((res) => {
                      if (res.status === 200) {
                        // redirect to home
                        router.push('/dashboard/');
                      } else {
                        setState('500');
                      }
                    })
                })
                .catch(() => {
                  localStorage.clear();
                  setState('500');
                });
            }}
          >
            Student / Instructor Sign In
            <ArrowRight className="h-5 w-5" />
          </button>

          {
            state === '309' ? 
            (
              <p className="text-center text-red-600 text-base my-8">This email is not registered to an account.</p>
            )
            : state === '401' ?
            (
              <p className="text-center text-red-600 text-base my-8">Incorrect email or password.</p>
            )
            :
            (
              <p className="text-center text-gray-500 text-sm mt-2">Or</p>
            ) 
          }

          <form className="mt-3" onSubmit={e => {
            e.preventDefault();
            // start loading state
            setState('loading');

            const formData = new FormData(e.target as HTMLFormElement);
            // check if the inputs are valid
            const email = formData.get('email');
            const password = formData.get('password');

            if (email === null || password === null) {
              setState('500');
              return;
            }

            // test email with regex
            if (/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/.test(email as string) === false) {
              setState('401');
              return;
            }

            // test password with regex
            // if (/^$/.test(password as string) === false) {
            //   setState('401');
            //   return;
            // }

            fetch('/api/auth/signin', {
              method: 'POST',
              body: JSON.stringify(
                {
                  email,
                  password
                }
              ),
              headers: { 'Content-Type': 'application/json' }
            })
            .then(res => {
              if (res.status === 200) {
                // redirect to home
                router.push('/dashboard');
              } else if (res.status === 401) {
                setState('401');
              } else if (res.status === 309) {
                setState('309');
              } else {
                setState('500');
              }
            });
          }}>
            <div className="-space-y-px rounded-md shadow-sm">
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
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <PasswordInputField />
            </div>

            <div className="flex items-center justify-between mt-6">
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
                <Link href="/forgot">
                  <button type="button" className="font-medium text-primary hover:text-primary/80">
                    Forgot your password?
                  </button>
                </Link>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockSimple weight="fill" size={30} className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </main>

        <Gradient />
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = new Cookies(ctx.req, ctx.res);

  if (cookies.get('auth-token')) {;
    // token exists, redirect to dashboard
    return {
      redirect: {
        destination: '/dashboard',
        statusCode: 302
      }
    };
  }

  // no token exists, user needs to log in
  return { props: {} };
}

export default SignIn