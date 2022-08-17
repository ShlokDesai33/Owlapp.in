import useSession from '../../hooks/useSession'
import Head from 'next/head'
import Spinner from '../states/spinner'
import { InstantSearch } from 'react-instantsearch-hooks-web'
import searchClient from '../search/client'
import Image from 'next/image'
import Link from 'next/link'
import logoSvg from '../../public/images/logo.svg'
import NavBar from './navigation/navbar'
import SearchBar from '../search/searchbar'
import { useRouter } from 'next/router'
import blueCheck from '../../public/images/blue-check.svg'
import adminCheck from '../../public/images/admin-check.svg'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { status, user } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    // loading state
    return (
      <>
        <Head>
          <title>Owl</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="flex w-screen h-screen items-center justify-center">
          <Spinner />
        </div>
      </>
    );
  }
  else if (status === 'authenticated' && user) {
    return (
      <>
        <Head>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          {/* @ts-ignore */}
          <InstantSearch searchClient={searchClient} indexName="resources" stalledSearchDelay={0}>
            <div className="flex flex-col w-screen h-screen">
              {/* top bar div */}
              <div className="flex w-full border-b-2 bg-gray-bg">
                {/* logo div / top bar lhs */}
                <div className="flex items-center px-11 py-10 w-80 border-r-2 shrink-0">
                  <Image
                    src={logoSvg}
                    width={50}
                    height={50}
                    alt="Owl Logo"
                  />
                  <h3 className="ml-3">Owl</h3>
                </div>

                {/* top bar rhs */}
                <div className="flex grow items-center justify-between px-12">
                  <SearchBar />

                  {/* user profile div */}
                  <Link href="/dashboard/profile" passHref>
                    <button>
                      <div className="flex items-center gap-x-3">
                        <Image
                          src={user.image}
                          width={60}
                          height={60}
                          alt="Profile Picture"
                          className="rounded-full"
                        />

                        <div className="w-36">
                          <h5 className="text-left truncate">{user.fullname}</h5>
                          <p className="text-gray-text text-left truncate">@{user.id}</p>
                        </div>

                        { user.status === 'verified' &&
                          (
                            <Image
                              src={blueCheck}
                              width={32}
                              height={32}
                              alt="Verified Check"
                            />
                          )
                        }
                        { user.status === 'admin' &&
                          (
                            <Image
                              src={adminCheck}
                              width={32}
                              height={32}
                              alt="Verified Check"
                            />
                          )
                        }
                      </div>
                    </button>
                  </Link>
                </div>
              </div>
              {/* nav bar and main div */}
              <div className="flex h-full">
                <NavBar />

                <div className="grow">
                  {children}
                </div>
              </div>
            </div>
          </InstantSearch>
        </main>
      </>
    );
  }
  else {
    router.push('/auth/signin');
    return (
      <>
        <Head>
          <title>Owl</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <div className="flex w-screen h-screen items-center justify-center">
          <Spinner />
        </div>
      </>
    );
  }
}