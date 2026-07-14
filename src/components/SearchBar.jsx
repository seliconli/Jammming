import React from 'react';

export default function SearchBar(props){

    const [term, setTerm] = React.useState('');

    function handleTermChange(e){
        setTerm(e.target.value);
    }

    function search(){
        props.onSearch(term);
    }

    return(
        <div className="SearchBar">
            <input type="text" placeholder="Enter A Song, Album, or Artist" onChange={handleTermChange} />
            <button className="SearchButton" onClick={search}>SEARCH</button>
        </div>
    )
}