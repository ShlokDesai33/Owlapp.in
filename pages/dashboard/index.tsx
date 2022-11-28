import Head from 'next/head'
import { Compass, Warning } from 'phosphor-react'
import Layout from '../../components/layout/auth'
import Spinner from '../../components/lib/spinner'
import ResourceHit from '../../components/search/hits/resource'
import useResourcesInf from '../../hooks/useResourcesInf'
import type { NextPageWithLayout } from '../../typescript/nextpage'

const Dashboard: NextPageWithLayout = () => {
  const { data, error, size, setSize } = useResourcesInf();

  const isLoadingMore = (!data && !error) || (size > 0 && data && typeof data[size - 1] === "undefined");
  
  if (error) return (
    <div className="flex flex-col gap-y-1 items-center pt-12">
      <Warning size={40} weight="light" className="text-red-600" />
      <p className="font-normal text-gray-700">An error occured. Please try again later.</p>
    </div>
  );

  if (!data) return (
    <div className="flex justify-center mt-20">
      <Spinner />
    </div>
  );
  
  return (
    <>
      <Head>
        <title>Home | Owl</title>
      </Head>

      <div className="text-gray-700 mt-6 flex items-center gap-x-1">
        <Compass size={24} />
        Explore all of our equipement/machines/intruments below!
      </div>

      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 mt-6">
        {
          data.map((arr: any[]) => {
            return arr.map((product: any) => (
              <ResourceHit key={product.objectID} hit={product} />
            ))
          })
        }
      </div>

      <div className="py-6 w-full">
        {
          isLoadingMore ? (
            <div className="flex justify-center">
              <Spinner />
            </div>
          ) : data && data[size - 1]?.length < 8 ? (
            <div className="flex justify-center text-gray-700">
              No more results
            </div>
          ) : (
            <button
              type="button"
              className="w-full rounded-md border border-gray-500 bg-white px-4 py-2 text-base font-semibold text-gray-700 hover:bg-gray-50"
              onClick={() => setSize(size + 1)}
            >
              Load More
            </button>
          )
        }
      </div>
    </>
  )
}

// return the Home page wrapped in the Layout component
Dashboard.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
}

export default Dashboard