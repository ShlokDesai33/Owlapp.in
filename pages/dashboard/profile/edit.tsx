import Head from 'next/head'
import Layout from '../../../components/layout'
import type { NextPageWithLayout } from '../../../typescript/nextpage'

const EditProfile: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Edit Profile | Owl</title>
      </Head>
    </>
  )
}

// return the Home page wrapped in the Layout component
EditProfile.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
}

export default EditProfile