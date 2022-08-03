import { Hits, Index } from "react-instantsearch-hooks-web";
import ForumHit from "./hits/forum";
import UserHit from "./hits/user";

export default function SearchConsole({ isLoading }: { isLoading: boolean }) {

  if (isLoading) {
    return <>Loading...</>
  }
  return (
    <>
      <Hits hitComponent={UserHit} />
      <hr/>
      <Index indexName="forums">
        <Hits hitComponent={ForumHit} />
      </Index>
    </>
  )
}