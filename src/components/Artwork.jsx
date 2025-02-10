import React, { useState, useEffect } from 'react';
import artworksData from '../DB/artwork.json'; // 작품 데이터
import artistsData from '../DB/artist.json'; // 작가 데이터

const Artworks = () => {
  const [visibleCount, setVisibleCount] = useState(6); // 보여줄 항목 수
  const [uniqueArtists, setUniqueArtists] = useState([]); // 유니크한 작가 목록
  const [selectedArtist, setSelectedArtist] = useState(null); // 선택된 작가

  // "더보기" 클릭 시 추가로 항목을 표시
  const loadMore = () => {
    setVisibleCount(visibleCount + 6); // 한 번에 6개씩 추가
  };

  // 컴포넌트가 처음 렌더링될 때 작가 목록을 가져옴
  useEffect(() => {
    // 작품에 포함된 작가명을 중복 없이 추출하여 유니크한 작가 리스트 만들기
    const artists = new Set();
    artworksData.forEach((artwork) => {
      artists.add(artwork.artist); // 작가명만 추가
    });
    setUniqueArtists([...artists]); // Set을 배열로 변환하여 상태에 저장
  }, []);

  // 선택된 작가가 있을 때 해당 작가의 작품만 필터링
  const filteredArtworks = selectedArtist
    ? artworksData.filter((artwork) => artwork.artist === selectedArtist)
    : artworksData;

  return (
    <div className="artwork-container">
      {/* 작가 목록 */}
      <div className="artist-list">
        {uniqueArtists.map((artist, index) => (
          <div
            key={index}
            className="artist-name"
            onClick={() => setSelectedArtist(artist)} // 작가명 클릭 시 상태 변경
            style={{ cursor: 'pointer', marginBottom: '10px' }}
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
              <img src={artwork.image} alt={artwork.title} />
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
  );
};

export default Artworks;