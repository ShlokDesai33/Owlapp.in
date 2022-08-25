import { Keyboard, MagnifyingGlassMinus } from 'phosphor-react'
import { useInstantSearch } from 'react-instantsearch-hooks-web'
import Spinner from '../../lib/spinner';

export function NoResultsBoundary({ children }: { children: any }) {
  const { results } = useInstantSearch();

  // throws runtime exception if not handled
  if (!results || results.__isArtificial) return <Spinner />;

  // The `__isArtificial` flag makes sure to not display the No Results message
  // when no hits have been returned yet.
  if (!results.__isArtificial && results.nbHits === 0) {
    return (
      <div className="flex items-center gap-x-3">
        <MagnifyingGlassMinus size={30} color="#BDBDBD" />
        <h5>No matches for your search.</h5>
      </div>
    );
  }

  return children;
}

export function EmptyQueryBoundary({ children }: { children: any }) {
  const { indexUiState } = useInstantSearch();

  if (!indexUiState.query) {
    return (
      <>
        <div className="flex flex-col gap-y-3 items-center h-full pt-12">
          <Keyboard size={70} color="#BE6CFF" />
          <h5>Type something in the search-box above and hit &apos;Enter&apos;</h5>
        </div>
      </>
    );
  }

  return children;
}