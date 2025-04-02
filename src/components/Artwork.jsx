import React, { useState, useEffect } from 'react';
import artworksData from '../DB/artwork.json'; // 작품 데이터

const baseURL = "https://github.com/youngsungallery/IMG_DB/blob/main/youngsungallery/art/";

const Artworks = () => {
    const [visibleCount, setVisibleCount] = useState(6); // 처음에 보여줄 작품 개수
    const [uniqueArtists, setUniqueArtists] = useState([]); // 유니크한 작가 목록
    const [selectedArtist, setSelectedArtist] = useState(null); // 선택된 작가

    // "더보기" 클릭 시 추가로 작품을 표시
    const loadMore = () => {
        setVisibleCount(visibleCount + 6); // 한 번에 6개씩 추가
    };

    // 컴포넌트가 처음 렌더링될 때 작가 목록을 가져오고 정렬
    useEffect(() => {
        const artists = new Set();
        artworksData.forEach((artwork) => {
            artists.add(artwork.artist);
        });

    // 영어 → 한글 순서로 정렬
    const sortedArtists = [...artists].sort((a, b) => {
        const isAEnglish = /^[A-Za-z]/.test(a); // 영어로 시작하는지 확인
        const isBEnglish = /^[A-Za-z]/.test(b);

        if (isAEnglish && !isBEnglish) return -1; // 영어 먼저
        if (!isAEnglish && isBEnglish) return 1; // 한글 나중
        return a.localeCompare(b, 'ko'); // 같은 언어면 가나다순 정렬
    });

    setUniqueArtists(sortedArtists);
    }, []);

    // 선택된 작가가 있을 경우 해당 작가의 작품만 필터링
        const filteredArtworks = selectedArtist
            ? artworksData.filter((artwork) => artwork.artist === selectedArtist)
            : artworksData;

    // 작품을 작품명 기준으로 가나다순 (오름차순) 정렬
        filteredArtworks.sort((a,b) => a.title.localeCompare(b.title, "ko"));

    return (
        <div className="artwork-container">
            <div className="content-wrapper">
                {/* 작가 목록 */}
                <div className="artist-list">
                    {uniqueArtists.map((artist, index) => (
                        <div
                            key={index}
                            className="artist-name"
                            onClick={() => setSelectedArtist(artist)}
                            style={{ cursor: 'pointer' }}
                        >
                            {artist}
                        </div>
                    ))}
                </div>

                {/* 작품 정보 */}
                <div className="artwork-info-container">
                    {filteredArtworks.slice(0, visibleCount).map((artwork) => (
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
                                <p>{artwork.size}</p>
                                <p>{artwork.technique}</p>
                                <p>{artwork.year}</p>
                                <p>{artwork.code}</p>
                            </div>
                        </div>
                    ))}

                {/* "더보기" 버튼 */}
                    {visibleCount < filteredArtworks.length && (
                        <button onClick={loadMore} className="load-more-button">
                            더보기
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Artworks;