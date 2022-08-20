import Link from 'next/link'

export default function SignInButton() {
  return (
    <Link href="/auth/signin" passHref>
      <button className="flex items-center gap-x-2 py-3 px-9 rounded-full bg-white shadow-post-shadow">
        <div className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          <h4 className="font-medium">Sign In</h4>
        </div>
      </button>
    </Link>
  )
}