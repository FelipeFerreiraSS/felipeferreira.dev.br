import GlobalStyle from '../styles/globals.js'
import { ThemeProvider } from 'styled-components'

const theme = {
  colors: {
    background: '#121212',
    backgroundContrast: '#161616',
    border: '#4D4D4D',
    link: '#3694FF',
    gray: '#666666',
    text: '#F5F5F5',
    blue: '#0072F5',
    green: '#17C964',
    red: '#F31260',
  },
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp
