"use client";

import React, { useEffect } from "react";
import Header from "@/components/Header";
import Skip from "@/components/Skip";
import Intro from "@/components/Intro";
import Skill from "@/components/Skill";
import Poster from "@/components/Poster";
import Port from "@/components/Port";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import smooth from "@/utils/smooth";
import link from "@/utils/link";
import Video from "@/components/Video";

export default function Home(){
    useEffect(() => {
        smooth();
        link();
    }, []);

    return (
        <>  
            <Skip />
            <Header />
            <main id="main" role="main">
                <Poster />
                <Video />
                <Intro />
                <Skill />
                <Port />
                <Contact />
            </main>
            <Footer />
        </>
    )
}