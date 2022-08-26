import Head from 'next/head'
import { useRouter } from 'next/router'
import { Lightbulb } from 'phosphor-react'
import { useRef, useState } from 'react'
import Layout from '../../../../components/layout/auth'
import useSession from '../../../../hooks/useSession'
import type { NextPageWithLayout } from '../../../../typescript/nextpage'
import Spinner from '../../../../components/lib/spinner'

const PostComment: NextPageWithLayout = () => {
  const { user } = useSession();
  // 3 states - requesting, error, default
  const [state, setState] = useState<'default' | 'requesting' | 'error'>('default');
  // declare refs
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  /**
   * Posts a new comment to a forum
   * @param e {Event}
   * @returns {void}
   */
  async function sendPost(e: React.FormEvent) {
    e.preventDefault();
    // error handling
    if (!titleRef.current?.value || !bodyRef.current?.value) {
      alert('Please fill in the two required fields.');
      return;
    };

    const title = titleRef.current.value;
    const body = bodyRef.current.value;

    if (title.length > 100) {
      alert('Title must be less than 100 characters.');
      return;
    }

    if (body.length > 1000) {
      alert('Body must be less than 1000 characters.');
      return;
    }

    // set requesting to firestore true
    setState('requesting');
    
    // use the router to get the id from the url params
    const forumId = router.query.id as string;

    const res = await fetch('/api/forum/comments/post', {
      method: 'POST',
      body: JSON.stringify(
        {
          forumId,
          title,
          body,
          creator: {
            // user is not null during request
            id: user?.id,
            fullname: user?.fullname,
            image: user?.image,
            status: user?.status
          },
        }
      ),
      headers: { 'Content-Type': 'application/json' }
    });

    if (res.status === 201) {
      // redirect to forum page
      router.push(`/${forumId}/forum`);
    }
    else {
      // set error state
      setState('error');
    }
  }

  if (state === 'requesting' || !user) {
    return (
      <>
        <Head>
          <title>Post Comment | Owl</title>
        </Head>

        <div className="flex w-full h-full items-center justify-center gap-x-4">
          <Spinner />
          { user &&
            <h5>Posting your comment</h5>
          }
        </div>
      </>
    )
  } else if (state === 'error') {
    // TODO
    return <>Error</>
  }

  return (
    <>
      <Head>
        <title>Post Comment | Owl</title>
      </Head>

      <main className="pt-12 px-12">
        <div className="flex gap-x-20">
          <div className="flex flex-col w-2/5">
            <div className="flex items-center border-b-2 pb-5">
              <Lightbulb size={30} className="text-secondary"/>
              <h3 className="font-normal ml-2">Quick Tips</h3>
            </div>

            <h5 className="text-gray-text mt-8">
              A comment consists of a <span className="text-primary">title</span>{' '}
              and <span className="text-primary">body</span>.
              The title has a 100 character limit. Try to briefly summarise your argument in
              the title and use the body to elaborate in detail.
            </h5>
            <h5 className="text-gray-text mt-8">
              In the future, you be allowed to add <span className="text-primary">pictures</span>{' '} 
              and <span className="text-primary">videos</span>{' '}in the body of your comment.
              This feature is coming soon!
            </h5>
          </div>

          <div className="w-3/5">
            <form noValidate role="form">
              <h5>Enter your comment&apos;s title:</h5>
              <input
                ref={titleRef}
                type="text"
                placeholder="title"
                className="input-field mb-8"
                autoFocus={true}
                maxLength={100}
              />
              <h5>Enter your comment&apos;s body:</h5>
              <textarea
                ref={bodyRef}
                placeholder="body"
                className="input-field resize-none"
                maxLength={1000}
              />
            </form>

            <div className="flex justify-center w-full mt-12">
              <button className="px-5 py-2 bg-primary text-white rounded-xl font-bold" onClick={e => {
                sendPost(e);
              }}>
                <h5>Submit</h5>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

// return the Home page wrapped in the Layout component
PostComment.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
}

export default PostComment