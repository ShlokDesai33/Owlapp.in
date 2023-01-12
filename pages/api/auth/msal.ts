import type { NextApiRequest, NextApiResponse } from 'next'
import { SignJWT } from 'jose'
// library for generating symmetric key for jwt
import { createSecretKey } from 'crypto'
import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore'
import db from '../../../firebase'
import Cookies from 'cookies'
import { AccountInfo } from '@azure/msal-browser'

const JWT_SECRET = createSecretKey(process.env.JWT_SECRET as string, 'utf-8');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const body: AccountInfo = req.body;

  if (!body.username || !body.name) {
    return res.status(400).end();
  }

  // Create a query against the /users collection.
  const q = query(collection(db, 'users'), where('email', '==', body.username));

  const querySnapshot = await getDocs(q);
  // there is never going to be more than one doc
  if (querySnapshot.docs.length === 1) {
    // doc.data() is never undefined for query doc snapshots
    querySnapshot.forEach(async (doc) => {
      // create a user authentication jwt token
      const JWT_TOKEN = await new SignJWT({ })
        .setProtectedHeader({ alg: 'HS256' })
        .setSubject(doc.id)
        .setIssuedAt()
        .setExpirationTime('10 days')
        .setIssuer('instrumus.com')
        .sign(JWT_SECRET);

      const cookies = new Cookies(req, res);

      cookies.set('auth-token', JWT_TOKEN, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        // 10 days
        maxAge: 864000000,
      });

      res.status(200).end();
    });
  }
  else if (querySnapshot.docs.length === 0) {
    // create a new user
    const avatar = `https://source.boringavatars.com/marble/60/${body.username}?colors=2F80ED,BE6CFF,1100D6`

    try {
      const docRef = await addDoc(collection(db, 'users'), {
        name: body.name,
        email: body.username,
        image: avatar,
        rank: 0,
        followers: 0,
        bio: 'Nothing added yet',
        createdAt: serverTimestamp(),
        status: 'user'
      });

      // user authenticated; create user's auth token
      const JWT_TOKEN = await new SignJWT({ })
        .setProtectedHeader({ alg: 'HS256' })
        .setSubject(docRef.id)
        .setIssuedAt()
        .setExpirationTime('10 days')
        .setIssuer('instrumus.com')
        .sign(JWT_SECRET);

      const cookies = new Cookies(req, res);

      cookies.set('auth-token', JWT_TOKEN, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        // 10 days
        maxAge: 864000000,
      });

      res.status(200).end();
    } catch {
      // 500: Internal Server Error
      return res.status(500).end();
    }
  }
  else {
    // impossible since one email can only be linked to one user
    return res.status(500).end();
  }
}
