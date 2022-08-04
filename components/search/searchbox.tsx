import { useEffect, useRef } from 'react';
import { useSearchBox } from 'react-instantsearch-hooks-web';

type Props = {
  setLoading: (isLoading: boolean) => void;
}

export default function CustomSearchBox({ setLoading }: Props) {
  // connect custom search box to algolia
  const { refine, isSearchStalled, clear } = useSearchBox();
  // ref to search box
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLoading(isSearchStalled);
  }, [isSearchStalled, setLoading]);

  return (
    <>
      <form role="search" onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        // manually trigger search
        if (inputRef.current) {
          refine(inputRef.current.value);
        }
      }}>
        <button>Search</button>
        <input
          ref={inputRef}
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
        X
      </button>
    </>
  );

}