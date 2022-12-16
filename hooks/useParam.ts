import useSWR from 'swr'

const fetcher = (url: string) => (
  fetch(url).then(res => {
    // 500 / 404
    if (!res.ok) {
      throw new Error();
    }
    // 200: OK
    return res.json();
  })
);

export default function useParam(param: string, id: string, count: number | null) {
  let url: string | null = `/api/resource/get/${param}?id=${id}&count=${count}`;

  if (!id || !param || !count) {
    url = null;
  }

  if (count! <= 0) {
    url = null;
  }

  const { data, error } = useSWR<any, Error>(url, fetcher);
  return { data, error };
}