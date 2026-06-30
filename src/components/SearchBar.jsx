import React from 'react';

export default function SearchBar(props){
    return(
        <div className="SearchBar">
            <input type="text" placeholder="Enter A Song, Album, or Artist" />
            <button className="SearchButton">SEARCH</button>
        </div>
    )
}