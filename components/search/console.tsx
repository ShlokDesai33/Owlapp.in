import Head from "next/head";
import { Hits, Index } from "react-instantsearch-hooks-web";
import Spinner from "../states/spinner";
import ForumHit from "./hits/forum";
import UserHit from "./hits/user";

export default function SearchConsole({ searchState }: { searchState: string }) {
  // loading state set by search box
  if (searchState === 'loading') {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <Spinner />
      </div>
    );
  }
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