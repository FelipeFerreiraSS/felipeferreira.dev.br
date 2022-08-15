import Head from 'next/head.js'

export default function HeadTag({title, description}) {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="icon" href="/Component.svg" />
        </Head>
    )
}