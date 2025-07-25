import React, { useEffect,useState } from 'react'
import Search from './components/Search'
// import Spinner from './components/Spinner'

const API_BASE_URL = "https://api.themoviedb.org/3"; //copy base url from tmdb api doc  
const API_KEY = import.meta.env.VITE_TMDB_API_KEY; //import the key from env file
const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json', //kind of data that'll be accepted
        Authorization: `Bearer ${API_KEY }` //authorises the person trying to access the api key.. i.e. meee
    }
}

const App = () => {

   const [searchTerm, setsearchTerm] = useState('');
   const [errorMessage, setErrorMessage] = useState('');
   const [movieList, setMovieList] = useState([]);
   const [isLoading, setIsLoading] = useState(false);


   const fetchMovies = async () => {

    setIsLoading(true);
    setErrorMessage('');
    try{ //here we'll bring in the movies
        const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
        
        const response = await fetch(endpoint, API_OPTIONS); //fetch is used to get APIs from dataset n display on the website

        if(!response.ok) {
            throw new Error('Failed to fetch movies');

        }

        const data = await response.json();

        if(data.Response == 'False') {
            setErrorMessage(data.Error || 'Failed to fetch movies');
            setMovieList([]); //if it fails to fetch movies 
            return; //quit or exit outta func
        }
        
        setMovieList(data.results || []);

        // console.log(data)
        // alert(response);
    }
    
    catch (error) {
        console.error(`Error fetching movies:`, error);
        setErrorMessage('Error fetching movies. Please try again later.');
    }
    finally{
        setIsLoading(false); //whether we succeed or fail, we need to stop the loading
    }
  
   }

   useEffect(() => {
  fetchMovies(); //func to fetch all the movies from DB via API
}, []);


    
  return (
     <main>
            <div className="pattern" />
            <div className="wrapper">
                <header>
                    <img src='./hero.png' alt='heroimg'/>
                    <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle </h1>

                 <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm} /> 

                </header> 
                 {/* <h1 className='text-white'>{searchTerm}</h1> */}

                 <section className='all-movies'>
                    <h2 className="mt-20">All Movies</h2>  

                    {isLoading ? (  //if loading
                        // <Spinner />
                        <p className='text-white'>Loading....</p>
                    ) : errorMessage ? ( //if there's an error
                        <p className='text-red-500'>{errorMessage}</p>
                    ) : (  //neither loading nor showing error
                        <ul>
                            {movieList.map((movie) => (
                                <p key={movie.id} className='text-white'>{movie.title}</p>
                            ))}

                        </ul>
                    ) }

                    {/* {errorMessage && <p className='text-red-500'>{errorMessage}</p>} */}

                 </section>
            </div>
            
        </main>
  )
}

export default App
