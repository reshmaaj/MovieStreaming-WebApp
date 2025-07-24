import React, { useState } from 'react'
import Search from './components/Search'


const App = () => {
   const [searchTerm, setsearchTerm] = useState('');

    
  return (
     <main>
            <div className="pattern" />
            <div className="wrapper">
                <header>
                    <img src='./hero.png' alt='heroimg'/>
                    <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle </h1>
                </header> 
                 <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm} /> 
                 <h1 className='text-white'>{searchTerm}</h1>
            </div>
            
        </main>
  )
}

export default App