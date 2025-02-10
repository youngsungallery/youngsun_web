import React, { useEffect, useState } from "react";
import videos from '../DB/video.json'; // 유튜브 데이터

const Video = () => {
    // 선택된 영상의 index 상태 관리
    const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  
    // 제목 클릭 시 선택된 영상 변경 함수
    const handleVideoClick = (index) => {
      setSelectedVideoIndex(index);
    };
  
    return (
      <div className="video-container">
        {videos.length > 0 && (
          <>
            {/* 첫 번째 영상 제목 */}
            <div className="video-content">
              <div className="video-list">
                {/* 제목 리스트 */}
                {videos.map((video, index) => (
                  <p
                    key={index}
                    className="video-title"
                    onClick={() => handleVideoClick(index)} // 클릭 시 영상 변경
                  >
                    {video.title}
                  </p>
                ))}
              </div>
              <div className="video-frame">
                {/* 선택된 영상만 보여주기 */}
                <iframe
                  src={`https://www.youtube.com/embed/${videos[selectedVideoIndex].id}`}
                  title={videos[selectedVideoIndex].title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };
  
  export default Video;