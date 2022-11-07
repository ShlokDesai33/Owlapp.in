import { MapPin, Tag } from 'phosphor-react'
import Image from 'next/image'
import Link from 'next/link'

export default function GridCell({ resource }: { resource: any }) {
  return (
    <div className="bg-gray-bg p-4 rounded-md">
      <Link href={`/${resource.id}/resource`} className="group">
        <div>
          <div className="relative h-96 aspect-w-1 aspect-h-1 w-full overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
            <Image
              src={resource.image}
              alt="Product image"
              layout="fill"
              objectFit="cover"
              className="h-full w-full object-cover object-center group-hover:opacity-75 rounded-md"
            />
          </div>

          <h3 className="mt-4 text-lg truncate">{resource.name}</h3>

          <div className="flex items-center mt-2 gap-x-2">
            <p className="text-lg font-medium text-gray-900">
              ₹{resource.prices.industry}
              <span className="text-gray-700 text-sm">{' /' + resource.prices.metric}</span>
            </p>

            { resource.prices.faculty !== resource.prices.industry && <Tag size={24} className="text-green-500" /> }
          </div>

          <div className="flex items-center mt-5 gap-x-2">
            <Image
              src={resource.org.logo}
              width={32}
              height={32}
              className="h-full w-full object-cover object-center rounded-full shrink-0"
            />

            <h3 className="text-sm text-gray-700 truncate">{resource.org.name}</h3>
          </div>

          <div className="flex items-center mt-3 gap-x-1 mb-2">
            <MapPin size={24} className="text-gray-700" />
            <h3 className="text-sm text-gray-700 truncate">Manipal, Karnataka</h3>
          </div>
        </div>
      </Link>
    </div>
  )
}