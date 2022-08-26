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
import NameInputField from '../../components/auth/input/name'

type Props = {
  pageState: 'default' | '309' | '500'
}

const SignUp = ({ pageState }: Props) => {
  // state of the page
  const [state, setState] = useState<'default' | 'loading' | '309' | '500'>(pageState);
  // input fields' state
  const [inputsState, setInputsState] = useState({
    isNameValid: false,
    isEmailValid: false,
    isPasswordValid: false,
  });

  if (state === 'loading') {
    return (
      <>
        <Head>
          <title>Sign Up | Owl</title>
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
        <title>Sign Up | Owl</title>
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
            <h3 className="font-normal">Create an account</h3>
            <h6 className="text-gray-text">Please fill in all the fields below:</h6>
          </div>

          { state === '309' &&
            (
              <h6 className="w-full text-center mb-8">
                This email is already registered.{' '}
                <Link href="/auth/signin">
                  <button className="text-secondary underline underline-offset-2">
                    Sign in
                  </button>
                </Link>
              </h6>
            )
          }

          { state === '500' &&
            (
              <h6 className="w-full text-center text-red-500 mb-8">An error occured. Please try again later.</h6>
            )
          }

          <form className="flex flex-col justify-around" onSubmit={e => {
            if (inputsState.isNameValid && inputsState.isEmailValid && inputsState.isPasswordValid) {
              setTimeout(() => {
                setState('loading');
              }, 500);
            }
            else {
              e.preventDefault();
              e.stopPropagation();
            }
          }}>
            <NameInputField state={inputsState} setState={setInputsState} />
            <EmailInputField state={inputsState} setState={setInputsState} />
            <p className="mb-3 text-gray-text">Password must be atleast 8 characters long</p>
            <PasswordInputField state={inputsState} setState={setInputsState} />

            <button type="submit" className="text-primary border-2 border-primary py-3 rounded-xl">
              <h4>Sign Up</h4>
            </button>
          </form>

          <h6 className="mt-12 mb-8 h-fit text-gray-text text-center">
            By signing up, you agree to Owl&apos;s{" "}
            <button className="underline underline-offset-2">
              Terms &amp; Conditions
            </button>{" "}
            and our{" "}
            <button className="underline underline-offset-2">
              Privacy Policy
            </button>
            .
          </h6>

          { state === 'default' && 
            (
              <Link href="/auth/signin">
                <button>
                  <h6 className="hover:underline underline-offset-2">Already have an account?</h6>
                </button>
              </Link>
            )
          }
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // available on form submission
  const { name, email, password } = ctx.query;

  if (!name || !email || !password) {
    return { 
      props: {
        pageState: 'default'
      } 
    };
  }
  else {
    const url = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://owlapp.in';
    const res = await fetch(`${url}/api/auth/signup`, {
      method: 'POST',
      body: JSON.stringify(
        {
          fullname: name,
          email,
          password
        }
      ),
      headers: { 'Content-Type': 'application/json' }
    });

    // 200 | 309 | 500
    if (res.status === 200) {
      const cookies = new Cookies(ctx.req, ctx.res);
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
    else if (res.status === 309) {
      // account already exists
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
}

export default SignUp