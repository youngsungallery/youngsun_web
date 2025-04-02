import React, { useState, useEffect } from 'react';
import artworksData from '../DB/artwork.json'; // 작품 데이터
import exhibtionartworksData from '../DB/exhibtion_artwork.json'; // 전시 작품데이터

const baseURL = "https://github.com/youngsungallery/IMG_DB/blob/main/youngsungallery/art/";

const Exhibitions_Artwork = () => {
    const [visibleCount, setVisibleCount] = useState(6); // 처음에 보여줄 작품 개수
    const [uniqueExhibitions, setUniqueExhibitions] = useState([]); // 유니크한 전시 목록
    const [selectedExhibition, setSelectedExhibition] = useState(null); // 선택된 전시
    const [exhibitionArtworkCodes, setExhibitionArtworkCodes] = useState({});

    // "더보기" 클릭 시 추가로 작품을 표시
    const loadMore = () => {
        setVisibleCount(visibleCount + 6); // 한 번에 6개씩 추가
    };

    // 컴포넌트가 처음 렌더링될 때 전시 제목 목록을 가져오고 정렬
    useEffect(() => {
        const exhibitions = new Set();
        const exhibitionArtworkCodes = {};

        for (const exhibitionData of exhibtionartworksData) {
            exhibitions.add(exhibitionData.title);
            exhibitionArtworkCodes[exhibitionData.title] = exhibitionData.Code;
        }

        // 전시 제목을 가나다순 (오름차순) 정렬
        const sortedExhibitions = [...exhibitions].sort((a, b) => a.localeCompare(b, 'ko'));

        setSelectedExhibition(sortedExhibitions);
        setExhibitionArtworkCodes(exhibitionArtworkCodes);
    }, []);

    // 선택된 전시가 있을 경우 해당 전시의 작품만 필터링
    const filteredExhibitionArtworks = selectedExhibition && exhibitionArtworkCodes[selectedExhibition]
        ? artworksData.filter((artwork) => exhibitionArtworkCodes[selectedExhibition].includes(artwork.code))
        : artworksData;

    // 작품을 작품명 기준으로 가나다순 (오름차순) 정렬
    filteredExhibitionArtworks.sort((a, b) => a.title.localeCompare(b.title, "ko"));

    return (
        <div className="artwork-container">
            {/* 전시 제목 영역 */}
            <div className="title-wrapper">
                <h1 className="title">
                    {selectedExhibition ? selectedExhibition : "전체 작품"}
                </h1>
            </div>
    
            {/* 작품 정보 영역 */}
            <div className="content-wrapper">
                <div className="artwork-info-container">
                    {filteredExhibitionArtworks.slice(0, visibleCount).map((artwork) => (
                        <div className="artwork" key={artwork.code}>
                            <div className="artwork-image">
                                <img
                                    src={`${baseURL}${artwork.code}.png?raw=true`}
                                    alt={artwork.title}
                                />
                            </div>
                            <div className="artwork-info">
                                <h3>{artwork.title}</h3>
                                <p>{artwork.artist}</p>
                                <p>{artwork.technique}</p>
                                <p>{artwork.size}</p>
                                <p>{artwork.year} / {artwork.code}</p>
                            </div>
                        </div>
                    ))}
    
                    {/* "더보기" 버튼 */}
                    {visibleCount < filteredExhibitionArtworks.length && (
                        <button onClick={loadMore} className="load-more-button">
                            더보기
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Exhibitions_Artwork;