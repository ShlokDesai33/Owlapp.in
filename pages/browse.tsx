import { NextPage } from "next"
import Image from "next/image"
import Link from "next/link"
import { MagnifyingGlass, Tag, X } from "phosphor-react"
import { useEffect, useRef, useState } from "react"
import MainNavbar from "../components/layout/components/navbar"
import Spinner from "../components/lib/spinner"
import { resources_ind } from "../components/search/client"

const Browse: NextPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (searchResults.length === 0) {
      setError(null);
      setLoading(true);

      fetch("/api/resources/get") 
        .then(res => res.json())
        .then(data => {
          setSearchResults(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        })
    }
  }, [searchResults]);

  return (
    <>
      <MainNavbar classes="border-b-2 border-gray-100" />

      <main className="max-w-7xl px-4 sm:px-6 mx-auto pt-6 overflow-y-scroll">
        <form role="search" className="flex items-center w-full shadow-post-shadow rounded-full px-6 py-4" onSubmit={e => {
          e.preventDefault();
          const query = inputRef.current?.value;

          if (query) {
            setLoading(true);

            resources_ind.search(query, {
              hitsPerPage: 20,
            }).then(({ hits }: { hits: any}) => {
              setSearchResults(hits);
              setLoading(false);
            }).catch((err) => {
              setError(err);
            });
          }
        }}>
          <button type="submit">
            <MagnifyingGlass className="h-6 w-6 text-primary" />
          </button>

          <input
            ref={inputRef}
            className="relative block w-full appearance-none text-gray-900 placeholder-gray-500 focus:z-10 text-base mx-3"
            placeholder="Search for a Resource"
            autoFocus={true}
          />

          <button type="button" onClick={e => {
            e.preventDefault();
            inputRef.current!.value = '';
          }}>
            <X className="h-6 w-6" color="#717171" />
          </button>
        </form>

        {
          loading && (
            <div className="flex place-content-center mt-20">
              <Spinner />
            </div>
          )
        }

        {
          error && (
            <div className="flex place-content-center items-center mt-20 divide-x-2">
              <div className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary pr-2">
                <h3 className="font-bold text-2xl">500</h3>
              </div>
              <h3 className="font-normal text-xl pl-2">Internal Server Error</h3>
            </div>
          )
        }

        {
          !loading && !error && (
            <div className="bg-white my-10">
              <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="sr-only">Products</h2>

                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
                  {searchResults.map((product) => (
                    <Link href={`/${product.objectID}`} key={product.objectID}>
                      <div className="group bg-gray-100 p-3 rounded-md">
                        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                          <Image
                            layout="fill"
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover object-center group-hover:opacity-75"
                          />
                        </div>

                        <div className="flex items-center mt-4 gap-x-2">
                          <Image
                            src={product.org.logo}
                            alt={product.org.name}
                            width={30}
                            height={30}
                            className="rounded-full"
                          />
                          <p className="text-sm text-gray-700 truncate">{product.org.name}</p>
                        </div>

                        <h3 className="mt-1 text-lg font-medium text-gray-900">{product.name}</h3>

                        <div className="flex items-center mt-2 gap-x-2">
                          <p className="text-lg font-medium text-gray-900">
                            ₹{product.prices.industry}
                            <span className="text-gray-700 text-sm">{' /' + product.prices.metric}</span>
                          </p>

                          { product.prices.faculty !== product.prices.industry && <Tag size={24} className="text-green-500" /> }
                          {/* <Sparkle size={24} className="text-secondary" /> */}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )
        }
      </main>
    </>
  )
};

export default Browse