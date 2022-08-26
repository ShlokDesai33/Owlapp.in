import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Cookies from 'cookies'
import Image from 'next/image'
import logoSvg from '../../public/images/logo.svg'

const SignUp: NextPage = () => {
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
        <div className="flex flex-col rounded-xl shadow-post-shadow p-10">
          <div className="flex items-center border-b-2 pb-4">
            <Image
              src={logoSvg}
              width={45}
              height={45}
              alt='logo'
            />
            <h3 className="ml-3">Owl</h3>
          </div>

          <div className="flex justify-around mt-14">
            
          </div>

          <h6 className="mt-14 text-gray-text max-w-lg text-center">
            By signing in, you agree to Owl&apos;s{" "}
            <button className="underline underline-offset-2">
              Terms &amp; Conditions
            </button>{" "}
            and the{" "}
            <button className="underline underline-offset-2">
              Privacy Policy
            </button>
            .
          </h6>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = new Cookies(ctx.req, ctx.res);
  const token = cookies.get('auth-token');
  
  if (token) {
    return {
      redirect: {
        destination: '/dashboard',
        statusCode: 302
      }
    };
  }

  return { props: {} }
}

export default SignUp