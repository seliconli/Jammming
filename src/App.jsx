import React from 'react';
import { useState } from 'react';
import PlayList from './components/PlayList';
import SearchBar from './components/SearchBar';
import SearchResult from './components/SearchResult';
import StateBar from './components/StateBar';
import './App.css';
import musicCover from './assets/music1.png';
import Netease from './util/Netease.js';

export default function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [title, setTitle] = useState('My Playlist');
  function handChange({ target }) {
    setTitle(target.value);
  }

  const [playlistTracks, setPlaylistTracks] = useState([]);
  function addTrack(track) {
    console.log("添加成功，歌曲名称：", track.name);
    // playlistTracks.find(item => (item.id !== track.id) ? setPlaylistTracks(prev => [track, ...prev]) : null)
    const isAllreadyInPlaylist = playlistTracks.find(item => item.id === track.id);
    isAllreadyInPlaylist ? null : setPlaylistTracks(prev => [track, ...prev]);
  }
  function removeTrack(track) {
    console.log("移除成功，歌曲名称：", track.name);
    setPlaylistTracks(prev => prev.filter(item => item.id !== track.id));
  }

  async function search(term) {
    if (!term) return;
    console.log("正在搜索：", term);
    const results = await Netease.search(term);
    console.log("搜索结果：", results);
    setSearchResults(results);
  }

  return (
    <div className="App">
      <StateBar />
      <SearchBar onSearch={search} />
      <div className="App-twolists">
        <SearchResult searchResults={searchResults} onAdd={addTrack} isRemoved={false} />
        <PlayList title={title} tracks={playlistTracks} onRemove={removeTrack} handChange={handChange} isRemoved={true} />
      </div>
    </div>
  );

}