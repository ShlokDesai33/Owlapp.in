import Head from 'next/head'
import Layout from '../../components/layout/auth'
import type { NextPageWithLayout } from '../../typescript/nextpage'

const Dashboard: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Home | Owl</title>
      </Head>
    </>
  )
}

// return the Home page wrapped in the Layout component
Dashboard.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
}

export default Dashboard