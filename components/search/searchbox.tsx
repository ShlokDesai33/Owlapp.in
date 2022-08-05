import { MagnifyingGlass, X } from 'phosphor-react';
import { useEffect, useRef } from 'react';
import { useSearchBox } from 'react-instantsearch-hooks-web';

type Props = {
  searchState: string
  setSearchState: (isLoading: string) => void
}

export default function CustomSearchBox({ searchState, setSearchState }: Props) {
  // connect custom search box to algolia
  const { refine, isSearchStalled } = useSearchBox();
  // ref to search box
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isSearchStalled && searchState !== 'hidden') {
      setSearchState('visible');
    }
  }, [isSearchStalled, setSearchState]);

  return (
    <>
      <form role="search" className="flex items-center divide-x-2 divide-gray-btn w-full mr-5" onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        // manually trigger search
        if (inputRef.current) {
          if (searchState === 'hidden') {
            setSearchState('loading');
          }
          refine(inputRef.current.value);
        }
      }}>
        <button><MagnifyingGlass size={30} color="#BE6CFF" /></button>
        <input
          ref={inputRef}
          className="outline-none bg-transparent font-normal text-lg placeholder:text-lg placeholder:text-gray-text w-full ml-4 pl-4"
          placeholder="Search Owl..."
        />
      </form>

      <button onClick={() => {
        if (inputRef.current) {
          inputRef.current.value = '';
          // include this line?
          // clear();
        }
      }}>
        <X size={30} color="#717171" />
      </button>
    </>
  );

}