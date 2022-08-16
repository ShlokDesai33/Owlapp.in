/**
 * Models the payload of a JWT token.
 */
type Payload = {
  name: string
  img: string
  sub: string
  iat: number
  exp: number
  iss: string
  aud: string
}

export default Payload;