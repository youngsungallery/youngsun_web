import React, {useState} from "react";
import Link from "next/link"; // Link 컴포넌트를 사용하여 페이지 전환
import navdata from "../DB/menunav.json";

const Header = () => {
    const [show, setShow] = useState(false);

    const toggleMenu = () => {
        setShow((prevShow) => !prevShow);
    }

    return (
        <div>
            {/* Skip 메뉴 */}
            <a href="#main-content" className="skip-link">스킵 메뉴</a>
            
            {/* header */}
            <header id="header" role="banner">
                <div className="header__inner">
                    <div className="header__logo">
                        {/* Link 컴포넌트에서 a 태그를 제거하고 직접 텍스트로 링크 */}
                        <Link href="/" aria-label="Youngsun Gallery 홈페이지로 이동">영선갤러리</Link>
                    </div>
                    <nav 
                        className={`header__nav ${show ? "show" : ""}`}
                        role="navigation"
                        aria-label="메인 메뉴"
                    >
                        <ul>
                            {navdata.map((nav, key) => (
                                <li key={key}>
                                    <a href={nav.url} aria-label="홈 페이지로 이동">{nav.title}</a></li>
                            ))}
                        </ul>
                    </nav>
                    <div
                        className="header__nav__mobile"
                        id="headerToggle"
                        aria-controls="primary-menu"
                        aria-expanded={show ? "true" : "false"}
                        role="button"
                        tabIndex="0"
                        onClick={toggleMenu}
                    >
                        <span></span>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;