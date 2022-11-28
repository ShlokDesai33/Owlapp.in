import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../../firebase'
import { collection, query, startAfter, getDocs, limit, orderBy, Query, DocumentData, Timestamp } from "firebase/firestore"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any[]>
) {

  // createdAt object contains seconds and nanoseconds
  const { secs, nanos } = req.query
  const arr: any[] = []
  let q: Query<DocumentData>;

  // check if we have a createdAt and query firestore
  if (secs && nanos) {
    // timestamp exits, fetch posts after that timestamp
    const timestamp = new Timestamp(Number(secs), Number(nanos))
    q = query(collection(db, 'resources'),
      orderBy('createdAt', 'desc'),
      startAfter(timestamp),
      limit(8)
    )
  } else {
    // no createdAt, fetch the first 10 posts
    q = query(collection(db, 'resources'),
      orderBy('createdAt', 'desc'),
      limit(8)
    )
  }
  const docs = await getDocs(q);
  
  // construct response obj
  docs.forEach(doc => {
    const data = doc.data()
    arr.push({
      objectID: doc.id,
      name: data.name,
      org: data.org,
      image: data.image,
      prices: data.prices,
      createdAt: data.createdAt,
    })
  })

  res.status(200).json(arr)
}