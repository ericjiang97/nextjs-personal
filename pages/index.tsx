import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'


import HeroBanner from '../components/HeroBanner'
import Footer from '../components/Footer'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeroBanner />
      <main>
        <div className="pt-10 sm:pt-16 lg:pt-8 lg:pb-0 lg:overflow-hidden">
          <div className="mx-auto max-w-7xl lg:px-8">
            <h1 className="text-3xl font-bold">
              Deez nuts
            </h1>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Home
