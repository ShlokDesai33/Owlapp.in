import Head from 'next/head'
import Layout from '../components/layout'
import { NextPageWithLayout } from '../typescript/nextpage'

const AboutUs: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>About Us | Owl</title>
      </Head>
    </>
  )
}

AboutUs.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout classes="border-b-2 border-gray-100 bg-white">{page}</Layout>;
}

export default AboutUs