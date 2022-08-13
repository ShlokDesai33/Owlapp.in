interface User {
  // firestore document id
  _id: string
  // amazon s3 url
  image: string
  fullname: string
  email: string
  password: string
  // Owl Rank
  rank: number
  followers: number
  createdAt: Date
  // verified | admin | banned | suspended
  status: string
  // user's bio
  bio: string
  // user's occupation
  occupation: string
}

export default User