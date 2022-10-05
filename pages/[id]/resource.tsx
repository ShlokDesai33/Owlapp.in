import { getDoc, doc } from 'firebase/firestore'
import Head from 'next/head'
import { GetStaticProps } from 'next/types'
import Layout from '../../components/layout'
import db from '../../firebase'
import { Product } from '../../typescript/interfaces/product'

type Props = {
  product: Product
  error: number
}

const ViewProduct = ({ product, error }: Props) => {
  if (error) {
    return (
      <>
        <Head>
          <title>Owl</title>
        </Head>

        <div className="flex grow justify-center items-center divide-x-2 gap-x-5">
          <div className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            <h2 className="font-bold">404</h2>
          </div>
          <h3 className="pl-5 font-normal">The resource you&apos;re looking for does not exist.</h3>
        </div>
      </>
    )
  }
  
  return (
    <>
      <Head>
        <title>{product.name} | Owl</title>
      </Head>
    </>
  )
}

/**
 * Fetches user data from firestore during revalidation or a request
 * @returns {Promise}
 */
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // get resource id from request params
  const id = params?.id;
  
  if (!id) {
    // invalid id
    return { props: { error: 404 } };
  }

  // fetch resource data from firestore
  const docSnapshot = await getDoc(doc(db, 'users', id as string));
  // error handling
  if (!docSnapshot.exists()) {
    // resource does not exist
    return { props: { error: 404 } };
  }

  // return resource data
  return { props: { product: docSnapshot.data() as Product } };
}

/**
 * Generates static paths on build time or on demand
 * @returns {Promise}
 */
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

// return the Home page wrapped in the Layout component
ViewProduct.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
}

export default ViewProduct