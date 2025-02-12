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

  // 컴포넌트가 처음 렌더링될 때 작가 목록을 가져옴
  useEffect(() => {
    const artists = new Set();
    artworksData.forEach((artwork) => {
      artists.add(artwork.artist);
    });
    setUniqueArtists([...artists]); // Set을 배열로 변환하여 저장
  }, []);

  // 선택된 작가가 있을 경우 해당 작가의 작품만 필터링
  const filteredArtworks = selectedArtist
    ? artworksData.filter((artwork) => artwork.artist === selectedArtist)
    : artworksData;

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