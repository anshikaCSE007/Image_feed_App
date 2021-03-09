import React, { useState } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
// import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import CancelIcon from '@material-ui/icons/Cancel';
import { IconButton } from '@material-ui/core';
import "./ImageSlider.css";

const ImageSlider = (props) => {
  let {slides} = props;
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <div>
    <section className='slider'>
      
      
      <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
      <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
      <CancelIcon onClick={props.closeView} className="close-icon"/>
      
      
      {slides.map((slide, index) => {
        return (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={index}
          >
            {index === current && (
              <img src={slide.urls.regular} alt='' className='image' />
            )}
          </div>
        );
      })}
    </section>
    </div>
  );
};

export default ImageSlider;
