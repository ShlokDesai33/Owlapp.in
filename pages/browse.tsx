import { MagnifyingGlass, X } from "phosphor-react"
import { useEffect, useRef, useState } from "react"
import Layout from "../components/layout"
import Spinner from "../components/lib/spinner"
import { resources_ind } from "../components/search/client"
import ResourceHit from "../components/search/hits/resource"
import { NextPageWithLayout } from "../typescript/nextpage"

const Browse: NextPageWithLayout = () => {
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
      <main className="max-w-7xl px-4 sm:px-6 mx-auto pt-28 mt-4 overflow-y-scroll">
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
            className="relative block w-full appearance-none text-gray-900 placeholder-gray-500 text-base mx-3"
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

                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                  {searchResults.map((product) => (
                    <ResourceHit key={product.objectID} hit={product} />
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

// return the Home page wrapped in the Layout component
Browse.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout classes="border-b-2 border-gray-100 bg-white">{page}</Layout>;
}

export default Browse