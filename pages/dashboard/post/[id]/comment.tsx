import Head from 'next/head'
import Layout from '../../../../components/layout/auth'
import type { NextPageWithLayout } from '../../../../typescript/nextpage'

const CreateComment: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Social | Owl</title>
      </Head>
    </>
  )
}

// return the Home page wrapped in the Layout component
CreateComment.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
}

export default CreateComment