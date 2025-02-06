import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="ko">
                {/* 파비콘 링크 추가 */}
                <link rel="icon" href="/favicon.png" />
                <Head>
                {/* 구글 폰트 Noto Sans KR 불러오기 */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700&display=swap"
                    rel="stylesheet"
                />
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