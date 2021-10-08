import React from 'react';

const Pagination = props => {

    return (
        <div>
            Showing {props.from} to {props.to} of {props.total}
            <button onClick={props.previousPage}>Previous</button>
            <label>{props.pagenum}</label>
            <button onClick={props.nextPage}>Next</button>
        </div>
    );
}

export default Pagination;