/**
 * Models the payload of a JWT token.
 */
type Payload = {
  // fullname of the user
  name: string
  // amazon s3 url of the user's image
  img: string
  // firestore document id of the user
  sub: string
  // token's creation timestamp
  iat: number
  // token's expiration timestamp
  exp: number
  // issued by owlapp.in
  iss: string
  // type of user - admin | verified-user | user | banned-user 
  aud: string
}

export default Payload