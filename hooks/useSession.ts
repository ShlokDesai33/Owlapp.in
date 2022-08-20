import useSWR from 'swr'
import Payload from '../typescript/auth/jwt'

type Output = {
  status: 'authenticated' | 'unauthenticated' | 'loading';
  user: {
    fullname: string
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
    // aud can be 'admin' | 'user' | 'verified-user' | 'banned-user' 
    // check if aud === 'verified-user' or 'banned-user'
    const ind = data.aud.indexOf('-');
    if (ind !== -1) {
      data.aud = data.aud.substring(0, ind);
    }

    return {
      status: 'authenticated',
      user: {
        fullname: data.name,
        image: data.img,
        id: data.sub,
        status: data.aud
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