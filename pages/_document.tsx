import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Cocktail</title>
        <meta
          name="description"
          content="다양한 칵테일 종류를 확인하고, 취향에 맞는 칵테일을 추천 받을 수 있는 앱"
        />
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, user-scable=yes"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
