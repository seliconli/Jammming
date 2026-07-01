import React from 'react';
import PlayList from './components/PlayList';
import SearchBar from './components/SearchBar';
import SearchResult from './components/SearchResult';
import StateBar from './components/StateBar';
import './App.css';

export default function App() {
  return (
    <div className="App">
      {/* <h1>Ja<span className="highlight">mmm</span>ing</h1> */}
      <StateBar />
      <SearchBar />
      <div className="App-twolists">
        <SearchResult />
        <PlayList />
      </div>
    </div>
  );
}