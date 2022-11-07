import Head from 'next/head'
import Layout from '../../components/layout/auth'
import GridCell from '../../components/resource/grid_cell'
import useResourcesInf from '../../hooks/useResourcesInf'
import type { NextPageWithLayout } from '../../typescript/nextpage'

const Resources: NextPageWithLayout = () => {
  const { data, error }= useResourcesInf();

  if (error) {
    return <>Error</>
  }
  else if (!data) {
    return <>Loading..</>
  }

  console.log(data);

  return (
    <>
      <Head>
        <title>Resources | Owl</title>
      </Head>

      <div className="p-12 overflow-y-scroll">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          { data.map((resource: any) => <GridCell key={resource.id} resource={resource} />) }
        </div>
      </div>
    </>
  )
}

// return the Home page wrapped in the Layout component
Resources.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
}

export default Resources