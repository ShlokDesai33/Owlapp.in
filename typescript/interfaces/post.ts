import { Timestamp } from 'firebase/firestore'

/**
 * A post is any content that is posted by a user. It can be a
 * forum / article / research paper / product.
 * 
 * This interface is the parent interface of all post types.
 * It is inherited by the Forum and Product interfaces.
*/
interface Post {
  // firestore document id
  id: string
  // creator information
  creator: {
    // firestore document id
    id: string
    // obtained from google auth
    fullname: string
    // google auth image url / amazon s3 url
    image: string
    status: 'verified' | 'admin' | 'banned' | 'suspended' | 'user'
  }
  // firebase class modeling a timestamp
  createdAt: Timestamp
}

export default Post