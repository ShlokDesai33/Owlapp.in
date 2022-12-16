import type { NextApiRequest, NextApiResponse } from 'next'
import { collection, getDocs } from 'firebase/firestore'
import db from '../../../../firebase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { param, id } = req.query

  if (!id || !param) {
    return res.status(400).end();
  }

  const arr: any[] = [];
  const docs = await getDocs(collection(db, `resources/${id}/${param}`));

  docs.forEach(doc => {
    arr.push({ id: doc.id, ...doc.data()});
  });

  res.status(200).json(arr);
  
}
