import Head from 'next/head'
import Layout from '../../components/layout'
import type { NextPageWithLayout } from '../../typescript/nextpage'

const Profile: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Home | Owl</title>
      </Head>
    </>
  )
}

// return the Home page wrapped in the Layout component
Profile.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
}

export default Profile