import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../firebase'
import { getDoc, doc } from "firebase/firestore"

function parseBookingType(type: string) {
  switch (type) {
    case 'visit':
      return 'In-Person Visit';
    case 'shipment':
      return 'Drop off / Parcel shipment of sample';
    default:
      return '';
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  // createdAt object contains seconds and nanoseconds
  const { id, userID } = req.query

  if (!id || !userID) {
    return res.status(400).end();
  }

  const arr: any[] = []
  const docSnap = await getDoc(doc(db, `users/${userID}/bookings/${id}`));

  if (docSnap.exists()) {
    res.status(200).json({ id: docSnap.id, ...docSnap.data() });
  } else {
    // doc.data() will be undefined in this case
    res.status(404).end();
  }
}