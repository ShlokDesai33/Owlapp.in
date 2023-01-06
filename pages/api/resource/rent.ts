import type { NextApiRequest, NextApiResponse } from 'next'
import { writeBatch, doc, collection } from 'firebase/firestore'
import db from '../../../firebase'
import { parseISO } from 'date-fns'

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

    const bookingDoc = doc(collection(db, `resources/${body.productID}/bookings`));
    const selectedSlot = parseISO(body.selectedSlot);

    batch.set(bookingDoc, {
      selectedSlot: selectedSlot
    });

    batch.set(doc(db, `users/${body.userID}/bookings`, bookingDoc.id), {
      customInputs: customInputs,
      // booking details
      selectedSlot: selectedSlot,
      metricQuantity: body.metricQuantity,
      type: body.bookingType,
      status: 'pending',
      totalCost: body.totalPrice,
      // product details
      product: {
        id: body.productID,
        name: body.productName,
        priceMetric: body.productMetric,
      },
      // org details
      org: {
        name: body.orgName,
        id: body.orgID,
        image: body.orgImage,
      },
      admin: {
        name: body.adminName,
        id: body.adminID,
        email: body.adminEmail,
        cell: body.adminCell,
      },
      createdAt: timestamp,
    });

    batch.set(doc(db, `users/${body.orgID}/admins/${body.adminID}/bookings`, bookingDoc.id), {
      customInputs: customInputs,
      // booking details
      metricQuantity: body.metricQuantity,
      selectedSlot: selectedSlot,
      type: body.bookingType,
      totalCost: body.totalPrice,
      status: 'pending',
      // product details
      product: {
        id: body.productID,
        name: body.productName,
        priceMetric: body.productMetric,
      },
      // user details
      user: {
        name: body.userName,
        id: body.userID,
        image: body.userImage,
      },
      createdAt: timestamp,
    });

    await batch.commit();
    res.status(200).end();
  }
  catch (e) {
    console.log(e);
    res.status(500).end();
  }
}
