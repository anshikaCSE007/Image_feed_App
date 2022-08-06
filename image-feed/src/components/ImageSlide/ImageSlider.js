import React, { useState, useEffect } from 'react';
import "./ImageSlider.css";

import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import Avatar from '@mui/material/Avatar';

import CancelIcon from '@material-ui/icons/Cancel';
import likeIcon from '../../icons/heart.svg';
import plusIcon from '../../icons/plus.svg';
import likedIcon from '../../icons/favorite.svg';
import acceptIcon from '../../icons/accept.svg'; 


const ImageSlider = (props) => {
  let {slides} = props;
  const [current, setCurrent] = useState(props.currentIndex);
  const length = slides.length;
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);


  useEffect(() => {
    setLiked(false);
    setAdded(false)
  }, [current])
  
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
    <div className='container'>
          <div
            className={'slideActive'}
            key={current}
          >
            <div className="like">
              <div className="avatarfooter">
                    <Avatar alt="Remy Sharp" src={slides[current].user?.profile_image.small} />
                    <span>{slides[current].user?.name}</span>
              </div>
              <div>
              <img src={liked ? likedIcon : likeIcon} alt="" onClick={() => setLiked(true)} />
              <img src={added ? acceptIcon : plusIcon} onClick={() => setAdded(true)} alt="" />
              </div>
              

            </div>
              <img src={slides[current].urls.regular} alt='' className='image' />
              
          </div>
    </div>
    </section>
    </div>
  );
};

export default ImageSlider;
