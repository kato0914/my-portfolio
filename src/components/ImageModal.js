import React, { useEffect } from 'react';
import './ImageModal.css';
import ZoomableImage from './ZoomableImage';

function ImageModal({ isOpen, onClose, imageSrc, isZoomable }) {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content">
        <div className="modal-image-container">
          {isZoomable ? (
            <ZoomableImage src={imageSrc} alt="拡大画像" />
          ) : (
            <img src={imageSrc} alt="拡大画像" className="modal-image" />
          )}
        </div>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
    </div>
  );
}

export default ImageModal;