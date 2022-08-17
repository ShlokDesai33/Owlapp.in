import { Timestamp } from "firebase/firestore"

interface Booking {
  // firstore document id
  id: string
  // booking date and time
  time: Timestamp
  // booking status
  status: string
  // resource id
  resourceId: string
  // user id
  userId: string
  // when the booking was made
  timestamp: Timestamp
}

export default Booking