import CustomSearchBox from './components/searchbox'
import { useRouter } from 'next/router'
import { MagnifyingGlass, X } from 'phosphor-react'
import Link from 'next/link'

export default function SearchBar() {
  const router = useRouter();

  if (router.pathname === '/dashboard/search') {
    return (
      <>
        <Link href="/dashboard" passHref>
          <button className="flex items-center gap-x-1 border-2 border-primary py-3 px-6 rounded-full text-lg w-fit">
            <X size={30} color="#BDBDBD"/>
            <h5>Cancel</h5>
          </button>
        </Link>
  
        {/* search bar div */}
        <div className="flex items-center bg-white w-2/5 rounded-full px-6 py-4 shadow-post-shadow">
          <CustomSearchBox />
        </div>
      </>
    )
  }

  return (
    <Link href="/dashboard/search" passHref>
      <button className="flex items-center gap-x-2 py-3 px-6 rounded-full border-2 border-primary">
        <MagnifyingGlass size={30} color="#BDBDBD" />
        <h5>Search Owl</h5>
      </button>
    </Link>
  )
}