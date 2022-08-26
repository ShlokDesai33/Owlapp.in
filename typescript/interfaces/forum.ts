import type Post from './post'
import { Timestamp } from 'firebase/firestore'

/**
 * Child Interface - defines the properties of a forum
 * @extends Post
 */
 interface Forum extends Post {
  // character count: 100 (including whitespace)
  topic: string
  // minimum rank to participate in the forum
  minRank: number
}

// --------------------------------------------------
// forum related interfaces
// --------------------------------------------------

/**
 * Models a comment / question in a forum
 * Does not extend Post because it is not a post
 */
interface Comment {
  // firestore document id
  id: string
  creator: {
    // firestore document id
    id: string
    // google auth image url / amazon s3 url
    image: string
    // obtained from google auth
    fullname: string
    status: 'verified' | 'admin' | 'banned' | 'suspended' | 'user'
  }
  // firebase class modeling a timestamp
  timestamp: Timestamp
  // character count: 150 (including whitespace)
  title: string
  // character count: 300 (including whitespace)
  body: string
}

export type { Forum, Comment }