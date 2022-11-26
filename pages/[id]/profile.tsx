import Head from 'next/head'
import Layout from '../../components/layout/'
import type { NextPageWithLayout } from '../../typescript/nextpage'

const ViewProfile: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Settings | Owl</title>
      </Head>
    </>
  )
}

// return the Home page wrapped in the Layout component
ViewProfile.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
}

export default ViewProfile