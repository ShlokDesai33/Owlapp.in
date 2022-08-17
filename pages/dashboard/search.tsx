import Head from 'next/head'
import Layout from '../../components/layout'
import { Hits, Index } from 'react-instantsearch-hooks-web'
import type { NextPageWithLayout } from '../../typescript/nextpage'
import ForumHit from '../../components/search/hits/forum'
import UserHit from '../../components/search/hits/user'
import { useState } from 'react'
import Filters from '../../components/search/components/filters'
import { Warning } from 'phosphor-react'
import ResourceHit from '../../components/search/hits/resource'
import { EmptyQueryBoundary, NoResultsBoundary } from '../../components/search/components/results'

const Search: NextPageWithLayout = () => {
  const [filters, setFilters] = useState(
    { 
      users: true,
      forums: true,
      resources: true
    }
  );

  return (
    <>
      <Head>
        <title>Search | Owl</title>
      </Head>

      <main className="flex pt-12 px-12 w-full h-full">
        <div>
          <h5>Filter by what you&apos;re looking for:</h5>
          <Filters filters={filters} setFilters={setFilters}/>
        </div>

        <div className="flex flex-col items-center grow">
          <EmptyQueryBoundary>
            { filters.resources &&
              (
                <>
                  <h6 className="text-gray-text w-post-element border-b-2 mb-7">Resources</h6>
                  <NoResultsBoundary>
                    <Hits hitComponent={ResourceHit} />
                  </NoResultsBoundary>
                </>
              )
            }

            { filters.users &&
              (
                <>
                  <h6 className="text-gray-text w-post-element border-b-2 mb-7">Users</h6>
                    <Index indexName="users">
                      <NoResultsBoundary>
                        <Hits hitComponent={UserHit} />
                      </NoResultsBoundary>
                    </Index>
                </>
              )
            }

            { filters.forums &&
              (
                <>
                  <h6 className="text-gray-text w-post-element border-b-2 mb-7">Forums</h6>
                    <Index indexName="forums">
                      <NoResultsBoundary>
                        <Hits hitComponent={ForumHit} />
                      </NoResultsBoundary>
                    </Index>
                </>
              )
            }

            { !filters.users && !filters.forums && !filters.resources &&
              (
                <div className="flex flex-col gap-y-3 items-center h-full pt-12">
                  <Warning size={70} color="#BE6CFF" />
                  <h5>Select one or more filters to see results</h5>
                </div>
              )
            }
          </EmptyQueryBoundary>
        </div>
      </main>
    </>
  )
}

// return the Search page wrapped in the Layout component
Search.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
}

export default Search
