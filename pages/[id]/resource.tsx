import Head from 'next/head'
import Layout from '../../components/layout'
import useResource from '../../hooks/useResource'
import Image from 'next/image'
import { GetServerSideProps } from 'next'
import useResourceParam from '../../hooks/useResourceParam'

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

const gridCell = (count: number, content: string) => (
  <div className="py-4 px-5 rounded-xl shadow-post-shadow" key={content}>
    <h5>{count}</h5>
    <p className="text-gray-text">{content}</p>
  </div>
)

const ViewProduct = ({ id }: { id: string }) => {
  const { product, error } = useResource(id);
  const { data: applications, error: aError } = useResourceParam('applications', id);
  const { data: limitations, error: lError } = useResourceParam('limitations', id);

  let appCount = 1;
  let limitCount = 1;

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

  if (!product) {
    return <>Loading..</>
  }
  
  return (
    <>
      <Head>
        <title>{product.name} | Owl</title>
      </Head>

      <main className="pt-10 px-12 overflow-y-auto h-full">
        <div className="flex gap-x-10 justify-between bg-gray-bg p-8 rounded-xl">
          <div className="shrink-0">
            <Image
              src={product.image}
              alt={product.name}
              width={250}
              height={250}
              className="rounded-xl"
            />
          </div>

          <div className="flex divide-x-2 w-full justify-between gap-x-10">
            <div>
              <h4>{product.name}</h4>
              <p className="mt-2">{product.description}</p>
            </div>

            <div className="pl-10 pr-4 shrink-0">
              <p>Status:</p>
              <h6 className={classNames(
                product.status === 'Available' && 'text-green-500',
                product.status === 'Out of Service' && 'text-red-500',
                product.status === 'Under Maintenance' && 'text-yellow-500',
              )}>{product.status}</h6>

              <p className="mt-4 mb-2">Pricing:</p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center border-gray-btn border-2 p-4 rounded-xl">
                  <h6>₹{product.prices.industry}</h6>
                  <p className="text-gray-text">Industry</p>
                </div>

                { product.prices.faculty !== product.prices.industry ?
                  (
                    <div className="text-center border-gray-btn border-2 p-4 rounded-xl">
                      <h6>₹{product.prices.faculty}</h6>
                      <p className="text-gray-text">Faculty</p>
                    </div>
                  ) :
                  (
                    <div className="border-gray-btn border-2 p-4 rounded-xl border-dotted"></div>
                  )
                }
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl py-2 px-4 mt-8 bg-gradient-to-r from-primary to-secondary opacity-95">
          <h6 className="text-white font-medium">This resource will be available to rent soon!</h6>
        </div>

        <hr className="mt-8 border-t-2"/>

        { 
          applications ? applications.length > 0 ?
          (
            <div className="mt-6">
              <h4>Applications</h4>
              
              <div className="grid grid-cols-2 gap-6 mt-5">
                {applications.map((content: string) => gridCell(appCount++, content))}
              </div>
            </div>
          ) :
          (
            <></>
          ) :
          (
            <>Loading...</>
          )
        }

        { 
          limitations ? limitations.length > 0 ?
          (
            <div className="my-8">
              <h4>Limitations</h4>
              
              <div className="grid grid-cols-2 gap-6 mt-5">
                {limitations.map((content: string) => gridCell(limitCount++, content))}
              </div>
            </div>
          ) :
          (
            <></>
          ) :
          (
            <>Loading...</>
          )
        }
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  return {
    props: {
      id,
    },
  }
}


// return the Home page wrapped in the Layout component
ViewProduct.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
}

export default ViewProduct