import type { NextApiRequest, NextApiResponse } from 'next'
import { SignJWT } from 'jose'
// library for generating symmetric key for jwt
import { createSecretKey } from 'crypto'
import { collection, getDocs, query, where, serverTimestamp, addDoc } from 'firebase/firestore'
import db from '../../../firebase'
import bcrypt from 'bcryptjs'
import Cookies from 'cookies'

const JWT_SECRET = createSecretKey(process.env.JWT_SECRET as string, 'utf-8');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    return res.status(400).end();
  }

  // Create a query against the /users collection.
  const q = query(collection(db, 'users'), where('email', '==', email));

  const querySnapshot = await getDocs(q);
  // check if email already exists in database
  if (querySnapshot.docs.length > 0) {
    // 309: Redirect to login page
    return res.status(309).end();
  }

  // hash password and generate avatar
  const hashedPassword = await bcrypt.hash(password, 10);
  const avatar = `https://source.boringavatars.com/marble/60/${email}?colors=2F80ED,BE6CFF,1100D6`

  try {
    const docRef = await addDoc(collection(db, 'users'), {
      fullname: fullname,
      email: email,
      password: hashedPassword,
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
      .setIssuer('owlapp.in')
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
