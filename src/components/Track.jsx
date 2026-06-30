import React from 'react';

export default function Track(props){
    return(
        <div className="Track">

            <div className="Track-information">
                <h3 className="Song-title">Song Title (Hardcoded)</h3>
                <p className="Song-artist">Artist Name | Album Name</p>
            </div> 
                <button className="Track-action">+</button>
            </div> 
    )
}