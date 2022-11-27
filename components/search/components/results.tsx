import { Keyboard, MagnifyingGlassMinus } from 'phosphor-react'

export function NoResultsBoundary({ children, searchResults }: { children: React.ReactNode, searchResults: any[] }) {
  if (searchResults.length > 0) return <>{children}</>;

  return (
    <div className="flex flex-col gap-y-1 items-center h-full pt-12 text-gray-400">
      <MagnifyingGlassMinus size={40} weight="light" />
      <p className="font-medium">Oops! There are no results for your search</p>
    </div>
  );
}

export function EmptyQueryBoundary({ children, query }: { children: React.ReactNode, query: string | undefined }) {
  if (query && query.length > 0) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col gap-y-1 items-center h-full pt-12 text-gray-400">
      <Keyboard size={40} weight="light" />
      <p className="font-medium">Type in the search-box above to see results</p>
    </div>
  );
}