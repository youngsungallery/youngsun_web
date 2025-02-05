import "@/assets/scss/style.scss"

export const metadata = {
  title: "영선갤러리 사이트 만들기",
  description: "next.js로 사이트 만드는 연습을 진행하는 공간입니다. 자료가 수시로 바뀔 수 있습니다.",
  keywords: ["넥스트", "next.js"]
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <link rel="icon" type="image/svg+xml" href="favicon.svg" />
      <body>
        {children}
      </body>
    </html>
  );
}
