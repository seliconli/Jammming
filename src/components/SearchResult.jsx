import React from 'react';
import TrackList from './TrackList';

export default function SearchResult({ searchResults, onAdd, isRemoved }) {
    
    return(
        <div className="SearchResult">
            <h2>Results</h2>
            <TrackList tracks={searchResults} onAdd={onAdd} isRemoved={isRemoved}/>
        </div>
    )
}