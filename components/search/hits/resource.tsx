import Image from "next/image"
import Link from "next/link"
import { Tag } from "phosphor-react"

export default function ResourceHit({ hit }: { hit: any }) {
  return (
    <Link href={`/${hit.objectID}/resource`}>
      <div className="group bg-gray-100 p-3 rounded-md">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
          <Image
            layout="fill"
            src={hit.image}
            alt={hit.name}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </div>

        <div className="flex items-center mt-4 gap-x-2">
          <Image
            src={hit.org.logo}
            alt={hit.org.name}
            width={30}
            height={30}
            className="rounded-full"
          />
          <p className="text-sm text-gray-700 truncate">{hit.org.name}</p>
        </div>

        <h3 className="mt-1 text-lg font-medium text-gray-900">{hit.name}</h3>

        <div className="flex items-center mt-2 gap-x-2">
          <p className="text-lg font-medium text-gray-900">
            ₹{hit.prices.industry}
            <span className="text-gray-700 text-sm">{' /' + hit.prices.metric}</span>
          </p>

          { hit.prices.faculty !== hit.prices.industry && <Tag size={24} className="text-green-500" /> }
          {/* <Sparkle size={24} className="text-secondary" /> */}
        </div>
      </div>
    </Link>
  )
}