import React, { useState } from "react";
import exhibitionsData from "../DB/exhibitions.json";
import lecturesData from "../DB/lectures.json";

const History = () => {
    const [activeTab, setActiveTab] = useState("exhibitions");
    const [showMore, setShowMore] = useState(false); // 🔹 더보기 상태 추가

    const exhibitionsWithImages = exhibitionsData.filter(exhibition => exhibition.image);
    const lecturesWithImages = lecturesData.filter(lecture => lecture.image);

    return (
        <div className="history-container">
            {/* 탭 메뉴 */}
            <nav>
                <ul>
                    <li className={activeTab === "exhibitions" ? "active" : ""} onClick={() => setActiveTab("exhibitions")}>전시</li>
                    <li className={activeTab === "lectures" ? "active" : ""} onClick={() => setActiveTab("lectures")}>특강</li>
                </ul>
            </nav>

            {/* 기록 리스트 */}
            <div className="history-list">
                {activeTab === "exhibitions" && exhibitionsData.map((exhibition) => (
                    <div key={exhibition.id} className="history-item">
                        <span className="date">{exhibition.date} | {exhibition.title}</span>
                    </div>
                ))}
                {activeTab === "lectures" && lecturesData.map((lecture) => (
                    <div key={lecture.id} className="history-item">
                        <span className="date">{lecture.date} | {lecture.title} | {lecture.SLI}</span>
                    </div>
                ))}
            </div>

            {/* 🔹 더보기 버튼을 눌렀을 때 포스터 보이기 */}
            <button className="load-more" onClick={() => setShowMore(!showMore)}>
                {showMore ? "포스터 숨기기" : "포스터 보기"}
            </button>

            {showMore && (
                <div className="history-gallery">
                    {activeTab === "exhibitions" && exhibitionsWithImages.map((exhibition) => (
                        <div key={exhibition.id} className="history-img">
                            <img src={exhibition.image} alt={exhibition.title} />
                        </div>
                    ))}
                    {activeTab === "lectures" && lecturesWithImages.map((lecture) => (
                        <div key={lecture.id} className="history-img">
                            <img src={lecture.image} alt={lecture.title} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default History;