import Head from "next/head"
import { NextPageWithLayout } from "../../../typescript/nextpage"
import { useRouter } from "next/router"
import Layout from "../../../components/layout/auth"
import useSWR from "swr"
import useSession from "../../../hooks/useSession"
import { Timestamp } from "firebase/firestore"
import Spinner from "../../../components/lib/spinner"

function parseBookingType(type: string) {
  switch (type) {
    case 'visit':
      return 'In-Person Visit';
    case 'shipment':
      return 'Drop off / Parcel shipment of sample';
    default:
      return '';
  }
}

function parseBookingStatus(type: string) {
  switch (type) {
    case 'pending':
      return 'Pending Approval';
    case 'approved':
      return 'Approved';
    case 'completed':
      return 'Completed';
    case 'cancelled':
      return 'Cancelled';
    default:
      return '';
  }
}

const fetcher = (url: string) => (
  fetch(url).then(res => {
    // 500 / 404
    if (!res.ok) {
      throw new Error();
    }
    // 200: OK
    return res.json();
  })
);

const BookingDetails: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  // fetch data
  const { user } = useSession();
  const { data, error } = useSWR(user ? `/api/bookings/${id}?userID=${user.id}` : null, fetcher);

  if (error) return <div>failed to load</div>
  else if (!data) return (
    <>
      <Head>
        <title>Booking Details | Instrumus</title>
      </Head>

      <div className="flex justify-center mt-20">
        <Spinner />
      </div>
    </>
  )

  var customFields = <></>
  var flag = true;

  for (var key in data.customInputs) {
    customFields = (
      <>
        {customFields}
        <div className={`bg-${flag ? 'gray-50' : 'white'} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
          <dt className="text-sm font-medium text-gray-500">
            {key}
          </dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            {data.customInputs[key]}
          </dd>
        </div>
      </>
    )
    flag = !flag;
  }
  
  return (
    <>
      <Head>
        <title>Booking @{id}</title>
      </Head>

      <div className="pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-800 truncate max-w-3xl mt-6">Booking @{id}</h1>
        <div className="overflow-hidden bg-white rounded-sm sm:rounded-lg mt-6 border-2">
          <div className="flex justify-between items-center">
            <div className="pl-4 py-5 sm:pl-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">General Information</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Product and Organization details.</p>
            </div>
          </div>

          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Product Name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{data.product.name}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Product ID</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">@{id}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Organization Name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{data.org.name}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Organization ID</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">@{data.org.id}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Admin Name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{data.admin.name}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Admin Email</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{data.admin.email}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Admin Cell</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">+91 {data.admin.cell}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="overflow-hidden bg-white rounded-sm sm:rounded-lg mt-6 border-2">
          <div className="flex justify-between items-center">
            <div className="pl-4 py-5 sm:pl-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Booking Information</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Your preferences and requirements.</p>
            </div>
          </div>
          
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Total Estimated Cost</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">₹{data.totalCost}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Number of {data.product.priceMetric}s</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{data.metricQuantity}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Booking Preference</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{parseBookingType(data.type)}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Selected Slot</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {new Timestamp(data.selectedSlot.seconds, data.selectedSlot.nanoseconds).toDate().toLocaleDateString()}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{parseBookingStatus(data.status)}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Date of Creation</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {new Timestamp(data.createdAt.seconds, data.createdAt.nanoseconds).toDate().toLocaleDateString()}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {
          data.customInputs.length > 0 &&
          (
            <div className="overflow-hidden bg-white rounded-sm sm:rounded-lg mt-6 border-2">
              <div className="flex justify-between items-center">
                <div className="pl-4 py-5 sm:pl-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Aditional Specifications</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">Customizations specified by {data.org.name}.</p>
                </div>
              </div>

              <div className="border-t border-gray-200">
                <dl>
                  {customFields}
                </dl>
              </div>
            </div>
          )
        }
      </div>
    </>
  );
}

// return the Home page wrapped in the Layout component
BookingDetails.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
}

export default BookingDetails