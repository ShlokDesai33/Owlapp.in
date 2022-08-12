import Head from 'next/head';
import { Hits, Index } from 'react-instantsearch-hooks-web';
import ForumHit from './hits/forum';
import UserHit from './hits/user';

export default function SearchConsole() {
  return (
    <>
      <Head>
        <title>Search | Owl</title>
      </Head>

      <Hits hitComponent={UserHit} />
      <hr/>
      <Index indexName="forums">
        <Hits hitComponent={ForumHit} />
      </Index>
    </>
  )
}