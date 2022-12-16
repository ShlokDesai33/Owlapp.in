interface User {
  // firestore document id
  id: string
  // amazon s3 url
  image: string
  name: string
  // hidden
  email: string
  // hidden
  password: string
  // Owl Rank
  rank: number
  followers: number
  createdAt: Date
  // current status of user's account
  status: 'verified' | 'banned' | 'org'
  // user's bio
  bio: string
  // secondary layer of authentication for users looking to book resources
  authorization: {
    // Student | Prof/Researcher | Professional
    occupation: string
    // org firesbase document id
    organization: string
  }
}

export default User