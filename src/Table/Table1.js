import React from 'react';

export default props => (
    <table className="table">
        <thead>
            <tr>
                <th onClick={()=>props.sortBy('singer')}>Singer </th>
                <th onClick={()=>props.sortBy('song')}>Song </th>
                <th onClick={()=>props.sortBy('ganre')}>Ganre </th>
                <th onClick={()=>props.sortBy('year')}>Year </th>
            </tr>
        </thead>
        <tbody>
            {props.data.map((item,id) =>(
                <tr key={id}>
                    <td>{item.singer}</td>
                    <td>{item.song}</td>
                    <td>{item.ganre}</td>
                    <td>{item.year}</td>
                </tr>
            ))}
        </tbody>
    </table>
)