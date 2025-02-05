import "@/assets/scss/style.scss";

export const metadata = {
  title: "영선갤러리",
  description: "안녕하세요. 영선갤러리입니다.",
  keywords: ["넥스트", "next.js", "영선갤러리", "갤러리", "미술갤러리"],
  generator: "Visual Studio Code",
};

export default function RootLayout({ children }) {
    return (
        <html lang="ko">
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
            <body>
                {children}
            </body>
        </html>
    );
}
