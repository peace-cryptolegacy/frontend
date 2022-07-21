import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
      <link rel='preconnect' href='https://fonts.googleapis.com' />
      <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='' />
      <link href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@200;300;400;500;600;700&family=Roboto:wght@100&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <div style={{ 
          background: 'linear-gradient(180deg, #F3ECFE 0%, rgba(243, 236, 254, 0) 100%)',
          height: 400,
          left: 0,
          position: 'absolute',
          top: 0,
          width: '100%',
          zIndex: -1
        }}>
        </div>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
