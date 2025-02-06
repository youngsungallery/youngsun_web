import React from "react";

import { posterText } from "@/constants";
import Image from 'next/image';

const groupedPosters = posterText.reduce((acc, poster) => {
    if (!acc[poster.category]) acc[poster.category] = [];
    acc[poster.category].push(poster);
    return acc;
}, {});

const Poster = () => {
    return (
        <section id="poster">
            <div className="poster__inner">
                <h2 className="poster__title">
                    exhibition poster <em>전시 포스터</em>
                </h2>
                <div className="poster__wrap">
                    {posterText.map((poster, key) => (
                        <article className={`poster__item s${key+1}`} key={key}>
                            <span className="num">{poster.category}</span>
                            {/* 인터넷 이미지 출력 */}
                            <div className="poster__image">
                                <img src={poster.image} alt={poster.day} />
                            </div>
                            <h3 className="title">
                                {poster.title}
                            </h3>
                            <h3 className="subtitle">
                                {poster.subtitle}
                            </h3>
                            <h3 className="day">
                                {poster.day}
                            </h3>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Poster;