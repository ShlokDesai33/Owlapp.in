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

export default function useResource(id: string) {
  if (!id) {
    return { data: null, error: 'Not found' };
  }

  const { data, error } = useSWR<any, Error>(`/api/resource/get?id=${id}`, fetcher);
  return { product: data, error };
}