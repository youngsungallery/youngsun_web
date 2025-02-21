import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

export default function Exhibitions_PotoView() {
  const [galleries, setGalleries] = useState([]);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAutoSlide, setIsAutoSlide] = useState(true);

  // 갤러리 목록 불러오기
  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const owner = process.env.NEXT_PUBLIC_GITHUB_OWNER;
        const repo = process.env.NEXT_PUBLIC_GITHUB_REPO;
        const basePath = process.env.NEXT_PUBLIC_GITHUB_PATH;
  
        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/contents/${basePath}`,
          {
            headers: {
              'Authorization': `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
              'Accept': 'application/vnd.github.v3+json'
            }
          }
        );
  
        // 응답 상태 확인
        if (!response.ok) {
          const errorBody = await response.text();
          console.error('GitHub API Error:', errorBody);
          throw new Error(`갤러리 목록 불러오기 실패: ${response.status}`);
        }
  
        const data = await response.json();
  
        // 폴더명을 날짜 기준으로 정렬 (최신순)
        const galleryFolders = data
          .filter(item => item.type === 'dir')
          .map(folder => folder.name)
          .sort((a, b) => {
            // YYYY.MM 형식의 날짜 비교
            const parseDate = (dateString) => {
              const [year, month] = dateString.split('.');
              return new Date(parseInt(year), parseInt(month) - 1);
            };
  
            return parseDate(b).getTime() - parseDate(a).getTime();
          });
  
        // 디버깅용 로그
        console.log('Fetched galleries:', galleryFolders);
  
        setGalleries(galleryFolders);
        
        if (galleryFolders.length > 0) {
          setSelectedGallery(galleryFolders[0]);
        } else {
          throw new Error('갤러리 폴더가 없습니다.');
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('갤러리 로딩 중 오류:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };
  
    fetchGalleries();
  }, []);

  // 선택된 갤러리 이미지 불러오기
useEffect(() => {
    const fetchImages = async () => {
      if (!selectedGallery) return;
  
      try {
        setIsLoading(true);
        const owner = process.env.NEXT_PUBLIC_GITHUB_OWNER;
        const repo = process.env.NEXT_PUBLIC_GITHUB_REPO;
        const basePath = process.env.NEXT_PUBLIC_GITHUB_PATH;
        const path = `${basePath}${selectedGallery}`;
  
        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
          {
            headers: {
              'Authorization': `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
              'Accept': 'application/vnd.github.v3+json'
            }
          }
        );
  
        if (!response.ok) {
          throw new Error('이미지 로딩 실패');
        }
  
        const data = await response.json();
  
        const fetchedImages = data
          .filter(file => 
            file.type === 'file' && 
            ['jpg', 'png', 'jpeg', 'gif', 'webp'].some(ext => 
              file.name.toLowerCase().endsWith(ext)
            )
          )
          .map(file => file.download_url);
  
        if (fetchedImages.length === 0) {
          throw new Error('해당 갤러리에 이미지가 없습니다.');
        }
  
        setImages(fetchedImages);
        setCurrentImageIndex(0);
      } catch (error) {
        setError(error.message);
        setImages([]);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchImages();
  }, [selectedGallery]);

  // 자동 슬라이드 useEffect
  useEffect(() => {
    let intervalId;

    if (isAutoSlide && images.length > 1) {
      intervalId = setInterval(() => {
        setCurrentImageIndex(prev => 
          prev < images.length - 1 ? prev + 1 : 0
        );
      }, 2000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAutoSlide, images]);

  // 수동 이미지 변경 함수
  const handleNextImage = useCallback(() => {
    setCurrentImageIndex(prev => 
      prev < images.length - 1 ? prev + 1 : 0
    );
  }, [images]);

  const handlePrevImage = useCallback(() => {
    setCurrentImageIndex(prev => 
      prev > 0 ? prev - 1 : images.length - 1
    );
  }, [images]);

  // 자동 슬라이드 토글 함수
  const toggleAutoSlide = () => {
    setIsAutoSlide(prev => !prev);
  };

  // 로딩 및 오류 상태 처리
  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류: {error}</div>;

  return (
    <div className="exhibitions-container">
      {/* 왼쪽 사이드바 */}
      <div className="gallery-sidebar">
        <h2 className="gallery-sidebar__title">전시 목록</h2>
        {galleries.map(gallery => (
          <div 
            key={gallery}
            className={`gallery-sidebar__item ${
              selectedGallery === gallery ? 'gallery-sidebar__item--selected' : ''
            }`}
            onClick={() => setSelectedGallery(gallery)}
          >
            {gallery}
          </div>
        ))}
      </div>

      {/* 오른쪽 메인 뷰어 */}
      <div className="gallery-viewer">
        {/* 선택된 갤러리 제목 */}
        {selectedGallery && (
          <div className="gallery-viewer__header">
            {selectedGallery}
          </div>
        )}

        {/* 이미지 뷰어 */}
        <div className="gallery-viewer__image-container">
          {images.length > 0 ? (
            <div className="image-wrapper">
              <Image 
                src={images[currentImageIndex]}
                alt={`이미지 ${currentImageIndex + 1}`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ 
                  objectFit: 'contain',
                  objectPosition: 'center'
                }}
              />
            </div>
          ) : (
            <p>이미지가 없습니다.</p>
          )}
        </div>

        {/* 이미지 네비게이션 */}
        <div className="gallery-viewer__navigation">
          <button 
            className="nav-button"
            onClick={handlePrevImage}
            disabled={images.length === 0}
          >
            이전
          </button>
          <span className="page-info">
            {images.length > 0 ? `${currentImageIndex + 1} / ${images.length}` : '0 / 0'}
          </span>
          <button 
            className="nav-button"
            onClick={handleNextImage}
            disabled={images.length === 0}
          >
            다음
          </button>
          <button 
            className="nav-button"
            onClick={toggleAutoSlide}
            style={{ 
              backgroundColor: isAutoSlide ? '#28a745' : '#dc3545',
              marginLeft: '10px'
            }}
          >
            {isAutoSlide ? '자동 슬라이드 중' : '자동 슬라이드 정지'}
          </button>
        </div>
      </div>
    </div>
  );
}