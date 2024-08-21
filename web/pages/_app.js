import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/react';

import Navbar from '../components/NavBar'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }) {
  return (
    <> 
      <Navbar />
      <Component {...pageProps} />
      <Footer />
      <Analytics />
    </>
  )
}

export default MyApp
