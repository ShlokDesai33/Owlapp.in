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

export default function useCustomData(id: string) {
  if (!id) {
    return { data: null, error: '400' };
  }

  const { data, error } = useSWR<any, Error>(`/api/resource/get/custom?id=${id}`, fetcher);
  return { data, error };
}