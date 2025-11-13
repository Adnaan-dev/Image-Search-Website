import React, { useState } from 'react';
import ImageGrid from './ImageGrid';

const SearchSection = ({ onSearch, searchResults, selectedImages, onImageToggle }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim() || loading) return;

    setLoading(true);
    try {
      await onSearch(searchTerm.trim());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-section">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-input"
          placeholder="Search for images..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={loading}
        />
        <button type="submit" className="search-btn" disabled={loading || !searchTerm.trim()}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {searchResults && (
        <>
          <div className="search-results-header">
            You searched for <strong>"{searchResults.term}"</strong> — {searchResults.count} results.
          </div>

          {selectedImages.size > 0 && (
            <div className="selected-counter">
              Selected: {selectedImages.size} image{selectedImages.size !== 1 ? 's' : ''}
            </div>
          )}

          <div className="image-grid-section">
            <ImageGrid
              images={searchResults.images}
              selectedImages={selectedImages}
              onImageToggle={onImageToggle}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SearchSection;


