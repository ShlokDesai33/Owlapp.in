import Head from 'next/head'
import Layout from '../../../../../components/layout/auth'
import type { NextPageWithLayout } from '../../../../../typescript/nextpage'
import { useRouter } from 'next/router'
import useResource from '../../../../../hooks/useResource'
import Spinner from '../../../../../components/lib/spinner'
import useParam from '../../../../../hooks/useParam'
import TextField from '../../../../../components/resource/fields/text'
import CheckboxField from '../../../../../components/resource/fields/checkbox'
import RadioField from '../../../../../components/resource/fields/radio'
import Calendar from '../../../../../components/resource/calendar'
import { ArrowRight, Warning } from 'phosphor-react'
import { parseISO, startOfToday } from 'date-fns'
import { useEffect, useState } from 'react'
import useSession from '../../../../../hooks/useSession'
import useSessionStorage from '../../../../../hooks/useSessionStorage'
import { PriceContext } from '../../../../../components/resource/context'

const RentResource: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  let booking = useSessionStorage(id as string);

  const { product, error: prodError } = useResource(id as string);
  const { user } = useSession();

  const { data: inputFields, error: inputFieldsError } = useParam(
    'custom_input',
    id as string,
    product ? product.fields.custom_input : null
  );
  
  const [selectedDay, setSelectedDay] = useState<Date>(
    booking ? parseISO(booking.selectedSlot) : startOfToday()
  );

  const [price, setPrice] = useState<number>(booking ? booking.totalPrice : -1);
  const [metricQuantity, setMetricQuantity] = useState<number>(booking ? booking.metricQuantity : 1);

  useEffect(() => {
    if (product && user && price === -1) {
      if (user.email.endsWith('@manipal.edu'))
        setPrice(product.prices.faculty || product.prices.industry);
      else
        setPrice(product.prices.industry);
    }
  }, [product, user, price]);

  const [loading, setLoading] = useState<boolean>(false);

  if (!product || !user || loading || (!inputFields && !inputFieldsError && product.fields.custom_input > 0)) {
    return (
      <>
        <Head>
          <title>Book Resource | Instrumus</title>
        </Head>
        
        <div className="flex h-full items-center justify-center">
          <Spinner />
        </div>
      </>
    )
  }
  else if (prodError || inputFieldsError) {
    return (
      <>
        <Head>
          <title>Book Resource | Instrumus</title>
        </Head>

        <div className="flex flex-col gap-y-1 h-full items-center justify-center">
          <Warning size={40} weight="light" className="text-red-600" />
          <p className="font-normal text-gray-700">An error occured. Please try again later.</p>
        </div>
      </>
    )
  }

  if (product.status !== 'Available') {
    return (
      <>
        <Head>
          <title>Book {product.name} | Instrumus</title>
        </Head>

        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">This resource is not available to book</h1>
            <p className="text-gray-500">Please contact the admin for more information</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Book {product.name} | Instrumus</title>
      </Head>

      <div className="absolute right-0 bottom-0 m-4 bg-white p-6 rounded-md border-2 border-gray-100">
        Total Price: ₹{price}
      </div>

      <form
        action={`/dashboard/${product.id}/resource/rent/submit`}
        className="pt-6 pb-10"
        method="POST"
        onSubmit={() => {
          setTimeout(() => {
            setLoading(true);
          }, 500);
        }}
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-800 truncate max-w-3xl">Book {product.name}</h1>
          <p className="text-gray-800">Base price is{' '}
            <span className="text-indigo-500 font-semibold">
              ₹{product.prices.industry} per {product.prices.metric}
            </span>
            {' '}
            <span className="text-gray-600">
              (Disclaimer: this price is subject to additional charges/discounts and is not final)
            </span>
          </p>
        </div>

        <div className="border-b-2 pb-2 mt-6 mb-4 border-gray-300 text-gray-500">
          Please fill in all required fields below
        </div>

        <label htmlFor="first-name" className="block text-sm font-medium text-gray-900">
          Enter the number of {product.prices.metric}s you need:
        </label>
        <input
          type="number"
          name="metricQuantity"
          id="metricQuantity"
          required
          defaultValue={booking ? booking.metricQuantity : 1}
          className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Type here..."
          onChange={(e) => {
            if (e.target.valueAsNumber < 1) {
              e.target.value = '1';
            }
          }}
          onBlur={(e) => {
            if (user.email.endsWith('@manipal.edu')) {
              const sampleCost = product.prices.faculty || product.prices.industry;
              const diff = price - (sampleCost * metricQuantity);
              setPrice(sampleCost * e.target.valueAsNumber + diff);
              setMetricQuantity(e.target.valueAsNumber);
            }
            else {
              const sampleCost = product.prices.industry;
              const diff = price - (sampleCost * metricQuantity);
              setPrice(sampleCost * e.target.valueAsNumber + diff);
              setMetricQuantity(e.target.valueAsNumber);
            }
          }}
          onKeyDown={(e) => {
            if (['Enter', 'NumpadEnter'].includes(e.key)) {
              // prevent form submission
              e.preventDefault();
              e.stopPropagation();
            }
          }}
        />

        <label htmlFor="first-name" className="block text-sm font-medium text-gray-900 mt-4">
          Choose a form of booking:
        </label>
        <select
          name="bookingType"
          id="bookingType"
          required
          onKeyDown={(e) => {
            if (['Enter', 'NumpadEnter'].includes(e.key)) {
              // prevent form submission
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mb-6"
        >
          <option value="visit" selected={booking ? booking.bookingType === 'visit' : false}>
            I rather visit in person to perform my own test
          </option>
          <option value="shipment" selected={booking ? booking.bookingType === 'shipment' : false}>
            I rather send a parcel containing my sample (if any)
          </option>
        </select>

        <PriceContext.Provider value={{ price, setPrice }}>
          {
            product.fields.custom_input > 0 && (
              <>
                <div className="grid lg:grid-cols-2 gap-6">
                  {inputFields.map((field: any) => {
                    if (field.type === 'text') {
                      return (
                        <TextField
                          id={field.id}
                          title={field.title}
                          isRequired={field.isRequired}
                          key={field.title}
                          defaultValue={booking ? booking['@' + field.id + ';' + field.title] : ''}
                        />
                      )
                    }
                    else if (field.type === 'checkbox') {
                      return (
                        <CheckboxField
                          id={field.id}
                          title={field.title}
                          options={field.content}
                          isRequired={field.isRequired}
                          key={field.title}
                          defaultValue={booking ? booking['@' + field.id + ';' + field.title]: []}
                        />
                      )
                    }
                    else {
                      return (
                        <RadioField
                          id={field.id}
                          title={field.title}
                          options={field.content}
                          isRequired={field.isRequired}
                          key={field.title}
                          defaultValue={booking ? booking['@' + field.id + ';' + field.title] : ''}
                        />
                      )
                    }
                  })}
                </div>
              </>
            )
          }
        </PriceContext.Provider>

        <div className="border-b-2 pb-2 my-8 border-gray-300 text-gray-500">
          Please select the date your sample arrives by (estimate)
        </div>

        <Calendar
          org={product.org.name}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
        />
        
        <input type="text" value={selectedDay.toISOString()} onChange={() => {}} name="selectedSlot" className="hidden" hidden />
        <input type="number" value={price} onChange={() => {}} name="totalPrice" className="hidden" hidden />

        <input type="text" defaultValue={product.name} name="productName" className="hidden" hidden />
        <input type="text" defaultValue={product.prices.metric} name="productMetric" className="hidden" hidden />

        <input type="text" defaultValue={user.id} name="userID" className="hidden" hidden />
        <input type="text" defaultValue={user.name} name="userName" className="hidden" hidden />
        <input type="text" defaultValue={user.image} name="userImage" className="hidden" hidden />

        <input type="text" defaultValue={product.org.id} name="orgID" className="hidden" hidden />
        <input type="text" defaultValue={product.org.name} name="orgName" className="hidden" hidden />
        <input type="text" defaultValue={product.org.image} name="orgImage" className="hidden" hidden />

        <input type="text" defaultValue={product.admin.id} name="adminID" className="hidden" hidden />
        <input type="text" defaultValue={product.admin.name} name="adminName" className="hidden" hidden />
        <input type="text" defaultValue={product.admin.email} name="adminEmail" className="hidden" hidden />
        <input type="text" defaultValue={product.admin.cell} name="adminCell" className="hidden" hidden />

        <button
          type="submit"
          className="flex justify-center items-center gap-x-1 w-full mt-10 rounded-md border border-primary bg-white px-4 py-2 text-base font-semibold text-gray-700 hover:bg-gray-50"
        >
          Next
          <ArrowRight className="h-5 w-5" />
        </button>
      </form>
    </>
  )
}

// return the Home page wrapped in the Layout component
RentResource.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
}

export default RentResource