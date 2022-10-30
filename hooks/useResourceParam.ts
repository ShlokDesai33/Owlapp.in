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

export default function useResourceParam(param: string, id: string) {
  if (!id || !param) {
    return { data: null, error: '400' };
  }

  const { data, error } = useSWR<any, Error>(`/api/resource/get/${param}?id=${id}`, fetcher);
  return { data, error };
}