import Head from 'next/head'
import Layout from '../../../components/layout/auth'
import Spinner from '../../../components/lib/spinner'
import useSession from '../../../hooks/useSession'
import type { NextPageWithLayout } from '../../../typescript/nextpage'

const UserProfile: NextPageWithLayout = () => {
  const { user } = useSession();

  if (!user) {
    return (
      <>
        <Head>
          <title>Your Profile | Instrumus</title>
        </Head>

        <div className="flex justify-center mt-20">
          <Spinner />
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Your Profile | Instrumus</title>
      </Head>

      <main>
        <div className="overflow-hidden bg-white rounded-sm sm:rounded-lg mt-6 border-2">
          <div className="flex justify-between items-center">
            <div className="pl-4 py-5 sm:pl-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Account Details</h3>
            </div>
          </div>

          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Your Name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{user.name}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Your Unique ID</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">@{user.id}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Your Registered Email</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{user.email}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Your Instrumus Rank</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{user.rank}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Your Follower Count</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{user.followers}</dd>
              </div>
            </dl>
          </div>
        </div>
      </main>
    </>
  )
}

// return the Home page wrapped in the Layout component
UserProfile.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
}

export default UserProfile