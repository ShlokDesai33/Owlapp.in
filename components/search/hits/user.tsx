import Link from 'next/link'
import Image from 'next/image'
import blueCheck from '../../../public/images/blue-check.svg'
import { Medal } from 'phosphor-react';

export default function UserHit({ hit }: { hit: any }) {
  // TODO: add a link to the user's profile
  return (
    <Link href="#" passHref>
      <div className="group relative bg-gray-100 pt-8 pb-4 px-3 rounded-md will-change-scroll">
        {
          hit.status === 'verified' || hit.status === 'org'  && (
            <div className="absolute top-0 right-0 p-3">
              <Image
                src={blueCheck}
                alt="Verified"
                width={27}
                height={27}
                className="rounded-full shrink-0"
              />
            </div>
          )
        }

        <div className="flex justify-center">
          <Image
            height={150}
            width={150}
            src={hit.image || hit.image}
            alt={hit.name}
            className="h-full w-full object-cover object-center group-hover:opacity-75 rounded-full"
          />
        </div>

        <div className="flex items-center mt-5 gap-x-3">
          <div className="shrink overflow-hidden">
            <p className="text-lg font-medium text-gray-900 truncate">{hit.name || hit.name}</p>
            <h3 className="text-sm text-gray-700 truncate">@{hit.objectID}</h3>
          </div>
        </div>

        <hr className=" border-gray-300 mt-3"/>

        <div className="flex items-center justify-between gap-x-3 mt-2 text-gray-700">
          <p>{hit.followers} Followers</p>
          <p className="flex items-center">{hit.rank} <span><Medal size={30} className="w-6 h-6" /></span></p>
        </div>
      </div>
    </Link>
  );
}