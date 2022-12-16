import Head from 'next/head'
import Layout from '../../../../components/layout/auth'
import type { NextPageWithLayout } from '../../../../typescript/nextpage'

const ViewResource: NextPageWithLayout = () => (
  <>
    <Head>
      <title>Social | Owl</title>
    </Head>
  </>
)

// return the ViewResource page wrapped in the Layout component
ViewResource.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
}

export default ViewResource