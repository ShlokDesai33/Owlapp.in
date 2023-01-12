import type { NextApiRequest, NextApiResponse } from 'next'
import { SignJWT } from 'jose'
// library for generating symmetric key for jwt
import { createSecretKey } from 'crypto'
import { collection, getDocs, query, where } from 'firebase/firestore'
import db from '../../../firebase'
import bcrypt from 'bcryptjs'
import Cookies from 'cookies'

const JWT_SECRET = createSecretKey(process.env.JWT_SECRET as string, 'utf-8');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).end();
  }

  // Create a query against the /users collection.
  const q = query(collection(db, 'users'), where('email', '==', email));

  const querySnapshot = await getDocs(q);
  // there is never going to be more than one doc
  if (querySnapshot.docs.length === 1) {
    // doc.data() is never undefined for query doc snapshots
    querySnapshot.forEach(async (doc) => {
      // create a user authentication jwt token
      const user = doc.data();

      if (!user.password) {
        // 309: Redirect to sign up page
        return res.status(309).end();
      }

      // check password
      const matches = await bcrypt.compare(password, user.password);

      if (matches) {
        // user authenticated; create user's auth token
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
      }
      else {
        // 401: Unauthorized
        return res.status(401).end();
      }
    });
  }
  else if (querySnapshot.docs.length === 0) {
    // 309: Redirect to sign up page
    return res.status(309).end();
  }
  else {
    // impossible since one email can only be linked to one user
    return res.status(500).end();
  }
}
