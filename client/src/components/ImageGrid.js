import React from 'react';

const ImageGrid = ({ images, selectedImages, onImageToggle }) => {
  if (!images || images.length === 0) {
    return <div>No images found</div>;
  }

  return (
    <div className="image-grid">
      {images.map((image) => (
        <div
          key={image.id}
          className={`image-item ${selectedImages.has(image.id) ? 'selected' : ''}`}
          onClick={() => onImageToggle(image.id)}
        >
          <img src={image.thumbUrl} alt={image.description} />
          <input
            type="checkbox"
            className="image-checkbox"
            checked={selectedImages.has(image.id)}
            onChange={() => onImageToggle(image.id)}
            onClick={(e) => e.stopPropagation()}
          />
          <div className="image-overlay">
            <div className="image-author">
              Photo by <a href={image.authorUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                {image.author}
              </a>
            </div>
            {image.description && (
              <div className="image-description">{image.description}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;


