import '../styles/globals.css'

import Navbar from '../components/NavBar'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }) {
  return (
    <> 
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default MyApp
