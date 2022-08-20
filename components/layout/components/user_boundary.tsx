import SignInButton from './signin'

type Props = {
  children: React.ReactNode
  authenticated: boolean
}

export default function UserBoundary({ children, authenticated }: Props) {
  return authenticated ? <>{children}</> : <SignInButton />
}