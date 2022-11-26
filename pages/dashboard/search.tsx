import Head from 'next/head'
import Layout from '../../components/layout/auth'
import type { NextPageWithLayout } from '../../typescript/nextpage'
import { FunnelSimple, MagnifyingGlass, X } from "phosphor-react"
import { useEffect, useRef, useState } from "react"
import Spinner from "../../components/lib/spinner"
import { resources_ind, users_ind } from "../../components/search/client"
import Filters from '../../components/search/components/filters'
import UserHit from '../../components/search/hits/user'
import ResourceHit from '../../components/search/hits/resource'
import SortBy from '../../components/search/components/sortby'

const Search: NextPageWithLayout = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false); // track page state
  // the search results to be rendered after filtering and sorting
  const [searchResults, setSearchResults] = useState<any[]>([]);
  // two kinds of filters:
  // 1. filters that are applied to the search object (resource/user/etc)
  // 2. filters that are applied to the search parameters (price range, followers, etc)
  const [objectFilters, setObjectFilters] = useState({
    users: false,
    resources: true
  });
  // sort by is not a filter, it is a transformation of the search results
  // sort by is only applicable to resources
  // users are automatically sorted by algolia
  const [sortBy, setSortBy] = useState({
    price: false
    // TODO: location: false
  });

  useEffect(() => {
    // this should (theoretically) only run once
    if (searchResults.length === 0) {
      setLoading(true);

      fetch("/api/resources/get")
        .then(res => res.json())
        .then(data => {
          setSearchResults(data);
          setLoading(false);
        })
        .catch(err => {
          // TODO: Handle error
          setLoading(false);
        })
    }
  }, []);

  useEffect(() => {
    if (sortBy.price) {
      setSearchResults([...searchResults].sort((a, b) => {
        return a.prices.industry - b.prices.industry;
      }));
    }
  }, [sortBy, searchResults]);

  return (
    <>
      <Head>
        <title>Search | Owl</title>
      </Head>

      <main className="max-w-7xl px-4 sm:px-6 mx-auto pt-6 overflow-y-scroll">
        <form role="search" className="flex items-center w-full shadow-post-shadow rounded-full px-6 py-4" onSubmit={e => {
          e.preventDefault();
          const query = inputRef.current?.value;

          if (query && query.length > 0) {
            setLoading(true);

            if (objectFilters.resources) {
              resources_ind.search(query, { hitsPerPage: 20,})
                .then(({ hits }: { hits: any}) => {
                  setSearchResults(hits);
                  setLoading(false);
                }).catch(err => {
                  // TODO: Handle error
                  setLoading(false);
                });
            }
            else if (objectFilters.users) {
              users_ind.search(query, { hitsPerPage: 20,})
                .then(({ hits }: { hits: any}) => {
                  setSearchResults(hits);
                  setLoading(false);
                }).catch(err => {
                  // TODO: Handle error
                  setLoading(false);
                });
            }
            // add more object filters here
          }
        }}>
          <button type="submit">
            <MagnifyingGlass className="h-6 w-6 text-primary" />
          </button>

          <input
            ref={inputRef}
            className="relative block w-full appearance-none text-gray-900 placeholder-gray-500 focus:z-10 text-base mx-3"
            placeholder="Search Owl"
            autoFocus={true}
          />

          <button type="button" onClick={e => {
            e.preventDefault();
            inputRef.current!.value = '';
          }}>
            <X className="h-6 w-6" color="#717171" />
          </button>
        </form>

        <div className="mt-10 flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <FunnelSimple className="h-6 w-6 text-gray-500" weight="fill" />
            <Filters filters={objectFilters} setFilters={setObjectFilters} />
          </div>

          <SortBy sortBy={sortBy} setSortBy={setSortBy} />
        </div>

        {
          loading && (
            <div className="flex justify-center mt-20">
              <Spinner />
            </div>
          )
        }

        {/* {
          error && (
            <div className="flex place-content-center items-center mt-20 divide-x-2">
              <div className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary pr-2">
                <h3 className="font-bold text-2xl">500</h3>
              </div>
              <h3 className="font-normal text-xl pl-2">Internal Server Error</h3>
            </div>
          )
        } */}

        {
          !loading && (
            <div className="bg-white my-10">
              <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="sr-only">Products & Users</h2>

                {
                  objectFilters.users ? (
                    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 mb-10">
                      {searchResults.map((user: any) => (
                        <UserHit key={user.objectID} hit={user} />
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                      {searchResults.map((product: any) => (
                        <ResourceHit key={product.objectID} hit={product} />
                      ))}
                    </div>
                  )
                }
              </div>
            </div>
          )
        }
      </main>
    </>
  )
};

// return the Home page wrapped in the Layout component
Search.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
}

export default Search