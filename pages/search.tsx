import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react';
import { InstantSearch } from 'react-instantsearch-hooks-web';
import searchClient from '../components/search/client';
import SearchConsole from '../components/search/console';
import CustomSearchBox from '../components/search/searchbox';

const Search: NextPage = () => {
  const [isLoading, setLoading] = useState(false);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* @ts-ignore */}
      <InstantSearch searchClient={searchClient} indexName="users" stalledSearchDelay={0}>
        <CustomSearchBox setLoading={setLoading} />
        <SearchConsole isLoading={isLoading} />
      </InstantSearch>
    </>
  )
}

export default Search
