import { Fetcher } from 'swr'
import useSWRInfinite from 'swr/infinite'

/**
 * Utilised by useFeedInf() to generate the key for the next batch of posts
 * @param pageIndex index of the posts to fetch
 * @param previousPageData previously fetched posts
 * @returns {string} the url to fetch
 */
const getKey = (pageIndex: number, previousPageData: any[]): string | null => {
  // reached the end
  if (previousPageData && !previousPageData.length) return null;
  
  // first page, we don't have `previousPageData`
  if (pageIndex === 0) return `/api/resource/get/inf`;
  
  // otherwise, we have `previousPageData`
  const timestamp = previousPageData[previousPageData.length - 1].createdAt;
  return `/api/resource/get/inf?secs=${timestamp.seconds}&nanos=${timestamp.nanoseconds}`;
}

/**
 * Hook built on useSWRInfinite
 * Fetches posts from 'api/data/feed'
 * @returns {any[][], Error, number, () => void} a response object
 */
function useResourcesInf() {
  const fetcher: Fetcher<any[], any> = (url: string) => fetch(url).then(res => res.json());
  const { data, error, size, setSize } = useSWRInfinite<any[]>(getKey, fetcher);
  return { data, error, size, setSize };
}

export default useResourcesInf