import React from 'react';
import './ZoomableImage.css';

const ZoomableImage = ({ src, alt }) => {
  return (
    <div className="zoomable-image-container">
      <img 
        src={src} 
        alt={alt} 
        className="zoomable-image"
      />
    </div>
  );
};

export default ZoomableImage;