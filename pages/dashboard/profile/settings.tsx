import Head from 'next/head'
import { Barricade } from 'phosphor-react'
import Layout from '../../../components/layout/auth'
import type { NextPageWithLayout } from '../../../typescript/nextpage'

const Settings: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Settings | Owl</title>
      </Head>

      <div className="flex w-full justify-center items-center gap-x-3 m-10 bg-gray-bg rounded-xl">
        <Barricade size={70} color="#BE6CFF" weight="light" />
        <h3 className="font-normal">Comming Soon!</h3>
      </div>
    </>
  )
}

// return the Home page wrapped in the Layout component
Settings.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
}

export default Settings