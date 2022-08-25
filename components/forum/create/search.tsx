import { MagnifyingGlass, X } from 'phosphor-react'
import { useRef } from 'react'
import { Hits, useSearchBox } from 'react-instantsearch-hooks-web'
import ForumHit from '../../search/hits/forum'
import ResourceHit from '../../search/hits/resource'

export default function SearchResources() {
  // connect custom search box to algolia
  const { refine, clear } = useSearchBox();
  // ref to search box
  const inputRef = useRef<HTMLInputElement>(null);
  
  return (
    <>
      <h5>Link forum to a resource (optional):</h5>
      <div className="flex flex-col border-2 border-gray-btn rounded-xl mt-6">
        <div className="flex items-center px-6 py-4">
          <form role="search" className="flex items-center divide-x-2 divide-gray-btn w-full mr-5" onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // manually trigger search
            refine(inputRef.current!.value);
          }}>
            <button><MagnifyingGlass size={30} color="#BE6CFF" /></button>
            <input
              ref={inputRef}
              className="outline-none bg-transparent font-normal text-xl placeholder:text-xl placeholder:text-gray-text w-full ml-4 pl-4"
              placeholder="Search for a resource..."
              autoFocus={true}
            />
          </form>

          <button onClick={() => {
            inputRef.current!.value = '';
            clear();
          }}>
            <X size={30} color="#717171" />
          </button>
        </div>
        
        <Hits hitComponent={ForumHit} />
      </div>
    </>
  )
}