import React from 'react';

const HistorySidebar = ({ history, loading, onHistoryClick }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="history-sidebar">
      <h2 className="history-title">Search History</h2>
      {loading ? (
        <div className="no-history">Loading...</div>
      ) : history.length === 0 ? (
        <div className="no-history">No search history yet</div>
      ) : (
        <ul className="history-list">
          {history.map((item, index) => (
            <li
              key={index}
              className="history-item"
              onClick={() => onHistoryClick(item.term)}
            >
              <div className="history-term">{item.term}</div>
              <div className="history-time">{formatTime(item.timestamp)}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistorySidebar;

