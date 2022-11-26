import Head from 'next/head'
import Layout from '../../components/layout/'
import { NextPageWithLayout } from '../../typescript/nextpage'

const ViewForum: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Forum | Owl</title>
      </Head>

      {/* <div className="flex flex-col grow p-12">
        <div className="flex items-center justify-between border-b-2 pb-8">
          <div className="flex items-center gap-x-3 mr-5">
            <Chats size={40} weight="light" color="#BE6CFF" />
            <h4>The rumoured Apple car vs the Tesla Roadster.</h4>
          </div>
          <Link href={`/dashboard/post/id/comment`}>
            <button className="flex items-center gap-x-1 border-2 border-primary text-primary py-2 px-5 rounded-full text-lg w-fit shrink-0">
              <h6 className="font-medium ">Add Comment</h6>
            </button>
          </Link>
        </div>
        <div className="flex grow mt-8">
          <div className="grow bg-white">
            hello
          </div>
          <div className="h-full border-l-2 bg-white mb-12">
            hello
          </div>
        </div>
      </div> */}
    </>
  )
}

// return the Home page wrapped in the Layout component
ViewForum.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
}

export default ViewForum