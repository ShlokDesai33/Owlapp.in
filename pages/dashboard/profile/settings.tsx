import Head from 'next/head'
import Layout from '../../../components/layout/auth'
import type { NextPageWithLayout } from '../../../typescript/nextpage'

const Settings: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Settings | Owl</title>
      </Head>
    </>
  )
}

// return the Home page wrapped in the Layout component
Settings.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
}

export default Settings