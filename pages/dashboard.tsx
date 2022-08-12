import Head from "next/head";
import Layout from "../components/layout/layout";
import { NextPageWithLayout } from "../typescript/nextpage";

const Dashboard: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Home | Owl</title>
      </Head>
      
      <h1>Hello Next.js</h1>
    </>
  )
}

// return the Home page wrapped in the Layout component
Dashboard.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
}

export default Dashboard;