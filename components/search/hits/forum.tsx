import Link from 'next/link'
import Image from 'next/image'
import { formatRelative } from 'date-fns'
import blueCheck from '../../../public/images/blue-check.svg'
import adminCheck from '../../../public/images/admin-check.svg'

export default function ForumHit({ hit }: { hit: any }) {
  return (
    <Link href={`/${hit.objectID}/forum`} passHref>
      <div className="w-post-element py-6 px-8 mb-10 rounded-xl shadow-post-shadow border-2 border-white hover:border-primary hover:shadow-none">
        <div className="flex items-center justify-between">
          <button className="w-fit">
            <Link href={`/${hit.creator.id}/profile`} passHref>
              <div className="flex items-center">
                <Image
                  src={hit.creator.image}
                  alt="profile pic"
                  width={35}
                  height={35}
                  className="rounded-full"
                />
                <h6 className="ml-2 overflow-hidden truncate mr-2">{hit.creator.fullname}</h6>
                { hit.creator.status === 'verified' &&
                  (
                    <Image
                      src={blueCheck}
                      width={25}
                      height={25}
                      alt="Verified Check"
                    />
                  )
                }
                { hit.creator.status === 'admin' &&
                  (
                    <Image
                      src={adminCheck}
                      width={25}
                      height={25}
                      alt="Verified Check"
                    />
                  )
                }
              </div>
            </Link>
          </button>

          <div className="px-6 py-2 bg-gray-bg rounded-full">
            <h6>Forum</h6>
          </div>
        </div>
          
        <div className="flex items-center mt-3">
          <h5>{hit.topic}</h5>
        </div>

        <hr className="border-t-2 mt-5"/>

        <div className="flex items-centre justify-between mt-4">
          <h6><span className="text-gray-text">Rank Requirement:{' '}</span>{hit.minRank}</h6>
          <h6>{formatRelative(new Date(hit.lastmodified), new Date())}</h6>
        </div>
      </div>
    </Link>
  );
}