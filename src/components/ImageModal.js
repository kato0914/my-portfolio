import React, { useEffect, useRef } from 'react';
import './ImageModal.css';
import ZoomableImage from './ZoomableImage';

function ImageModal({ isOpen, onClose, imageSrc, isZoomable }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      contentRef.current.scrollTop = 0; // モーダルが開かれたときに最上部にスクロール
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" ref={contentRef}>
        <div className="modal-image-container">
          {isZoomable ? (
            <ZoomableImage src={imageSrc} alt="拡大画像" />
          ) : (
            <img src={imageSrc} alt="拡大画像" className="modal-image" />
          )}
        </div>
      </div>
      <div className="modal-close-container">
        <button className="modal-close" onClick={onClose}>閉じる</button>
      </div>
    </div>
  );
}

export default ImageModal;