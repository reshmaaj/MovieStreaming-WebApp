import React from 'react'


const Search = ({searchTerm, setsearchTerm}) => {
  return (
    <div className="search">
      <div>
        <img src='./search.svg' alt=''/>
        <input
        type='text'
        placeholder='Search for a Movie'
        value={searchTerm}
        onChange={(e) => setsearchTerm(e.target.value)}/>
      </div>
      
      </div>
  )
}

export default Search
