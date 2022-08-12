import { useRef } from 'react'
import Layout from '../../components/layout/layout'
import type { NextPageWithLayout } from '../../typescript/nextpage'
import { useRouter } from 'next/router';
import Head from 'next/head';
import Spinner from '../../components/states/spinner';
import { useState } from 'react';
import { Info } from 'phosphor-react';

/**
 * Allows the user to create a new forum
 * @returns {NextPageWithLayout} next page with layout
 */
const CreateForum: NextPageWithLayout = () => {
  // 3 states - requesting, error, default
  const [state, setState] = useState('default');
  // declare refs and get user data
  const titleRef = useRef<HTMLInputElement>(null);
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
    if (!titleRef.current?.value || !rankRef.current) {
      alert('Please fill in the title field.');
      return;
    };

    const title = titleRef.current.value;
    let rank: string | number = rankRef.current.value || '0';

    // check if rank is a number
    try {
      rank = parseInt(rank);
      if (isNaN(rank)) throw new Error('not a number');
    } catch (e) {
      // replace with alert if rank is not a number
      alert('Minimum rank must be a valid number.');
      return;
    }

    // set requesting to firestore true
    setState('requesting');

    // redirect to forum page
    // router.push(`/view/${'TODO'}/forum`);
  }

  switch(state) {
    case 'requesting':
      return (
        <>
          <Head>
            <title>Create Forum | Owl</title>
            <meta name="description" content="Create a forum on Owl"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            <meta name="keywords" content="Owl, Forum, Create, Topic, Rank"></meta>
            <meta name="author" content="Owl"></meta>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <div className="flex w-full h-full items-center justify-center gap-x-4">
            <Spinner />
            <h5>Creating forum</h5>
          </div>
        </>
      )
    default:
      return (
        <>
          <Head>
            <title>Create Forum | Owl</title>
            <meta name="description" content="Create a forum on Owl"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            <meta name="keywords" content="Owl, Forum, Create, Topic, Rank"></meta>
            <meta name="author" content="Owl"></meta>
            <link rel="icon" href="/favicon.ico" />
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
                  They are a place to <span className="text-primary">discuss and forum</span>{' '}
                  on a topic of your choice.
                  They also serve as a means to <span className="text-primary">ask questions</span>{' '}
                  on a specific resource and <span className="text-primary">get help</span>.
                  To do so, you can link a forum to a resource to notify its manager.
                </h5>
                <h5 className="text-gray-text mt-8">
                  To create a forum, simply enter a title and a minimum rank requirement (optional).
                </h5>
              </div>

              <div className="w-3/5">
                <form noValidate role="form">
                  <h5>Enter your forum title/topic:</h5>
                  <input
                    ref={titleRef}
                    type="text"
                    placeholder="Enter forum title..."
                    className="input-field mb-8"
                    autoFocus={true}
                  />
                  <h5>Minimum rank to participate:</h5>
                  <input
                    ref={rankRef}
                    type="text"
                    placeholder="0 (default)"
                    className="input-field"
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
}

// return the CreateForum page wrapped in the Layout component
CreateForum.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
}

export default CreateForum;