import useSession from '../../hooks/useSession'
import Head from 'next/head'
import Spinner from '../states/spinner'
import { InstantSearch } from 'react-instantsearch-hooks-web'
import searchClient from '../search/client'
import Image from 'next/image'
import Link from 'next/link'
import CustomSearchBox from '../search/searchbox'
import { useState } from 'react'
import logoSvg from '../../public/logo.svg'
import NavBar from './navigation/navbar'
import { Bell } from 'phosphor-react'
import SearchConsole from '../search/console'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { status, user } = useSession();
  // hidden / loading
  const [searchState, setSearchState] = useState<string>('hidden');

  if (status === 'loading') {
    // loading state
    return (
      <div className="flex w-screen h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }
  else if (status === 'authenticated' && user) {
    const page = searchState === 'hidden' ? children : <SearchConsole searchState={searchState}/>;
    return (
      <>
        <Head>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          {/* @ts-ignore */}
          <InstantSearch searchClient={searchClient} indexName="users" stalledSearchDelay={0}>
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
                  <Link href="/create/forum" passHref>
                    <button className="border-2 border-primary py-3 px-8 rounded-full text-lg w-fit">
                      Create Forum
                    </button>
                  </Link>

                  {/* search bar div */}
                  <div className="flex items-center bg-white w-1/3 rounded-full px-6 py-4 shadow-post-shadow">
                    <CustomSearchBox searchState={searchState} setSearchState={setSearchState} />
                  </div>

                  {/* user profile div */}
                  <Link href="/profile" passHref>
                    <button>
                      <div className="flex items-center gap-x-3">
                        <Image
                          src={user.image}
                          width={60}
                          height={60}
                          alt="Profile Picture"
                          className="rounded-full"
                        />
                        <div>
                          <h5 className="text-left">{user.fullname}</h5>
                          <p className="text-primary text-left">@{user.id}</p>
                        </div>
                      </div>
                    </button>
                  </Link>
                </div>
              </div>
              {/* nav bar and main div */}
              <div className="flex h-full">
                <NavBar />

                <div className="grow">
                  {page}
                </div>
              </div>
            </div>
          </InstantSearch>
        </main>
      </>
    );
  }
  else {
    return (
      <>
        <Head>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <h1>Not logged in</h1>
      </>
    );
  }
}