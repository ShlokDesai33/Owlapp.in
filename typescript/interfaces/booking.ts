import { Timestamp } from 'firebase/firestore'

// data stored in the user/bookings collection
interface UserBooking {
  selectedSlot: Timestamp
  // complete | pending | cancelled
  metricQuantity: number
  metric: string
  // visit | shipment | pickup | online | consultation
  type: string
  status: string
  // resource id
  resourceID: string
  // org details
  org: {
    name: string
    id: string
    image: string
  }
  // when the booking was made
  createdAt: Timestamp
}

// data stored in the resource/bookings collection
interface ResourceBooking {
  customInputs: {
    [key: string]: string
  }
  // complete | pending | cancelled
  metricQuantity: number
  metric: string
  // visit | shipment | pickup | online | consultation
  type: string
  status: string
  // user details
  user: {
    name: string
    id: string
    image: string
  }
  // when the booking was made
  createdAt: Timestamp
  // the time slot selected by the user
  selectedSlot: Timestamp
}

export type { UserBooking, ResourceBooking }