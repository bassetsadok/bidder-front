import React from 'react';
import { Carousel } from 'react-responsive-carousel';

export default function ProductImages({ images }) {
  return (
    <Carousel autoPlay={false}>
      {images.map(image => (
        <div>
          <img alt="" src={image} />
        </div>
      ))}
    </Carousel>
  );
}
