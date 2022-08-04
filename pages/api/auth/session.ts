import type { NextApiRequest, NextApiResponse } from 'next'
import { jwtVerify } from 'jose'
// library for generating symmetric key for jwt
import { createSecretKey } from 'crypto'
import Cookies from 'cookies';

// convert string to KeyObject
const JWT_SECRET = createSecretKey(process.env.JWT_SECRET as string, 'utf-8');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // create a cookie instance to configure cookies
  const cookies = new Cookies(req, res);
  // get the auth cookie if it exists
  const token = cookies.get('auth-token');

  if (token) {
    try {
      // verify token signature
      const { payload, protectedHeader } = await jwtVerify(token, JWT_SECRET, {
        issuer: 'owlapp.in', // iss
        audience: 'user', // aud
      });
      // user is authenticated
      return res.status(200).json(payload);
    } catch (error: any) {
      // token has been tempered with
      // instruct browser to delete auth cookie
      cookies.set('auth-token', '', {
        maxAge: 0,
      });
      // error.claim and error.code are defined if iss or aud are invalid
      // error.code is defined if signature is invalid
      // routes user to login page
      // 309: Redirect to login page
      return res.status(309).json({ error: error.code });
    }
  } else {
    // 309: Redirect to login page
    res.status(309).json({ error: 'Token absent' });
  }
}
