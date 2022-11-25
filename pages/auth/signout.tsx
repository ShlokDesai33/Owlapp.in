import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Cookies from 'cookies'
import Spinner from '../../components/lib/spinner'

const SignOut: NextPage = () => {
  return (
    <>
      <Head>
        <title>Signing Out | Owl</title>
        <meta name="description" content="Loading Screen"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta name="keywords" content="owl, sign out, log In, sign in, loading"></meta>
        <meta name="author" content="Owl"></meta>
        <link rel="icon" href="/images/favicon.ico"/>
      </Head>

      <div className="flex w-full h-full items-center justify-center">
        <Spinner />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = new Cookies(ctx.req, ctx.res);

  cookies.set('auth-token', '', {
    maxAge: 0,
  });

  return {
    redirect: {
      destination: '/auth/signin',
      statusCode: 302
    },
  }
}

export default SignOut