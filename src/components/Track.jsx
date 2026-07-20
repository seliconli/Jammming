import React, { useState, useRef,useEffect } from 'react';
import borderCover from '../assets/border.png';
// import musicPic from '../assets/music1.png';

export default function Track({ track, onAdd, isRemoved, onRemove,currentPlayId,onPlay }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(()=>{
        if(currentPlayId !== track.id && isPlaying){
            audioRef.current.pause();
            setIsPlaying(false);
    }},[currentPlayId])
        
    const handlePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
            onPlay(null);
        } else {
            audioRef.current.play();
            onPlay(track.id);
        }
        setIsPlaying(!isPlaying);
    }

    // const handleTimeUpdate

    function handleTimeUpdate() {
        const currentTime = audioRef.current.currentTime;
        const totalTime = audioRef.current.duration;
        const currentProgress = totalTime ? (currentTime / totalTime) * 100 : 0;
        setProgress(currentProgress);
    }

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
            <div className='player'>
                <audio ref={audioRef} src={track.preview} onTimeUpdate={handleTimeUpdate} onEnded={() => setIsPlaying(false)}></audio>
                <button className="play-button" onClick={handlePlay}>
                    {isPlaying ? "||" : ">"}
                </button>
                <div className="progress-bar">
                    <div className="progress" style={{ width: `${progress}%` }}></div>
                </div>
                <a href={track.preview} download={`${track.name}-${track.artist}.mp3`}>
                    下载
                </a>

            </div>

            <button className="Track-action" onClick={() => isRemoved ? onRemove(track) : onAdd(track)}>
                {isRemoved ? "-" : "+"}
            </button>
        </div>
    )
}