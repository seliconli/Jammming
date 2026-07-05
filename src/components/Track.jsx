import React from 'react';
import borderCover from '../assets/border.png';
// import musicPic from '../assets/music1.png';

export default function Track({ track, onAdd, isRemoved, onRemove }) {
    return (
        <div className="Track">
            <div className="Album-cover" style={{
                backgroundImage: `url(${borderCover}),conic-gradient(from 15deg,
            rgba(255, 255, 255, 0.05) 0%,
            rgba(255, 255, 255, 0.6) 15%,
            rgba(255, 255, 255, 0.05) 30%,
            rgba(255, 255, 255, 0.05) 50%,
            rgba(255, 255, 255, 0.6) 65%,
            rgba(255, 255, 255, 0.05) 80%,
            rgba(255, 255, 255, 0.05) 100%),url(${track.cover})`
            }} ></div>
            <div className="Track-information">
                <h3 className="Song-title">{track.name}</h3>
                <p className="Song-artist">{track.artist} | {track.album}</p>
            </div>
            <button className="Track-action" onClick={() => isRemoved ? onRemove(track) : onAdd(track)}>
                {isRemoved ? "-" : "+"} 
            </button>
        </div>
    )
}