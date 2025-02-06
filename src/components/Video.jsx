import React, { useState } from "react";
import { videoText } from "@/constants";

const Video = () => {
    const [activeVideo, setActiveVideo] = useState(0); // 기본 첫 번째 영상은 항상 보임

    const handleVideoClick = (index) => {
        setActiveVideo(index); // 클릭한 영상의 인덱스를 상태로 업데이트
    };

    return (
        <section id="Video">
            <div className="video__inner">
                <h2 className="video__title">
                    special lecture <em>특강 영상</em>
                </h2>
                <div className="video__list">
                    <ul>
                        {videoText.map((video, index) => (
                            <li key={index}>
                                <a
                                    href="#video"
                                    onClick={() => handleVideoClick(index)}
                                >
                                    {video.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="video__youtube">
                    {/* 첫 번째 영상은 항상 보이도록 설정 */}
                    <div>
                        <iframe className="video__View"
                            width="40%"
                            height="500"
                            src={videoText[activeVideo].youtube}
                            allowFullScreen
                        />                        
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Video;