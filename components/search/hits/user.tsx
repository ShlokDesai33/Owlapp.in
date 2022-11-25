import Link from 'next/link'
import Image from 'next/image'
import blueCheck from '../../../public/images/blue-check.svg'

export default function UserHit({ hit }: { hit: any }) {
  return (
    <Link href={`/${hit.objectID}/profile`} passHref>
      <div className="group bg-gray-100 pt-8 pb-6 px-3 rounded-md">
        <div className="flex justify-center">
          <Image
            height={150}
            width={150}
            src={hit.image || hit.logo}
            alt={hit.name}
            className="h-full w-full object-cover object-center group-hover:opacity-75 rounded-full"
          />
        </div>

        <div className="flex items-center mt-5 gap-x-3">
          <div>
            <p className="text-lg font-medium text-gray-900">{hit.fullname || hit.name}</p>
            <h3 className="text-sm text-gray-700 truncate">@{hit.objectID}</h3>
          </div>

          {hit.status === 'verified' && (
            <Image
              src={blueCheck}
              alt="Verified"
              width={25}
              height={25}
              className="rounded-full shrink-0"
            />
          )}
        </div>
      </div>
    </Link>
  );
}