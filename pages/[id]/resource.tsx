import Head from 'next/head'
import Layout from '../../components/layout'
import { Product } from '../../typescript/interfaces/product'

const ViewProduct = ({ product }: { product: Product }) => {
  return (
    <>
      <Head>
        <title>Settings | Owl</title>
      </Head>
    </>
  )
}

// return the Home page wrapped in the Layout component
ViewProduct.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
}

export default ViewProduct