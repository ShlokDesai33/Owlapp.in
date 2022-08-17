import Head from 'next/head'
import Layout from '../../../components/layout'
import type { NextPageWithLayout } from '../../../typescript/nextpage'

const ViewForum: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Home | Owl</title>
      </Head>

      hello
    </>
  )
}

// return the Home page wrapped in the Layout component
ViewForum.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
}

export default ViewForum