import '../styles/globals.scss';  // 기존 global 스타일 임포트
import '../styles/Header.scss';   // Header.scss를 여기서 임포트

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;