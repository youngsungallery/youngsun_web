import React, {useState} from "react";

const Footer = () => {
    return (
        <footer id="footer" role="contentinfo">
            <div className="footer__inner">
                <div className="footer__text">
                    <span>Youngsungallery 영선갤러리</span>
                    <span>© youngsungallery All rights reserved</span>
                </div>
                <div className="footer__info">
                    <div className="right">
                        <h3>social</h3>
                        <ul>
                            <li>
                                <a href="https://www.youtube.com/@%EC%98%81%EC%84%A0%EA%B0%A4%EB%9F%AC%EB%A6%AC">Youtube</a>
                                <em>영선갤러리 유튜브에서 많은 영상을 볼 수 있습니다.</em>
                            </li>
                            <li>
                                <a href="https://open.kakao.com/o/gNPhwidf">카카오톡</a>
                                <em>영선갤러리 카카오톡에서 다양한 정보를 얻으실 수 있습니다.</em>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="footer__right">
                    © 2025 youngsungallery<br />
                    본 사이트는 Next.js으로 제작하였습니다.
                </div>
            </div>
        </footer>
    );
};

export default Footer;