import React, { useState } from "react";
import exhibitionsData from '../DB/exhibitions.json'; // 전시 데이터
import lecturesData from '../DB/lectures.json'; // 특강 데이터

const Home = () => {
  const [activeTab, setActiveTab] = useState("exhibitions"); // 기본 탭 설정

  // 최신 4개 데이터만 가져오기 (id 기준 역순)
  const exhibtionsWithImages = exhibitionsData.filter(exhibtion => exhibtion.image); // 이미지가 있는 포스터만
  const exhibtions = exhibtionsWithImages.slice(0, 4);
  const lecturesWithImages = lecturesData.filter(lecture => lecture.image); // 이미지가 있는 포스터만
  const lectures = lecturesWithImages.slice(0, 4);

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
          exhibtions.map((exhibtion) => (
            <div key={exhibtion.id} className="poster-item">
              {exhibtion.image ? (
                <img src={exhibtion.image} alt={exhibtion.title} />
              ) : (
                <div className="no-image">포스터없음</div>
              )}
              <h2>{exhibtion.title}<em>{exhibtion.desc}</em></h2>
              <p>{exhibtion.date}</p>
            </div>
          ))}

        {activeTab === "lectures" &&
          lectures.map((lecture) => (
            <div key={lecture.id} className="poster-item">
              {lecture.image ? (
                <img src={lecture.image} alt={lecture.title || lecture.name} />
              ) : (
                <div className="no-image">포스터없음</div>
              )}
              <h2>{lecture.title}<em>{lecture.SLI}</em></h2>
              <p>{lecture.date}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;