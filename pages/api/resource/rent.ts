import type { NextApiRequest, NextApiResponse } from 'next'
import { writeBatch, doc, collection, getDoc } from 'firebase/firestore'
import db from '../../../firebase'
import { parseISO } from 'date-fns'
import nodeMailer from 'nodemailer'

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

    // send email to admin
    let transport = nodeMailer.createTransport({
      host: 'smtpout.secureserver.net',
      port: 465,
      auth: {
        user: 'no-reply@owlapp.in',
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    transport.sendMail({
      from: '"Owl" no-reply@owlapp.in', // sender address
      to: body.adminEmail, // list of receivers
      subject: `New booking on product @${body.productID}`, // Subject line
      html:
      `
        <h5>Product Name: ${body.productName}</h5>
        <h5>Selected Slot: ${body.selectedSlot}</h5>
        <hr></hr>
        <p>This booking is waiting for your approval.</p>
        <p>Go to the <a href="https://owl-console.vercel.app/">console</a> to see more.</p>
      `, // html body
    });

    // get the user's email
    const userDoc = await getDoc(doc(db, `users/${body.userID}`));

    // send email to user
    transport.sendMail({
      from: '"Owl" no-reply@owlapp.in', // sender address
      to: userDoc.data()?.email, // list of receivers
      subject: `New booking received`, // Subject line
      html:
      `
        <h2>Thank you for booking with us!</h2>
        <p>Your booking has been received and is currently awaiting approval.</p>
        <hr></hr>
        <h5>Product Name: ${body.productName}</h5>
        <h5>Selected Slot: ${body.selectedSlot}</h5>
        <hr></hr>
        <p>This product's admin may reach out to you. If you have any questions, feel free to contact the admin directly.</p>
      `, // html body
    });
  }
  catch (e) {
    console.log(e);
    res.status(500).end();
  }
}
