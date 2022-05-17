import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="es">
        <Head>
          <meta
            name="google-site-verification"
            content="o_S9STYPIw_XSIY00Dhrr8tjSgdAlDyTnIUoan8aD68"
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
