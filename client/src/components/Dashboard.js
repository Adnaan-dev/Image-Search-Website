import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Navigation from './Navigation';
import SearchSection from './SearchSection';
import './Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState(null);
  const [selectedImages, setSelectedImages] = useState(new Set());

  useEffect(() => {
    // Check if there's a search term in navigation state
    if (location.state?.searchTerm) {
      handleSearch(location.state.searchTerm);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const handleSearch = async (term) => {
    try {
      const response = await axios.post('http://localhost:5000/api/search', { term });
      setSearchResults(response.data);
      setSelectedImages(new Set());
    } catch (error) {
      console.error('Search error:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Search failed. Please try again.';
      alert(`Search failed: ${errorMessage}`);
    }
  };

  const handleImageToggle = (imageId) => {
    const newSelected = new Set(selectedImages);
    if (newSelected.has(imageId)) {
      newSelected.delete(imageId);
    } else {
      newSelected.add(imageId);
    }
    setSelectedImages(newSelected);
  };

  return (
    <div className="dashboard">
      <Navigation user={user} onLogout={onLogout} />
      <div className="dashboard-content">
        <div className="search-page-header">
          <h1 className="page-title">🔍 Search Images</h1>
          <p className="page-subtitle">Discover beautiful images from Unsplash</p>
        </div>
        <SearchSection
          onSearch={handleSearch}
          searchResults={searchResults}
          selectedImages={selectedImages}
          onImageToggle={handleImageToggle}
        />
      </div>
    </div>
  );
};

export default Dashboard;

