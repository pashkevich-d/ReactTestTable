import React from 'react';

const Pagination = ({postsPerPage, totalPosts, paginate, currentPage}) => {

    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalPosts/postsPerPage); i++){
        pageNumbers.push(i)
    }

    return (
        <nav className="pagination">
            {pageNumbers.map(number => (
                <li key={number}>
                    <span className={currentPage == number ? "active-page" : null} onClick={()=>paginate(number)}>{number}</span> 
                </li>
            ))}
        </nav>
    )
}

export default Pagination;