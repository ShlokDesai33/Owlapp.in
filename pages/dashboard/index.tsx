import Head from 'next/head'
import Link from 'next/link'
import { Calendar, CheckCircle, HourglassMedium, ThumbsUp, Warning, X } from 'phosphor-react'
import Layout from '../../components/layout/auth'
import Spinner from '../../components/lib/spinner'
import useBookingsInf from '../../hooks/useBookingsInf'
import useSession from '../../hooks/useSession'
import type { NextPageWithLayout } from '../../typescript/nextpage'
import Image from 'next/image'
import blueCheck from '../../public/images/blue-check.svg'
import formatRelative from 'date-fns/formatRelative'
import { Timestamp } from 'firebase/firestore'
import { format } from 'date-fns'

const Booking = ({ booking }: { booking: any }) => {  
  return (
    <Link href={`/dashboard/bookings/${booking.id}`} passHref>
      <li className="py-6 px-6 rounded-xl shadow-post-shadow border-2 border-white border-wbookinge hover:border-primary hover:shadow-none will-change-scroll hover:cursor-pointer">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src={booking.org.image}
              alt="profile pic"
              width={35}
              height={35}
              className="rounded-full"
            />
            <h6 className="ml-1 overflow-hidden truncate mr-1 text-base">{booking.org.name}</h6>
            <Image
              src={blueCheck}
              width={20}
              height={20}
              alt="Verified Check"
            />
          </div>

          {
            booking.status === 'pending' && (
              <div className="flex items-center gap-x-1 text-yellow-500 bg-yellow-100/70 rounded-full px-3 py-1">
                <HourglassMedium size={24} />
                <p>Pending Approval</p>
              </div>
            )
          }
          {
            booking.status === 'approved' && (
              <div className="flex items-center gap-x-1 text-primary bg-blue-100/70 rounded-full px-3 py-1">
                <ThumbsUp size={24} />
                <p>Confirmed</p>
              </div>
            )
          }
          {
            booking.status === 'complete' && (
              <div className="flex items-center gap-x-1 text-green-500 bg-green-100/70 rounded-full px-3 py-1">
                <CheckCircle size={24} />
                <p>Completed</p>
              </div>
            )
          }
          {
            booking.status === 'cancelled' && (
              <div className="flex items-center gap-x-1 text-red-500 bg-red-100/70 rounded-full px-3 py-1">
                <X size={24} />
                <p>Cancelled</p>
              </div>
            )
          }
        </div>
            
        <div className="flex items-center mt-3 text-lg truncate">
          <h5>{booking.product.name}</h5>
        </div>

        <hr className="border-t-2 mt-3"/>

        <div className="flex items-centre justify-between mt-3">
          <h6 className="text-base">
            <span className="text-gray-text">Selected Slot:{' '}</span>
            {
              format(
                new Timestamp(
                  booking.selectedSlot.seconds,
                  booking.selectedSlot.nanoseconds
                ).toDate(),
                'MMMM dd, yyyy'
              )
            }
          </h6>
          <h6 className="text-base">
            {
              formatRelative(
                new Timestamp(
                  booking.createdAt.seconds, 
                  booking.createdAt.nanoseconds
                ).toDate(), 
                new Date()
              )
            }</h6>
        </div>
      </li>
    </Link>
  )
}

const Dashboard: NextPageWithLayout = () => {
  const { user } = useSession();
  const { data, error, size, setSize } = useBookingsInf(user ? user.id : null);

  const isLoadingMore = (!data && !error) || (size > 0 && data && typeof data[size - 1] === "undefined");
  
  if (error) return (
    <div className="flex flex-col gap-y-1 items-center pt-12">
      <Warning size={40} weight="light" className="text-red-600" />
      <p className="font-normal text-gray-700">An error occured. Please try again later.</p>
    </div>
  );
  else if (!data) return (
    <div className="flex justify-center mt-20">
      <Spinner />
    </div>
  )
  else if (data && data[0].length === 0) return (
    <div className="flex flex-col gap-y-1 items-center pt-12">
      <p className="font-normal text-lg">You have no bookings yet.</p>
      <p className="text-gray-700">
        <Link href="/search">
          <a className="text-primary hover:underline">Search</a>
        </Link>
        {' '}for what you&apos;re looking for, or{' '}
        <Link href="/explore">
          <a className="text-primary hover:underline">explore</a>
        </Link>
        {' '}our many products.
      </p>
    </div>
  )
  
  return (
    <>
      <Head>
        <title>Home | Instrumus</title>
      </Head>

      <div className="text-gray-700 mt-6 flex items-center gap-x-1">
        <Calendar size={24} />
        Your pending and completed bookings:
      </div>

      <ul className="flex flex-col mt-8 space-y-8">
        {
          data.map((arr: any[]) => {
            return arr.map((booking: any) => (
              <Booking key={booking.id} booking={booking} />
            ))
          })
        }
      </ul>

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
              className="w-full rounded-md border border-gray-500 bg-wbookinge px-4 py-2 text-base font-semibold text-gray-700 hover:bg-gray-50"
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