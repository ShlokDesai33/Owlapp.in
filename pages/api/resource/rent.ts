import type { NextApiRequest, NextApiResponse } from 'next'
import { writeBatch, doc, collection } from 'firebase/firestore'
import db from '../../../firebase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req
  // create a write batch to add 3 documents
  try {
    const batch = writeBatch(db);
    const timestamp = new Date();
    const customInputs = {};

    for (var key in body) {
      if (key.startsWith('@')) {
        // parse the name of the custom field
        var fieldName = key.split(';')[1];
        var fieldValue: string | Array<String> = body[key];
        // @ts-ignore
        customInputs[fieldName] = fieldValue;
      }
    }

    batch.set(doc(collection(db, `users/${body.userID}/bookings`)), {
      selectedSlot: body.selectedSlot,
      metricQuantity: body.metricQuantity,
      metric: body.metric,
      type: body.type,
      status: 'pending',
      resourceID: body.resourceID,
      org: {
        name: body.orgName,
        id: body.orgID,
        image: body.orgImage,
      },
      createdAt: timestamp,
    });

    batch.set(doc(collection(db, `users/${body.orgID}/admins/${body.adminID}/bookings`)), {
      customInputs: customInputs,
      metricQuantity: body.metricQuantity,
      resourceID: body.resourceID,
      metric: body.metric,
      type: body.type,
      status: 'pending',
      user: {
        name: body.userName,
        id: body.userID,
        image: body.userImage,
      },
      createdAt: timestamp,
      selectedSlot: body.selectedSlot,
    });

    batch.set(doc(collection(db, `resources/${body.resourceID}/bookings`)), {
      selectedSlot: body.selectedSlot,
    });

    await batch.commit();
    res.status(200).end();
  }
  catch (e) {
    console.log(e);
    res.status(500).end();
  }
}
