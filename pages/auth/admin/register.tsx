import Head from 'next/head'
import Layout from '../../../components/layout/auth'
import type { NextPageWithLayout } from '../../../typescript/nextpage'

const AdminRegistration: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Admin Registration | Owl</title>
      </Head>
    </>
  )
}

// return the Home page wrapped in the Layout component
AdminRegistration.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
}

export default AdminRegistration