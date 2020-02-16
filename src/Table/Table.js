import React from 'react';

export default props => (
    <table className="table">
        <thead>
            <tr>
<th onClick={props.onSort.bind(null, 'singer')}>Singer {props.sortField === 'singer' ? <small>{props.sort}</small>: null }</th>
                <th onClick={props.onSort.bind(null, 'song')}>Song {props.sortField === 'song' ? <small>{props.sort}</small>: null }</th>
                <th onClick={props.onSort.bind(null, 'ganre')}>Ganre {props.sortField === 'ganre' ? <small>{props.sort}</small>: null }</th>
                <th onClick={props.onSort.bind(null, 'year')}>Year {props.sortField === 'year' ? <small>{props.sort}</small>: null }</th>
            </tr>
        </thead>
        <tbody>
            {props.data.map(item =>(
                <tr>
                    <td>{item.singer}</td>
                    <td>{item.song}</td>
                    <td>{item.ganre}</td>
                    <td>{item.year}</td>
                </tr>
            ))}
        </tbody>
    </table>
)