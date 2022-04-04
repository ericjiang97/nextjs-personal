import React from 'react'
import Head from 'next/head'

import HeroBanner from "../../components/HeroBanner";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";


interface MainLayoutProps {
    showHero?: boolean
    pageTitle?: string
}

const MainLayout : React.FC<MainLayoutProps> = ({pageTitle = "", showHero = false, children}) => {

    let _pageTitle = 'Eric Jiang'
    if(pageTitle) _pageTitle += ` - ${pageTitle}`
    
    return  <div>
      <Head>
        <title>{_pageTitle}</title>
        <meta name="description" content="Hi I'm Eric." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <NavBar/>
        {showHero && <HeroBanner />}
        <main>
            {children}
        </main>

        <Footer />
      </div>
    </div>
}

export default MainLayout