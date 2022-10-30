import type { NextApiRequest, NextApiResponse } from 'next'
import { collection, getDocs } from 'firebase/firestore'
import db from '../../../../firebase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { param, id } = req.query

  if (!id) {
    return res.status(400).end();
  }

  const arr: string[] = [];

  const docs = await getDocs(collection(db, `resources/${id}/${param}`));

  docs.forEach(doc => {
    const data = doc.data();
    arr.push(data.content);
  });

  res.status(200).json(arr);
  
}
