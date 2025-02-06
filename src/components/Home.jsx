import React, { useState } from "react";
import postersData from "../DB/posters.json"; // 전시 데이터
import exhibitionsData from "../DB/exhibitions.json"; // 특강 데이터

const Home = () => {
  const [activeTab, setActiveTab] = useState("exhibitions"); // 기본 탭 설정

  // 최신 4개 데이터만 가져오기 (id 기준 역순)
  const posters = postersData.slice(0, 4);
  const lectures = exhibitionsData.slice(0, 4);

  return (
    <div className="home-container">
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

      {/* 포스터 리스트 */}
      <div className="posters">
        {activeTab === "exhibitions" &&
          posters.map((poster) => (
            <div key={poster.id} className="poster-item">
              {poster.image ? (
                <img src={poster.image} alt={poster.title} />
              ) : (
                <div className="no-image">이미지 없음</div>
              )}
              <h2>{poster.title}<em>{poster.desc}</em></h2>
              <p>{poster.date}</p>
            </div>
          ))}

        {activeTab === "lectures" &&
          lectures.map((lecture) => (
            <div key={lecture.id} className="poster-item">
              {lecture.image ? (
                <img src={lecture.image} alt={lecture.title || lecture.name} />
              ) : (
                <div className="no-image">이미지 없음</div>
              )}
              <h2>{lecture.title || lecture.name}</h2>
              <p>{lecture.date}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;