import React, { useState } from "react";
import exhibitionsData from "../DB/exhibitions.json";
import lecturesData from "../DB/lectures.json";

const History = () => {
    const [activeTab, setActiveTab] = useState("exhibitions"); // 기본 탭 설정

    const exhibtionsWithImages = exhibitionsData.filter(exhibtion => exhibtion.image); // 이미지가 있는 포스터만
    const lecturesWithImages = lecturesData.filter(lecture => lecture.image); // 이미지가 있는 포스터만

    return (
        <div className="history-container">
        {/* 탭 메뉴 */}
        <nav>
            <ul>
                <li
                    className={activeTab === "exhibitions" ? "active" : ""}
                    onClick={() => setActiveTab("exhibitions")}
                >
                    전시
                </li>
                <li
                    className={activeTab === "lectures" ? "active" : ""}
                    onClick={() => setActiveTab("lectures")}
                >
                    특강
                </li>
            </ul>
        </nav>
        
        {/* 기록 전시 */}
        <div className="history-list">
            {activeTab === "exhibitions" &&
            exhibitionsData.map((exhibtion) => (
                <div key={exhibtion.id} className="history-item">
                    <span className="date">{exhibtion.date} | {exhibtion.title}</span>
                </div>
            ))}
            {activeTab === "exhibitions" &&
            exhibtionsWithImages.map((exhibtion) => (
                <div key={exhibtion.id} className="history-img">
                    {exhibtion.image ? (<img src={exhibtion.image} alt={exhibtion.title} />) : (
                        <div className="no-image">포스터없음</div>
                    )}
                </div>
            ))}

            {/* 기록 특강 */}
            {activeTab === "lectures" &&
            lecturesData.map((lecture) => (
                <div key={lecture.id} className="history-item">
                    <span className="date">{lecture.date} | {lecture.title} | {lecture.SLI}</span>
                </div>
            ))}
            {activeTab === "lectures" &&
            lecturesWithImages.map((lecture) => (
                <div key={lecture.id} className="history-img">
                    {lecture.image ? (<img src={lecture.image} alt={lecture.title} />) : (
                        <div className="no-image">포스터없음</div>
                    )}
                </div>
            ))}
        </div>
        </div>
    );
};

export default History;