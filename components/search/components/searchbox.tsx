import { MagnifyingGlass, X } from 'phosphor-react'
import { useRef } from 'react'

export default function CustomSearchBox({ placeholder }: { placeholder: string }) {
  // connect custom search box to algolia
  // ref to search box
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <form role="search" className="flex items-center divide-x-2 divide-gray-btn w-full mr-5" onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        // manually trigger search
      }}>
        <button><MagnifyingGlass size={30} color="#BE6CFF" /></button>
        <input
          ref={inputRef}
          className="outline-none bg-transparent font-normal text-xl placeholder:text-xl placeholder:text-gray-text w-full ml-4 pl-4"
          placeholder={placeholder}
          autoFocus={true}
        />
      </form>

      <button onClick={() => {
        inputRef.current!.value = '';
      }}>
        <X size={30} color="#717171" />
      </button>
    </>
  );

}