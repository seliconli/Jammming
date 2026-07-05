import React from 'react';
import { useState } from 'react';
import PlayList from './components/PlayList';
import SearchBar from './components/SearchBar';
import SearchResult from './components/SearchResult';
import StateBar from './components/StateBar';
import './App.css';
import musicCover from './assets/music1.png';


export default function App() {
  const [searchResults, setSearchResults] = useState([
    { id: 1, name: "Track 1", artist: "Artist 1", album: "Album 1" , cover: musicCover },
    { id: 2, name: 'Yellow', artist: 'Coldplay', album: 'Parachutes' ,cover: musicCover},
    { id: 3, name: 'Viva La Vida', artist: 'Coldplay', album: 'Death and All His Friends' ,cover: musicCover },
    { id: 4, name: 'Fix You', artist: 'Coldplay', album: 'X&Y' , cover: musicCover}
  ]);
  // setSearchResults()

  const [title, setTitle] = useState('My Playlist');
  function handChange({target}){
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



  return (
    <div className="App">
      <StateBar />
      <SearchBar />
      <div className="App-twolists">
        <SearchResult searchResults={searchResults} onAdd={addTrack} isRemoved={false} />
        <PlayList title={title} tracks={playlistTracks} onRemove={removeTrack} handChange={handChange} isRemoved={true} />
      </div>
    </div>
  );
}