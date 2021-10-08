import React from 'react';
import PageSize from './Pagesize';
import Pagination from './Pagination';
import Searchbox from './Searchbox';
import users from './data/users.json';

const DataTable = () => {
    const [data, SetData] = React.useState(users);
    const [filterData, setFilterData] = React.useState(users);
    const [to, SetTo] = React.useState(1);
    const [from, SetFrom] = React.useState(10);
    const [pagenum, SetPagenum] = React.useState(1);
    const [total, SetTotal] = React.useState(1000);
    const [pageSize, SetPageSize] = React.useState(10);

    React.useEffect(() => {
        let value = pageSize * pagenum;
        SetFrom(value - pageSize + 1);
        if (value > total)
            SetTo(total)
        else
            SetTo(value);
        let data = [...filterData];
        let pageData = data.filter((val, index) => {
            if (index >= (value - pageSize) && index <= (value - 1)) {
                return val;
            }
            else {
                return null;
            }
        });
        SetData(pageData);
    }, [pagenum, pageSize, filterData, total])

    const getLatestPageSize = pageSize => {
        if (pageSize.target.value) {
            SetPageSize(pageSize.target.value);
            SetTo(1);
            SetPagenum(1);
        }

    }

    const searchTextChange = event => {
        const value = event.target.value;
        if (value) {
            const filterdata = users.filter(a =>
            (a.username.includes(value)
                || a.first_name.includes(value) || a.last_name.includes(value)
                || a.dob.includes(value) || (a.country && a.country.includes(value))
                || a.email.includes(value) || a.gender.includes(value))
            );
            setFilterData(filterdata);
            SetTotal(filterdata.length);
            SetTo(1);
            SetPagenum(1);
        }
        else {
            setFilterData(users);
            SetTotal(users.length);
            SetTo(1);
            SetPagenum(1);
        }
    }

    const previousPage = () => {
        if ((pagenum - 1) < 0) {
            SetPagenum(1);
        }
        else {
            SetPagenum(pagenum - 1);
        }
    }

    const nextPage = () => {
        if ((pagenum + 1) > total) {
            SetPagenum(total);
        }
        else {
            SetPagenum(pagenum + 1);
        }
    }

    return (
        <>
            <PageSize defaultPageSize={pageSize} pageSizeList={[10, 25, 50, 100]} total={total} getLatestPageSize={getLatestPageSize} />
            <Searchbox searchTextChange={searchTextChange} />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">UserName</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Gender</th>
                        <th scope="col">DOB</th>
                        <th scope="col">Country</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.length && data.map(d => {
                        return (<tr key={d.id}>
                            <th scope="row">{d.id}</th>
                            <td>{d.username}</td>
                            <td>{d.first_name}</td>
                            <td>{d.last_name}</td>
                            <td>{d.email}</td>
                            <td>{d.gender}</td>
                            <td>{d.dob}</td>
                            <td>{d.country}</td>
                        </tr>)
                    })}
                </tbody>
            </table>
            <Pagination to={to} from={from} pagenum={pagenum}
                previousPage={previousPage} nextPage={nextPage} total={total} />
        </>
    );
}

export default DataTable;