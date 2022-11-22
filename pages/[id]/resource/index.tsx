import Head from 'next/head'
import Layout from '../../../components/layout'
import useResource from '../../../hooks/useResource'
import Image from 'next/image'
import { GetServerSideProps } from 'next'
import useResourceParam from '../../../hooks/useResourceParam'
import { Chats, UserCircle } from 'phosphor-react'
import useCustomData from '../../../hooks/useCustomData'
import blueCheck from '../../../public/images/blue-check.svg'

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

const gridCell = (count: number, content: string) => (
  <div className="py-4 px-5 rounded-xl shadow-post-shadow" key={content}>
    <p>{count}</p>
    <h5 className="text-gray-text">{content}</h5>
  </div>
)

const ViewProduct = ({ id }: { id: string }) => {
  const { product, error } = useResource(id);
  const { data: applications, error: aError } = useResourceParam('applications', id);
  const { data: limitations, error: lError } = useResourceParam('limitations', id);
  const { data: customInfo, error: cError } = useCustomData(id);

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

      <main className="pt-10 px-12 overflow-y-auto h-full w-full">
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
              <div className="flex items-center gap-x-2 mb-2">
                <Image
                  src={product.org.logo}
                  width={50}
                  height={50}
                  className="h-full w-full object-cover object-center rounded-full shrink-0"
                />

                <h6 className="text-gray-700 truncate">{product.org.name}</h6>
              </div>

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

        {/* <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScZo6iPfIhP4NPumK7uvJcUVKvZDYaLg2jwXHE_7SqJYL3hgQ/viewform?embedded=true" className="w-full h-full" frameBorder={0} marginHeight={0} marginWidth={0}>Loading…</iframe> */}

        <div className="flex bg-gray-bg px-8 py-6 items-center rounded-xl mt-8">
          <UserCircle size={32} weight="fill" className="text-secondary" />
          <div className="flex items-center divide-x-2 divide-gray-500 gap-x-2 ml-2">
            <h5>{product.admin.name}</h5>
            <h5 className="pl-2">{product.admin.email}</h5>
          </div>
        </div>

        <div className="rounded-2xl py-2 px-4 mt-8 bg-gradient-to-r from-primary to-secondary opacity-95">
          <h6 className="text-white font-medium">This resource will be available to rent soon!</h6>
        </div>

        <hr className="mt-8 border-t-2"/>

        { 
          applications ? applications.length > 0 ?
          (
            <div className="my-6">
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

        {
          customInfo ? customInfo.length > 0 ?
          customInfo.map((info: any) => (
            <div className="my-8" key={info.name}>
              <h4>{info.name}</h4>
              
              <div className="grid grid-cols-2 gap-6 mt-5">
                {info.content.map((content: string) => gridCell(limitCount++, content))}
              </div>
            </div>
          ))
          :
          (
            <></>
          ) :
          (
            <>Loading...</>
          )
        }
        
        <hr className="mt-8 border-t-2"/>

        <div className="bg-gray-bg p-8 my-8 rounded-xl">
          <div className="flex items-center gap-x-2">
            <Chats size={32} className="text-secondary" />
            <h4>FAQ</h4>
          </div>

          <div className="mt-6">
            <div className="flex items-center gap-x-2">
              <Image
                src="https://source.boringavatars.com/marble/60/shlok6203@gmail.com?colors=2F80ED,BE6CFF,1100D6"
                width={30}
                height={30}
                alt="Profile Picture"
                className="rounded-full"
              />

              <h6>Shlok Desai</h6>

              <Image
                src={blueCheck}
                width={25}
                height={25}
                alt="Verified Check"
              />
            </div>

            <div className="ml-3 pl-3 mt-1 border-l-2 border-gray-btn">
              <h5 className="pt-2">
                <span className="text-gray-text">Q: </span>
                How many samples can be submitted in a single request form?
              </h5>

              <div className="flex items-center gap-x-2 mt-4">
                <Image
                  src="https://source.boringavatars.com/marble/60/shlok6203@gm.com?colors=2F80ED,BE6CFF,1100D6"
                  width={30}
                  height={30}
                  alt="Profile Picture"
                  className="rounded-full"
                />

                <h6>Arjun Kohli <span className="text-gray-text">(used this resource before)</span></h6>
              </div>

              <h5 className="mt-2 pb-2">
                <span className="text-gray-text">A: </span>
                Maximum of 5 samples.
              </h5>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center gap-x-2">
              <Image
                src="https://source.boringavatars.com/marble/60/bhavyadoshi@gmail.com?colors=2F80ED,BE6CFF,1100D6"
                width={30}
                height={30}
                alt="Profile Picture"
                className="rounded-full"
              />

              <h6>Bhavya Doshi</h6>
            </div>

            <div className="ml-3 pl-3 mt-1 border-l-2 border-gray-btn">
              <h5 className="pt-2">
                <span className="text-gray-text">Q: </span>
                Which plot should I use for calculating Pore Volume (Diameter)?
              </h5>

              <div className="flex items-center gap-x-2 mt-4">
                <UserCircle size={32} weight="fill" className="text-secondary" />
                <h6>{product.admin.name} <span className="text-gray-text">(admin)</span></h6>
              </div>

              <h5 className="mt-2 pb-2">
                <span className="text-gray-text">A: </span>
                BET plot, and also you can refer BJH and t-plot to study the mesoporous characters of samples.
              </h5>
            </div>
          </div>
        </div>
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