import React from 'react';
import TrackList from './TrackList';

export default function SearchResult(props){
    return(
        <div className="SearchResult">
            <h2>Results</h2>
            <TrackList />
        </div>
    )
}