import Head from 'next/head'
import Layout from '../../components/layout'
import { Hits, Index } from 'react-instantsearch-hooks-web'
import type { NextPageWithLayout } from '../../typescript/nextpage'
import ForumHit from '../../components/search/hits/forum'
import UserHit from '../../components/search/hits/user'

const Search: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Search | Owl</title>
      </Head>

      <main className="pt-12 px-12">
        <Hits hitComponent={UserHit} />
        <hr/>
        <Index indexName="forums">
          <Hits hitComponent={ForumHit} />
        </Index>
      </main>
    </>
  )
}

// return the Search page wrapped in the Layout component
Search.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
}

export default Search
