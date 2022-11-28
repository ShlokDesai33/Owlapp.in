import useSWR from 'swr'

type Output = {
  status: 'authenticated' | 'unauthenticated' | 'loading';
  user: {
    name: string
    image: string
    id: string
    status: string
  } | null;
}

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

/**
 * Simple Authentication Hook inspired by next-auth
 * NOTE: this hook is not used in admin pages
 * 
 * @returns {Output}
 */
export default function useSession(): Output {
  // make GET request with httpOnly cookie if it exists
  const { data, error } = useSWR<any, Error>('/api/auth/session', fetcher, {
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
        name: data.name,
        image: data.image,
        id: data.id,
        status: data.status
      }
    };
  }
  else {
    return {
      status: 'loading',
      user: null
    };
  }
}