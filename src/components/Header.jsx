import React from 'react';
import Link from 'next/link'; // Link 컴포넌트를 사용하여 페이지 전환

const Header = () => {
  return (
    <div>
      {/* Skip 메뉴 */}
      <a href="#main-content" className="skip-link">스킵 메뉴</a>
      
      <header>
        <div className="container">
          <div className="logo">
            {/* Link 컴포넌트에서 a 태그를 제거하고 직접 텍스트로 링크 */}
            <Link href="/" aria-label="Youngsun Gallery 홈페이지로 이동">영선갤러리</Link>
          </div>
          <nav>
            <ul>
              <li><a href="/" aria-label="홈 페이지로 이동">전시일정</a></li>
              <li><a href="/video" aria-label="특강 페이지로 이동">특강</a></li>
              <li><a href="/artwork" aria-label="작품리스트 페이지로 이동">작품</a></li>
              <li><a href="/Historypage" aria-label="기록 페이지로 이동">기록</a></li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;