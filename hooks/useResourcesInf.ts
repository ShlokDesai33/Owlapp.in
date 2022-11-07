import useSWR from 'swr'

const fetcher = (url: string) => (
  fetch(url).then(res => {
    // 500 / 404
    if (!res.ok) {
      throw new Error('Not found');
    }
    // 200: OK
    return res.json();
  })
);

export default function useResourcesInf() {
  const { data, error } = useSWR(`/api/resources/get`, fetcher);
  return { data, error };
}