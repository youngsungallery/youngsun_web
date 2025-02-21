// src/pages/[gallerySlug].jsx
import { useState, useEffect } from 'react';

import Exhibitions_PotoView from '@/components/Exhibitions_PotoView';

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params }) {
    const { gallerySlug } = params;
    const owner = process.env.NEXT_PUBLIC_GITHUB_OWNER;
    const repo = process.env.NEXT_PUBLIC_GITHUB_REPO;
    const basePath = process.env.NEXT_PUBLIC_GITHUB_PATH;
    const path = `${basePath}${gallerySlug}`;
  
    try {
      console.log('GitHub API 요청 정보:', { 
        owner, 
        repo, 
        path 
      });
  
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
      );
  
      // 상세 오류 로깅
      if (!response.ok) {
        const errorBody = await response.text();
        console.error('GitHub API 응답 오류:', {
          status: response.status,
          statusText: response.statusText,
          body: errorBody
        });
        
        throw new Error(`GitHub API 요청 실패: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
  
      // 이미지 필터링 로깅 추가
      console.log('GitHub API 응답 데이터:', data);
  
      const images = data
        .filter(file => 
          file.type === 'file' && 
          ['jpg', 'png', 'jpeg', 'gif'].includes(file.name.split('.').pop().toLowerCase())
        )
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(file => file.download_url);
  
      console.log('필터링된 이미지 URL:', images);
  
      return {
        props: {
          images,
          title: gallerySlug
        },
        revalidate: 3600 
      };
    } catch (error) {
      console.error('이미지 로딩 중 전체 오류:', error);
  
      return {
        props: {
          images: [],
          title: gallerySlug,
          error: error.message
        },
        revalidate: 3600
      };
    }
  }
  
  export default function GalleryPage({ images, title, error }) {
    // 오류 발생 시 오류 메시지 표시
    if (error) {
      return (
        <div>
          <h1>오류 발생</h1>
          <p>{error}</p>
        </div>
      );
    }
  
    return <Exhibitions_PotoView images={images} title={title} />;
  }