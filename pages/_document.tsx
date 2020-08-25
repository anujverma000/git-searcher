import NextDocument, { Html, Head, Main, NextScript } from "next/document";

type Props = unknown;

class Document extends NextDocument<Props> {
  render() {
    return (
      <Html>
        <Head>
          <title>Git Searcher - Anuj Verma</title>
          <meta
            key="viewport"
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
          />
          <meta
            key="description"
            name="description"
            content="Search users, repositories or issues below using github public apis"
          />
          <link rel="shortcut icon" href="/favicon.ico" key="shortcutIcon" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
