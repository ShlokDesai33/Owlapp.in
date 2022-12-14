import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../firebase'
import { Forum } from '../../../typescript/interfaces/forum'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body as Forum;
  // add doc to 'forums' collection
  try {
    // add doc and get the doc id
    const docRef = await addDoc(collection(db, 'forums'), {
      topic: body.topic,
      minRank: body.minRank,
      creator: {
        name: body.creator.name,
        image: body.creator.image,
        id: body.creator.id,
        status: body.creator.status
      },
      createdAt: serverTimestamp()
    });
    const id = docRef.id;

    // set forum's id as a header
    res.setHeader('id', id);
    res.status(201).end();
  } catch (e) {
    // 500: Internal Server Error
    res.status(500).end();
  }
}