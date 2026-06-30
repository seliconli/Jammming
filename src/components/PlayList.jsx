import React from 'react';
import TrackList from './TrackList';

export default function PlayList(props){
    return(
        <div className="PlayList">
            <h2>PlayList</h2>
            <TrackList />
            <button className="PlayList-save">SAVE TO SPOTIFY</button>
        </div>
    )
} 