import Head from 'next/head'
import { Barricade } from 'phosphor-react'

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Owl</title>
      </Head>
      
      <div className="flex h-full w-full justify-center items-center gap-x-3 fixed mb-20">
          <Barricade size={70} color="#BE6CFF" weight="light" />
        <h3 className="font-normal">Comming Soon!</h3>
      </div>
    </>
  )
}