import React, { useState } from 'react';
import exhibitionData from '../DB/exhibitionPoto.json';

const ExhibitionList = ({ selectedExhibition, setSelectedExhibition, handleExhibitionClick }) => {
  return (
    <div className="exhibition-list">
      {exhibitionData.map((exhibition) => (
        <div
          key={exhibition.id}
          className={`exhibition-item ${selectedExhibition.id === exhibition.id ? 'selected' : ''}`}
          onClick={() => handleExhibitionClick(exhibition)}
        >
          {exhibition.title}
        </div>
      ))}
    </div>
  );
};

const ExhibitionPhotos = ({ selectedExhibition, currentIndex, setCurrentIndex }) => {
  const itemsPerLoad = 5;

  const handleLoadMore = () => {
    setCurrentIndex(currentIndex + itemsPerLoad);
  };

  return (
    <div className="exhibition-photos">
      <h2>{selectedExhibition.title}</h2>
      <div className="photo-grid">
        {selectedExhibition.photos.slice(0, currentIndex).map((photoUrl, index) => (
          <div key={index} className="photo-item">
            <img src={photoUrl} alt={`Artwork ${index + 1}`} />
          </div>
        ))}
      </div>
      {currentIndex < selectedExhibition.photos.length && (
        <button className="load-more" onClick={handleLoadMore}>
          더보기
        </button>
      )}
    </div>
  );
};

const Exhibitions_PotoView = () => {
  const [selectedExhibition, setSelectedExhibition] = useState(exhibitionData[0]);
  const [currentIndex, setCurrentIndex] = useState(15); // 초기 이미지 개수를 15개로 설정

  const handleExhibitionClick = (exhibition) => {
    setSelectedExhibition(exhibition);
    setCurrentIndex(15); // 새로운 제목 선택 시 초기화
  };

  return (
    <div className="exhibitions-poto">
      <ExhibitionList
        selectedExhibition={selectedExhibition}
        setSelectedExhibition={setSelectedExhibition}
        handleExhibitionClick={handleExhibitionClick}
      />
      <ExhibitionPhotos
        selectedExhibition={selectedExhibition}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </div>
  );
};

export default Exhibitions_PotoView;