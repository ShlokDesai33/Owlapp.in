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
import { EmptyQueryBoundary, NoResultsBoundary } from '../../components/search/components/results'

const Search: NextPageWithLayout = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false); // track page state

  // the search results to be rendered after filtering and sorting
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [objectFilter, setObjectFilter] = useState<number>(0); // 0 = resources, 1 = users

  // sort by is only applicable to resources
  const [sortBy, setSortBy] = useState({
    price: false
    // TODO: location: false
  });

  useEffect(() => {
    if (sortBy.price && objectFilter === 0) {
      setSearchResults([...searchResults].sort((a, b) => {
        return a.prices.industry - b.prices.industry;
      }));
    }
  }, [sortBy]);

  return (
    <>
      <Head>
        <title>Search | Owl</title>
      </Head>

      <main className="max-w-7xl px-4 sm:px-6 mx-auto pt-6 overflow-y-scroll" id="no_sb">
        <form role="search" className="flex items-center w-full shadow-post-shadow rounded-full px-6 py-4" onSubmit={e => {
          e.preventDefault();
          const query = inputRef.current?.value;

          if (query && query.length > 0) {
            if (sortBy.price) setSortBy({ price: false });
            setLoading(true);

            if (objectFilter === 0) {
              resources_ind.search(query, { hitsPerPage: 20,})
                .then(({ hits }: { hits: any}) => {
                  setSearchResults(hits);
                  setLoading(false);
                }).catch(err => {
                  // TODO: Handle error
                  setSearchResults([]);
                  setLoading(false);
                });
            }
            else if (objectFilter === 1) {
              users_ind.search(query, { hitsPerPage: 20,})
                .then(({ hits }: { hits: any}) => {
                  setSearchResults(hits);
                  setLoading(false);
                }).catch(err => {
                  // TODO: Handle error
                  setSearchResults([]);
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
            <Filters objectFilter={objectFilter} setObjectFilter={setObjectFilter} inputRef={inputRef} />
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

        {
          !loading && (
            <div className="bg-white my-10">
              <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="sr-only">Products & Users</h2>

                <EmptyQueryBoundary query={inputRef.current?.value}>
                  <NoResultsBoundary searchResults={searchResults}>
                    {
                      objectFilter === 0 ? (
                        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                          {searchResults.map((product: any) => (
                            <ResourceHit key={product.objectID} hit={product} />
                          ))}
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
                          {searchResults.map((user: any) => (
                            <UserHit key={user.objectID} hit={user} />
                          ))}
                        </div>
                      )
                    }
                  </NoResultsBoundary>
                </EmptyQueryBoundary>
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