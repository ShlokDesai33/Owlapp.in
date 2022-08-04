import useSWR from 'swr'
import Payload from '../typescript/auth/jwt'

const fetcher = (url: string) => (
  fetch(url).then(res => {
    // 309: Redirect to login page
    if (res.status === 309) {
      throw new Error('Authentication failed');
    }
    // 200: OK
    return res.json();
  })
);

export default function useSession() {
  // make GET request with httpOnly cookie if it exists
  const { data, error } = useSWR<Payload, Error>('/api/auth/session', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false
  });

  // we need if else ladder because data and error can both be undefined
  if (error) {
    return {
      status: 'unauthenticated',
      user: null
    };
  }
  else if (data) {
    return {
      status: 'authenticated',
      user: {
        fullname: data.name,
        image: data.image,
        id: data.sub
      },
    };
  }
  else {
    return {
      status: 'loading',
      user: null
    };
  }
}