import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import type { Comment } from '../.././../typescript/interfaces/forum'

type Props = {
  comment: Comment
  userId: string
}

/**
 * Returns an comment to be rendered by a page
 * @param comment the comment to be rendered
 * @returns {JSX.Element} an comment
 */
export default function Comment({ comment, userId }: Props) {
  const className: string = comment.creator.id === userId ? "flex justify-end pr-8 mb-8" : "flex pl-8 mb-8"
  const [expand, setExpand] = useState(false);
  if (!expand) {
    return (
      <div className={className}>
        <div className="flex flex-col w-full border-2 p-6 rounded-xl max-w-md">
          <button className="w-fit">
            <Link href={`/view/${comment.creator.id}/profile`} passHref>
              <div className="flex items-center">
                <Image
                  className="rounded-full"
                  width={30}
                  height={30}
                  src={comment.creator.image}
                  alt="Profile Img"
                />

                <p className="ml-2 mr-2 overflow-hidden truncate">{comment.creator.fullname}</p>
                <p className="text-gray-text overflow-hidden truncate">@{comment.creator.id}</p>
              </div>
            </Link>
          </button>

          <h2 className="mt-6">{comment.title}</h2>
          <button onClick={(e) => {
            e.preventDefault();
            setExpand(true);
          }} className="w-fit">
            <p className="mt-3 text-gray-text">Read more...</p>
          </button>
          <div className="flex flex-col mt-2">
            <hr className="border-t-2"/>
            <div className="flex items-center justify-between mt-4">
              {/* <div className="flex items-center gap-x-2">
                <Medal size={30} weight="light" />
                <p>{comment.honors}</p>
                <div className="w-2 h-2 bg-gray-bg rounded-full mx-2"></div>
                <Lightning size={30} weight="light" />
                <p>{comment.parleys}</p>
              </div> */}

              <button className="text-base border-2 py-1 px-6 rounded-full border-gray-btn hidden">Offer Parley</button>
              <p>{new Date(comment.timestamp.seconds * 1000).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div> 
    )
  }
  else {
    return (
      <div className={className}>
        <div className="flex flex-col w-full border-2 p-6 rounded-xl max-w-md">
          <button className="w-fit">
            <Link href={`/view/${comment.creator.id}/profile`} passHref>
              <div className="flex items-center">
                <Image
                  className="rounded-full"
                  width={30}
                  height={30}
                  src={comment.creator.image}
                  alt="Profile Img"
                />
    
                <p className="ml-2 mr-2 overflow-hidden truncate">{comment.creator.fullname}</p>
                <p className="text-gray-text overflow-hidden truncate">@{comment.creator.id}</p>
              </div>
            </Link>
          </button>

          <h2 className="mt-6">{comment.title}</h2>
          <h2 className="mt-3">{comment.body}</h2>
          <button onClick={(e) => {
            e.preventDefault();
            setExpand(false);
          }} className="w-fit">
            <p className="mt-3 text-gray-text">Read less...</p>
          </button>
          <div className="flex flex-col mt-2">
            <hr className="border-t-2"/>
            <div className="flex items-center justify-between mt-4">
              {/* <div className="flex items-center gap-x-2">
                <Medal size={30} weight="light" />
                <p>{comment.honors}</p>
                <div className="w-2 h-2 bg-gray-bg rounded-full mx-2"></div>
                <Lightning size={30} weight="light" />
                <p>{comment.parleys}</p>
              </div> */}

              <button className="text-base border-2 py-1 px-6 rounded-full border-gray-btn hidden">Offer Parley</button>
              <p>{new Date(comment.timestamp.seconds * 1000).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div> 
    )
  } 
}