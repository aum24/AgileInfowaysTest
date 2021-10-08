import React from 'react';

const Searchbox = props => {

    return (
        <div>
            Search:
            <input type="text" onChange={props.searchTextChange} />
        </div>
    );
}

export default Searchbox;