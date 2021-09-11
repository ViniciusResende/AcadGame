import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link
            href='https://fonts.googleapis.com/css2?family=Inter&family=Lexend:wght@500;600&display=swap'
            rel='stylesheet'
          />

          <link rel='icon' href='/favicon.ico' />

          <meta
            name='description'
            content='Uma aplicação onde você pode se conectar aos seus amigos de academia e evoluir junto!'
          />
          <link rel='manifest' href='/manifest.json' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
