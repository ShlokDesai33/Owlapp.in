import type { NextApiRequest, NextApiResponse } from 'next'
import { SignJWT } from 'jose'
// library for generating symmetric key for jwt
import { createSecretKey } from 'crypto'
import Cookies from 'cookies'

const JWT_SECRET = createSecretKey(process.env.JWT_SECRET as string, 'utf-8');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  // create a cookie instance to configure cookies
  const cookies = new Cookies(req, res);
  // get the auth cookie if it exists

  // create a user authentication jwt token
  const JWT_TOKEN = await new SignJWT({ 
    'name': 'Shlok Desai', 
    'image': 'https://lh3.googleusercontent.com/a-/AFdZucqmYFJLGQ48JjmJtZlKdEu7MK7Uy0D1IkLaAXQK=s96-c' 
  })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setSubject('user-unique-id')
    .setIssuedAt()
    .setExpirationTime('10 days')
    .setIssuer('owlapp.in')
    // can be user / admin
    .setAudience('user')
    .sign(JWT_SECRET);

  // set the jwt token in the cookie
  cookies.set('auth-token', JWT_TOKEN, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    // 10 days
    maxAge: 864000000,
  });

  res.status(200).json({ mssg: 'Successfully authenticated' });
}
