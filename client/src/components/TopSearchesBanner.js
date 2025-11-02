import React from 'react';

const TopSearchesBanner = ({ topSearches, onSearchClick }) => {
  if (!topSearches || topSearches.length === 0) {
    return null;
  }

  return (
    <div className="top-searches-banner">
      <div className="top-searches-content">
        <span className="top-searches-label">🔥 Top Searches:</span>
        <div className="top-searches-list">
          {topSearches.map((item, index) => (
            <span
              key={index}
              className="top-search-item"
              onClick={() => onSearchClick(item.term)}
              title={`Searched ${item.count} times`}
            >
              {item.term} ({item.count})
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopSearchesBanner;

