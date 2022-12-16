import { parseISO } from 'date-fns'
import { GetServerSideProps } from 'next'
import { parseBody } from 'next/dist/server/api-utils/node'
import { CheckCircle, Pencil, Warning } from 'phosphor-react'
import Layout from '../../../../../components/layout/auth'
import useSessionStorage from '../../../../../hooks/useSessionStorage'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Spinner from '../../../../../components/lib/spinner'

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

const SubmitRentForm = ({ productID, booking }: { productID: string, booking: any }) => {
  const [state, setState] = useState<String>('default');
  const router = useRouter();
  // save booking to session storage
  useSessionStorage(booking);

  useEffect(() => {
    router.prefetch('/dashboard/' + productID + '/resource/rent/');
  }, [])

  if (state === 'loading') {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    )
  }
  else if (state === 'error') {
    return (
      <div className="flex flex-col gap-y-1 h-full items-center justify-center">
        <Warning size={40} weight="light" className="text-red-600" />
        <p className="font-normal text-gray-700">Your booking could not be made. Please try again later.</p>
      </div>
    )
  }
  else if (state === 'success') {
    return (
      <div className="flex flex-col gap-y-1 h-full items-center justify-center">
        <CheckCircle size={40} weight="light" className="text-green-600" />
        <p className="font-normal text-gray-700">Success! Your booking was made.</p>
      </div>
    )
  }

  var customFields = <></>
  var flag = true;

  for (var key in booking) {
    if (key.startsWith('@')) {
      // remove @ from key
      var field = key.split(';')[1];
      customFields = (
        <>
          {customFields}
          <div className={`bg-${flag ? 'gray-50' : 'white'} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
            <dt className="text-sm font-medium text-gray-500">{field}</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {Array.isArray(booking[key]) ? booking[key].join(', ') : booking[key]}
            </dd>
          </div>
        </>
      )
      flag = !flag;
    }
  }
  
  return (
    <div className="pb-6">
      <div className="overflow-hidden bg-white rounded-sm sm:rounded-lg mt-6 border-2">
        <div className="flex justify-between items-center">
          <div className="pl-4 py-5 sm:pl-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">General Information</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Product and Organization details.</p>
          </div>

          <button className="mr-4 sm:mr-6" type="button" onClick={e => {
            e.preventDefault();
            router.replace('/dashboard/' + productID + '/resource/rent/');
          }}>
            <Pencil className="h-8 w-8 text-gray-400 hover:text-gray-500" />
          </button>
        </div>

        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Product Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{booking.productName}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Product ID</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">@{productID}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Organization Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{booking.orgName}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Organization ID</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">@{booking.orgID}</dd>
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

          <button className="mr-4 sm:mr-6" type="button" onClick={e => {
            e.preventDefault();
            router.replace('/dashboard/' + productID + '/resource/rent/');
          }}>
            <Pencil className="h-8 w-8 text-gray-400 hover:text-gray-500" />
          </button>

        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Number of {booking.productMetric}s</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{booking.metricQuantity}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Booking Preference</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{parseBookingType(booking.bookingType)}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Selected Slot</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{parseISO(booking.selectedSlot).toDateString()}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="overflow-hidden bg-white rounded-sm sm:rounded-lg mt-6 border-2">
        <div className="flex justify-between items-center">
          <div className="pl-4 py-5 sm:pl-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Aditional Specifications</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Custom fields generated by {booking.orgName}.</p>
          </div>

          <button className="mr-4 sm:mr-6" type="button" onClick={e => {
            e.preventDefault();
            router.replace('/dashboard/' + productID + '/resource/rent/');
          }}>
            <Pencil className="h-8 w-8 text-gray-400 hover:text-gray-500" />
          </button>
          
        </div>
        <div className="border-t border-gray-200">
          <dl>
            {customFields}
          </dl>
        </div>
      </div>

      <button
          type="button"
          className="flex justify-center items-center gap-x-1 w-full mt-6 rounded-md border border-green-500 bg-white px-4 py-2 text-base font-medium text-green-500 hover:bg-gray-50"
          onClick={e => {
            e.preventDefault();
            setState('loading');
            // add product id to booking
            booking.productID = productID;
            
            fetch('/api/resource/rent', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(booking)
            })
              .then(res => {
                if (!res.ok) {
                  setState('error');
                }
                else {
                  setState('success');
                  // redirect to /dashboard
                  router.replace('/dashboard');
                }
              })
              .catch(err => {
                setState('error');
              });
          }}
        >
          Confirm Booking
          <CheckCircle className="h-5 w-5" />
        </button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, query } = context;
  const { id } = query;
  
  if (req.method !== 'POST') {
    return {
      redirect: {
        destination: '/dashboard' + id + '/resource/rent',
        permanent: false
      }
    }
  }

  const body = await parseBody(req, '10mb');

  return {
    props: {
      productID: id,
      booking: body,
    },
  }
}

// return the SubmitRentForm page wrapped in the Layout component
SubmitRentForm.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
}

export default SubmitRentForm;