import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="es">
        <Head>
          <meta
            name="google-site-verification"
            content="yeI0308CdoLErPEFN5rmzS8R9mBU32RViqbydNUWxbE"
          />
          <meta name="robots" content="all" />
          <link
            href="https://fonts.googleapis.com/css2?family=Shippori+Antique&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
