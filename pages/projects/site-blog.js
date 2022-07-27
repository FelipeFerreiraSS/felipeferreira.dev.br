import Image from 'next/image'
import Link from 'next/link'

import { MainPost, PostData, Post, Thumbnail } from '../blog/styles'

import Youtube from '../../components/Youtube'
import Date from '../../components/Date'
import TextStyle from '../../components/TextStyle'
import Code from '../../components/Code'
import ImagePost from '../../components/ImagePost'
import QuoteCode from '../../components/QuoteCode'
import Head from 'next/head.js'


const SiteBlog = () => {
  return (
    <MainPost>
        <Head>
            <title>Felipe Ferreira</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/Component.svg" />
        </Head>
      <div>
        <Thumbnail>
          <img src="/projectsImg.svg" alt="thumbnail"/>
        </Thumbnail>
        <h1>Teste</h1>
        <PostData>
            <Date dateString='2022-07-27' />
            <span>🕐 3 min de leitura</span>
        </PostData>
        <Post>
          <h2>teste</h2>
          <p>sjvjsvbdjh</p>

        </Post>
      </div>
    </MainPost>
  )
}

export default SiteBlog