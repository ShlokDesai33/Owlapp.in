import Head from 'next/head'
import Layout from '../../../components/layout/auth'
import type { NextPageWithLayout } from '../../../typescript/nextpage'

const UserProfile: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Your Profile | Instrumus</title>
      </Head>
    </>
  )
}

// return the Home page wrapped in the Layout component
UserProfile.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
}

export default UserProfile