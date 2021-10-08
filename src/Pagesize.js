import React from 'react';

const PageSize = props => {
    return (
        <div>
            Pagesize :
            <select value={props.defaultPageSize} onChange={props.getLatestPageSize}>
                {props.pageSizeList.map(a =>
                    <option key={a} value={a}>{a}</option>
                )}
            </select>
        </div>
    );
}

export default PageSize;