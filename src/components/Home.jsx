import React, { useEffect, useState } from "react";
import exhibitionsData from '../DB/exhibitions.json'; // 전시 데이터
import lecturesData from '../DB/lectures.json'; // 특강 데이터

const Home = () => {
  const [activeTab, setActiveTab] = useState("exhibitions"); // 기본 탭 설정
  const [visibleCount, setVisibleCount] = useState(4); // 기본값: 4개

  //반응형 : 화면 크기에 따라 visibleCount 변경
  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth <= 850) {
        setVisibleCount(2);
      } else if (window.innerWidth <= 1100) {
        setVisibleCount(3);
      } else {
        setVisibleCount(4);
      }
    };

    window.addEventListener("resize", updateCount);
    updateCount();

    return () => window.removeEventListener("resize", updateCount);
  }, []);

  // 최신 visibleCount개 데이터만 가져오기 (이미지 있는 포스터만 필터링)
  const exhibtions = exhibitionsData.filter(exhibtion => exhibtion.image).slice(0, visibleCount);
  const lectures = lecturesData.filter(lecture => lecture.image).slice(0, visibleCount);

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