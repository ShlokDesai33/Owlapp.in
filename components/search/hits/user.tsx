import Link from 'next/link'
import Image from 'next/image'
import blueCheck from '../../../public/images/blue-check.svg'

export default function UserHit({ hit }: { hit: any }) {
  // TODO: render organizations
  if (hit.logo && hit.name) return <></>

  return (
    <Link href={`/${hit.objectID}/profile`} passHref>
      <button className="w-post-element py-7 px-8 mb-10 mx-10 rounded-xl shadow-post-shadow border-2 border-white hover:border-primary hover:shadow-none">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src={hit.image}
              alt="Profile Picture"
              width={60}
              height={60}
              className="rounded-full"
            />

            <div className="w-min ml-3 mr-5 text-left">
              <h5 className="truncate">{hit.fullname}</h5>
              <p className="text-gray-text truncate">@{hit.objectID}</p>
            </div>

            { hit.status === 'verified' &&
              (
                <Image
                  src={blueCheck}
                  width={32}
                  height={32}
                  alt="Verified Check"
                />
              )
            }
          </div>

          <div className="px-6 py-2 bg-gray-bg rounded-full">
            <h6>User</h6>
          </div>
        </div>

        <hr className="border-t-2 mt-6"/>

        <div className="flex items-centre justify-between mt-4">
          <div className="flex items-center">
            <h6 className="text-gray-text">Rank:{' '}{hit.rank}</h6>
            <div className="mx-4 w-2 h-2 rounded-full bg-gray-btn"></div>
            <h6 className="text-gray-text">Followers:{' '}{hit.rank}</h6>
          </div>
        </div>
      </button>
    </Link>
  );
}