import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Shopitem from './Shopitem';

function HorizontalSlider({data}) {
  // const data = Array.from({ length: 20 }, (_, i) => i + 1); // Generate an array of 20 elements

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Display 2 items at a time
    slidesToScroll: 2, // Scroll 2 items at a time
    lazyLoad: false, // Ensure all elements are rendered
  };

  return (
    <div className="w-full cursor-grab active:cursor-grabbing">
      <Slider {...settings}>
        {
          data.map((item, index)=>(
            <Shopitem key={index} id={item.id} img={item.img} name={item.name} url={item.url} price={item.price}  />
          ))
        }
      </Slider>
    </div>
  );
}

export default HorizontalSlider;