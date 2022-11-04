import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@200;300;400;500;600;700&family=Roboto:wght@100&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body
        className={`${
          process.env.NODE_ENV === 'development' && 'debug-screens'
        }`}
      >
        <div
          className="absolute h-full w-full"
          style={{
            background:
              'linear-gradient(85.17deg, rgba(93, 181, 234, 0.15) 0%, rgba(95, 77, 255, 0.15) 56.39%, rgba(227, 23, 146, 0.15) 110.48%)',
          }}
        ></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
