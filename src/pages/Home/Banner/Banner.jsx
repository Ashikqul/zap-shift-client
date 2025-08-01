// src/components/Banner/Banner.jsx

import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import bannerImg1 from '../../../assets/banner/banner1.png';
import bannerImg2 from '../../../assets/banner/banner2.png';
import bannerImg3 from '../../../assets/banner/banner3.png';

const Banner = () => {
  return (
    <div className="rounded-xl overflow-hidden shadow-xl mt-6">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={4000}
        transitionTime={800}
      >
        {/* Slide 1 */}
        <div>
          <img
            src={bannerImg1}
            alt="Banner 1"
            className="w-full h-[250px] md:h-[500px] object-cover"
          />
        </div>

        {/* Slide 2 */}
        <div>
          <img
            src={bannerImg2}
            alt="Banner 2"
            className="w-full h-[250px] md:h-[500px] object-cover"
          />
        </div>

        {/* Slide 3 */}
        <div>
          <img
            src={bannerImg3}
            alt="Banner 3"
            className="w-full h-[250px] md:h-[500px] object-cover"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
