import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import Cookies from 'cookies'
import Image from 'next/image'
import logoSvg from '../../public/images/logo.svg'
import Link from 'next/link'
import EmailInputField from '../../components/auth/input/email'
import PasswordInputField from '../../components/auth/input/password'
import { useState } from 'react'
import Spinner from '../../components/lib/spinner'

type Props = {
  pageState: 'default' | '401' | '309' | '500'
}

const SignIn = ({ pageState }: Props) => {
  // state of the page
  const [state, setState] = useState<'default' | 'loading' | '401' | '309' | '500'>(pageState);
  // input fields' state
  const [inputsState, setInputsState] = useState({
    // not used in this page
    isNameValid: false,
    isEmailValid: false,
    isPasswordValid: false,
  });

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

        <div className="flex w-screen h-screen items-center justify-center bg-landing bg-cover">
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

      <main className="flex flex-col w-full h-screen items-center justify-center bg-landing bg-cover">
        <div className="flex flex-col rounded-xl w-1/3 shadow-post-shadow p-10">
          <div className="flex items-center">
            <Image
              src={logoSvg}
              width={45}
              height={45}
              alt='logo'
            />
            <h3 className="ml-3">Owl</h3>
          </div>

          <div className="flex flex-col mt-10 mb-8 gap-y-3">
            <h3 className="font-normal">Welcome back!</h3>
            <h6 className="text-gray-text">Please enter your details below:</h6>
          </div>

          { state === '309' &&
            (
              <h6 className="w-full text-center mb-8">
                This email is not registered.{' '}
                <Link href="/auth/signup">
                  <button className="text-secondary underline underline-offset-2">
                    Sign up
                  </button>
                </Link>
              </h6>
            )
          }

          { state === '401' &&
            (
              <h6 className="w-full text-center text-red-500 mb-8">Incorrect email or password.</h6>
            )
          }

          { state === '500' &&
            (
              <h6 className="w-full text-center text-red-500 mb-8">An error occured. Please try again later.</h6>
            )
          }

          <form className="flex flex-col justify-around" onSubmit={e => {
            if (inputsState.isEmailValid && inputsState.isPasswordValid) {
              setTimeout(() => {
                setState('loading');
              }, 500);
            }
            else {
              e.preventDefault();
              e.stopPropagation();
            }
          }}>
            <EmailInputField state={inputsState} setState={setInputsState} />
            <PasswordInputField state={inputsState} setState={setInputsState} />

            <button type="submit" className="text-primary border-2 border-primary py-3 rounded-xl">
              <h4>Sign In</h4>
            </button>
          </form>

          <div className="flex divide-x-2 gap-x-4 w-full justify-center mt-8">
            <Link href="/auth/signup">
              <button>
                <h6 className="hover:underline underline-offset-2">Don&apos;t have an account?</h6>
              </button>
            </Link>

            <Link href="/auth/forgot">
              <button className="pl-4">
                <h6 className="hover:underline underline-offset-2">Forgot Password</h6>
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // available on form submission
  const { email, password } = ctx.query;
  const cookies = new Cookies(ctx.req, ctx.res);

  if (!email || !password) {
    const token = cookies.get('auth-token');
    
    // token exists, redirect to dashboard
    if (token) {
      return {
        redirect: {
          destination: '/dashboard',
          statusCode: 302
        }
      };
    }
  }
  else {
    const url = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://owlapp.in';
    const res = await fetch(`${url}/api/auth/signin`, {
      method: 'POST',
      body: JSON.stringify(
        {
          email,
          password
        }
      ),
      headers: { 'Content-Type': 'application/json' }
    });

    // 200 | 309 | 401 | 500
    if (res.status === 200) {
      cookies.set('auth-token', res.headers.get('JWT-Token'), {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        // 10 days
        maxAge: 864000000,
      });

      // authentication successful
      return {
        redirect: {
          destination: '/dashboard',
          statusCode: 302
        }
      };
    }
    else if (res.status === 401) {
      // auth error (invalid credentials)
      return {
        props: {
          pageState: '401',
        }
      };
    }
    else if (res.status === 309) {
      // account does not exist
      return {
        props: {
          pageState: '309',
        }
      };
    }
    else {
      // server error
      return {
        props: {
          pageState: '500',
        }
      };
    }
  }

  // no token exists, user needs to log in
  return { 
    props: {
      pageState: 'default'
    } 
  };
}

export default SignIn