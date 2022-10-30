import { Keyboard, MagnifyingGlassMinus } from 'phosphor-react'

export function NoResultsBoundary() {
  return (
    <div className="flex items-center gap-x-3">
      <MagnifyingGlassMinus size={30} color="#BDBDBD" />
      <h5>No matches for your search.</h5>
    </div>
  );
}

export function EmptyQueryBoundary() {
  return (
    <>
      <div className="flex flex-col gap-y-3 items-center h-full pt-12">
        <Keyboard size={70} color="#BE6CFF" />
        <h5>Type something in the search-box above and hit &apos;Enter&apos;</h5>
      </div>
    </>
  );
}