import { Fetcher } from 'swr'
import useSWRInfinite from 'swr/infinite'

/**
 * Hook built on useSWRInfinite
 * Fetches posts from 'api/data/feed'
 * @returns {any[][], Error, number, () => void} a response object
 */
function useBookingsInf(id: string | null) {
  if (!id) {
    return { data: null, error: new Error('400'), size: -1, setSize: () => {} };
  }

  const fetcher: Fetcher<any[], any> = (url: string) => fetch(url).then(res => res.json());

  const { data, error, size, setSize } = useSWRInfinite<any[]>((pageIndex: number, previousPageData: any[]) => {
    // reached the end
    if (previousPageData && !previousPageData.length) return null;
    
    // first page, we don't have `previousPageData`
    if (pageIndex === 0) return `/api/bookings/user?id=${id}`;
    
    // otherwise, we have `previousPageData`
    const timestamp = previousPageData[previousPageData.length - 1].createdAt;
    return `/api/bookings/user?id=${id}&secs=${timestamp.seconds}&nanos=${timestamp.nanoseconds}`;
  }, fetcher);

  return { data, error, size, setSize };
}

export default useBookingsInf;