import React, { useState, useEffect } from 'react';
import newsData from "../DB/news.json";

const News = () => {
  // 10개의 뉴스만 초기로 보여줌
  const [newsList, setNewsList] = useState(newsData.slice(0, 10));  // 처음에는 10개만
  const [showMore, setShowMore] = useState(false);  // 더보기 버튼 상태

  // 뉴스 목록을 10개씩 불러오기 위한 함수
  const loadMoreNews = () => {
    const currentLength = newsList.length;
    const nextNews = newsData.slice(currentLength, currentLength + 10);
    setNewsList((prevNews) => [...prevNews, ...nextNews]);  // 기존 뉴스에 이어서 추가
    if (newsList.length + 10 >= newsData.length) {
      setShowMore(false);  // 더 이상 뉴스가 없으면 "더보기" 버튼 숨김
    }
  };

  useEffect(() => {
    // 데이터는 오래된 순으로 처리(기본적으로 JSON에서 내려받은 순서대로 관리)
    setNewsList(newsData.slice(0, 10));  // 처음 10개는 보여줌
  }, [newsData]);

  return (
    <div className="news-container">
      <h2>미술 관련 기사</h2>
      <p>※ 뉴스는 제목/기사 날짜만 표시하며, 제목 클릭 시 해당 링크로 이동합니다.</p>
      
      <ul>
        {newsList.map((news) => (
          <li key={news.id}>
            <a href={news.link} target="_blank" rel="noopener noreferrer">
              {news.title || "제목 없음"}  {/* 제목이 없으면 "제목 없음" 표시 */}
            </a>
            {news.date && <span> ({news.date})</span>}  {/* 날짜가 있으면 표시 */}
          </li>
        ))}
      </ul>

      {/* 더보기 버튼, 10개 이상일 경우에만 표시 */}
      {newsList.length < newsData.length && (
        <button onClick={loadMoreNews}>기사 더보기</button>
      )}
    </div>
  );
}

export default News;