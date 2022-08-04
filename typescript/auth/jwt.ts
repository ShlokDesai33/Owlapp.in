/**
 * Models the payload of a JWT token.
 */
type Payload = {
  name: string
  image: string
  sub: string
  iat: number
  exp: number
  iss: string
  aud: string
}

export default Payload;