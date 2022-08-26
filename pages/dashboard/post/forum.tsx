import { useRef } from 'react'
import Layout from '../../../components/layout/auth'
import type { NextPageWithLayout } from '../../../typescript/nextpage'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Spinner from '../../../components/lib/spinner'
import { useState } from 'react'
import { Info } from 'phosphor-react'
import useSession from '../../../hooks/useSession'
import SearchResources from '../../../components/forum/create/search'
import { InstantSearch } from 'react-instantsearch-hooks-web'
import searchClient from '../../../components/search/client'

/**
 * Allows the user to create a new forum
 * @returns {NextPageWithLayout} next page with layout
 */
const PostForum: NextPageWithLayout = () => {
  const { user } = useSession();
  // 3 states - requesting, error, default
  const [state, setState] = useState<'default' | 'requesting' | 'error'>('default');
  // declare refs and get user data
  const topicRef = useRef<HTMLInputElement>(null);
  const rankRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  /**
   * Sends a new forum to the firebase
   * @param e {Event}
   * @returns {void}
   */
  async function sendPost(e: React.FormEvent) {
    e.preventDefault();
    // theoretically, this condition will always be false
    if (!topicRef.current?.value || !rankRef.current) {
      alert('Please fill in the forum topic/title field.');
      return;
    };

    const topic = topicRef.current.value;
    let minRank: string | number = rankRef.current.value || '0';

    if (topic.length > 100) {
      alert('Title/topic must be less than 100 characters.');
      return;
    }

    if (minRank.length > 3) {
      alert('Rank must be less than 1000.');
      return;
    }

    // check if rank is a number
    try {
      minRank = parseInt(minRank);
      if (isNaN(minRank)) throw new Error('not a number');
    } catch (e) {
      // replace with alert if rank is not a number
      alert('Minimum rank must be a valid number.');
      return;
    }

    // set requesting to firestore true
    setState('requesting');

    const res = await fetch("/api/forum/post", {
      method: 'POST',
      body: JSON.stringify(
        {
          topic,
          minRank,
          creator: {
            // user is not null during request
            id: user?.id,
            fullname: user?.fullname,
            image: user?.image,
            status: user?.status
          },
        }
      ),
      headers: { "Content-Type": "application/json" }
    });

    if (res.status === 201) {
      // redirect to forum page
      router.push(`/${res.headers.get('id')}/forum`);
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
          <title>Create Forum | Owl</title>
        </Head>

        <div className="flex w-full h-full items-center justify-center gap-x-4">
          <Spinner />
          { user &&
            <h5>Creating forum</h5>
          }
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Create Forum | Owl</title>
      </Head>

      <main className="pt-12 px-12">
        <div className="flex gap-x-20">
          <div className="flex flex-col w-2/5">
            <div className="flex items-center border-b-2 pb-5">
              <Info size={30} className="text-secondary"/>
              <h3 className="font-normal ml-2">What is a forum?</h3>
            </div>

            <h5 className="text-gray-text mt-8">
              Forums in Owl exist to foster science communication and collaboration. 
              They are a place to <span className="text-primary">discuss and debate</span>{' '}
              on a topic of your choice.
              They also serve as a means to <span className="text-primary">ask questions</span>{' '}
              on a specific resource and <span className="text-primary">get help</span>.
              To do so, you can link a forum to a resource to notify its manager.
            </h5>
            <h5 className="text-gray-text mt-8">
              To create a forum, simply enter a topic and a minimum rank requirement (optional).
            </h5>
          </div>

          <div className="w-3/5">
            { state === 'error' &&
              (
                <h5 className="w-full text-center text-red-500 mb-6">An error occured. Please try again later.</h5>
              )
            }

            <form noValidate role="form">
              <h5>Enter your forum&apos;s topic/title:</h5>
              <input
                ref={topicRef}
                type="text"
                placeholder="Enter forum topic/title..."
                className="input-field mb-8"
                autoFocus={true}
                maxLength={100}
              />
              <h5>Minimum rank to participate:</h5>
              <input
                ref={rankRef}
                type="text"
                placeholder="0 (default)"
                className="input-field mb-8"
                maxLength={3}
              />
            </form>

            {/* @ts-ignore */}
            <InstantSearch searchClient={searchClient} indexName="forums">
              <SearchResources />
            </InstantSearch>

            <div className="flex justify-center w-full mt-10">
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

// return the PostForum page wrapped in the Layout component
PostForum.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
}

export default PostForum