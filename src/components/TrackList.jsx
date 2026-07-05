import React from 'react';
import Track from './Track';

export default function TrackList({ tracks, onAdd, onRemove, isRemoved }) {
    return(
        <div className="TrackList">
            {
                tracks && tracks.map(track => <Track key={track.id} track={track} onAdd={onAdd} onRemove={onRemove} isRemoved={isRemoved} />)
            }
        </div>
    )
}
