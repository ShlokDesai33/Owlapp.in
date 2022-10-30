import Head from 'next/head'
import Layout from '../../components/layout/search'
import type { NextPageWithLayout } from '../../typescript/nextpage'
import ForumHit from '../../components/search/hits/forum'
import UserHit from '../../components/search/hits/user'
import { useState } from 'react'
import Filters from '../../components/search/components/filters'
import { Warning } from 'phosphor-react'
import ResourceHit from '../../components/search/hits/resource'

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
            { filters.resources &&
              (
                <>
                  <h6 className="text-gray-text w-post-element border-b-2 mb-7">Resources</h6>
                </>
              )
            }

            { filters.users &&
              (
                <>
                  <h6 className="text-gray-text w-post-element border-b-2 mb-7">Users</h6>
                </>
              )
            }

            { filters.forums &&
              (
                <>
                  <h6 className="text-gray-text w-post-element border-b-2 mb-7">Forums</h6>
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