import GlobalStyle from '../styles/globals.js'
import { ThemeProvider } from 'styled-components'
import App from 'next/app'

import Header from '../components/Header/index.js'
import Footer from '../components/Footer/index.js'


const theme = {
  colors: {
    background: '#121212',
    backgroundContrast: '#161616',
    border: '#4D4D4D',
    link: '#3694FF',
    gray: '#666666',
    text: '#F5F5F5',
    blue: '#0072F5',
    blueHover: '#3694FF',
    green: '#17C964',
    red: '#F31260',
  },
}

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
      </>
    )
  }
}

