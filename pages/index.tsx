import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import logoSvg from '../public/images/logo.svg'
import { useState } from 'react'
import Spinner from '../components/states/spinner'
import Link from 'next/link'
import { ArrowRight } from 'phosphor-react'
import { useRouter } from 'next/router'

/**
 * Landing page for the app
 * @returns {NextPage} next page without layout
 */
const Home: NextPage = () => {
  // set to loading when user clicks log in/sign up
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
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
          <link rel="icon" href="/favicon.ico"/>
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
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main>
        <div className="flex flex-col h-screen w-screen bg-landing bg-cover">
          <div className="flex items-center justify-between mt-14 mx-24">
            <div className="flex items-center">
              <Image
                src={logoSvg}
                width={60}
                height={60}
                alt="Owl logo"
              />
              <h2 className="ml-3">Owl</h2>
            </div>

            <div className="absolute flex items-center justify-center gap-x-10 left-0 right-0">
              <Link href="/about" passHref>
                <button className="text-xxl">About Us</button>
              </Link>

              <Link href="/vision" passHref>
                <button className="text-xxl">Our Vision</button>
              </Link>

              <Link href="/contact" passHref>
                <button className="text-xxl">Register</button>
              </Link>
            </div>

            <button className="group border-2 border-black px-7 py-2 rounded-2xl hover:border-primary z-10" onClick={(e) => {
              e.preventDefault();
              setLoading(true);
              router.push('/auth/signin');
            }}>
              <h4 className="group-hover:text-primary">Log in</h4>
            </button>
          </div>

          <div className="flex items-center h-full justify-center">
            <div className="flex divide-x-2 justify-center mb-10">
              <div className="flex flex-col my-10 mr-20">
                <h1>Find and rent scientific<br/>resources on <span className="text-white header-stroke font-extrabold">Owl</span></h1>
                <h4 className="text-gray-text mt-6">
                  Owl makes it exceptionaly easy to book scientific and<br/> research oriented resources offered by universities, colleges<br/> and private organizations. 
                </h4>

                <h5 className="font-medium mt-14 mb-7">Got questions? Send us a message!</h5>
                <div className="flex items-center justify-between border-2 px-6 py-4 rounded-2xl border-gray-btn mr-20">
                  <input
                    type="text"
                    placeholder="Enter your email address..."
                    className="outline-none bg-transparent text-xxl placeholder:text-xxl placeholder:text-gray-text w-full mr-6"
                    onChange={(e) => {setEmail(e.target.value)}}
                  />
                  <Link href={`/contact?email=${encodeURIComponent(email)}`} passHref>
                    <button>
                      <ArrowRight weight="regular" className="text-primary" size={40} />
                    </button>
                  </Link>
                </div>
              </div>

              <div className="flex flex-col justify-center divide-y-2 pl-10">
                <div className="flex flex-col gap-y-6 pb-10">
                  <h3>Looking to rent or learn more?</h3>
                    <button className="flex items-center gap-x-2 w-fit" onClick={(e) => {
                      e.preventDefault();
                      setLoading(true);
                      router.push('/auth/signup');
                    }}>
                      <h4 className="text-primary">Sign up for Owl</h4>
                      <ArrowRight weight="regular" className="text-primary" size={35} />
                    </button>
                </div>
                
                <div className="flex flex-col gap-y-6 pt-10">
                  <h3>Or, register as an admin today!</h3>
                  <Link href="/contact" passHref>
                    <button className="flex items-center gap-x-2 w-fit">
                      <h4 className="text-primary">Register today</h4>
                      <ArrowRight weight="regular" className="text-primary" size={35} />
                    </button>
                  </Link>
                  <h5 className="text-gray-text">By registering yourself as an admin, you and your<br/>organization agree to our
                    <Link href="/terms&conditions" passHref><button className="underline underline-offset-2 ml-1">Terms and Conditions</button></Link>.
                  </h5>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center px-24 pb-16 justify-between">
            <h4>{'// Polymath Tech'}</h4>
            <h4>©Owl 2022 all rights reserved</h4>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home