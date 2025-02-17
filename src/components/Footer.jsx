import React, {useState} from "react";

const Footer = () => {
    const [showForm, setShowForm] = useState(false);
    const [kakaoId, setKakaoId] = useState("");
    const [message, setMessage] = useState("");

    const handleSubscribe = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!kakaoId.trim()) {
            return setMessage("카카오톡 ID를 입력해주세요!");
        }

        try {
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ kakaoId }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage("✅ 구독 신청이 완료되었습니다!");
                setKakaoId("");
                setShowForm(false);
            } else {
                setMessage(`❌ ${data.message}`);
            }
        } catch (error) {
            setMessage("❌ 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <footer id="footer" role="contentinfo">
            <div className="footer__inner">
                <div className="footer__text">
                    <span>Youngsungallery 영선갤러리</span>
                    <span>© youngsungallery All rights reserved</span>
                </div>
                <div className="footer__info">
                    <div className="left">
                        <div className="title">
                            <button onClick={() => setShowForm(!showForm)} className="subscribe-btn">
                                구독하기
                            </button>
                            <em>구독하시면, 카카오톡으로 새로운 포스터가 발송됩니다.</em>

                            {showForm && (
                                <form onSubmit={handleSubscribe} className="subscribe-form">
                                    <input
                                        type="text"
                                        placeholder="카카오톡 ID를 입력하세요"
                                        value={kakaoId}
                                        onChange={(e) => setKakaoId(e.target.value)}
                                    />
                                    <button type="submit">신청</button>
                                </form>
                            )}
                            {message && <p className="subscribe-message">{message}</p>}
                        </div>
                    </div>
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