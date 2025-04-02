import Exhibitions_Artwork from '@/components/Exhibitions_Artwork';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React from 'react';

const artwork = () => {
    return (
        <div>
            <Header/>
            <Exhibitions_Artwork/>
            <Footer/>
        </div>
    )
}

export default artwork;