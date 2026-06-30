import React from 'react';
import Track from './Track';
import TrackList from './TrackList';
import PlayList from './PlayList';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';
import StateBar from './StateBar';

export default function App() {
  return (
    <div className="App">
      {/* <h1>Ja<span className="highlight">mmm</span>ing</h1> */}
      <StateBar />
      <SearchBar />
      <SearchResult />
      <PlayList />
    </div>
  );
}