import type { NextApiRequest, NextApiResponse } from 'next'
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import db from '../../../firebase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const q = query(collection(db, `resources`), orderBy('createdAt', 'desc'), limit(9));
  const querySnapshot = await getDocs(q);

  const resources: any[] = [];

  querySnapshot.forEach((doc) => {
    resources.push({
      objectID: doc.id,
      ...doc.data()
    });
  });

  // 200: OK
  return res.status(200).json(resources);
  
}
