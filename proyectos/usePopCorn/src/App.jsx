import { useState, useEffect, useRef } from "react";
import StarRating from "./StarRating";
import { useGetMovies } from "./useGetMovies";
import { useLocalStorageState } from "./useLocalStorageState"
import { useKey } from "./useKey";
const KEY = "33e238fc";

export default function App() {

  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useLocalStorageState([],"watched");

  const handleSelectedMovie = (id) => setSelectedId(selected => selected === id? null : id);
  const handdleRemoveMovie = () => setSelectedId(null)
  const handleWatchedMovie = (movie) => setWatched(watchedMovies => [...watchedMovies,movie])
  const handleRemoveMovie = (watchedMovie) =>{
    setWatched(watched => watched.filter(movie => movie.imbdID != watchedMovie.imbdID)) 
  }
  const { movies, isLoading, error } = useGetMovies(query/*, handdleRemoveMovie*/)
  

  
  
  
   return (
    <>
      <Navbar > 
        <Search query={query} setQuery={setQuery}/>
        <NumResults movies={movies}/>
      </Navbar>
      <Main movies={movies}>
        <Box movies={movies}>
          {isLoading && <Loader />}  
          {!isLoading && !error && <MovieList movies={movies} setSelectedId={handleSelectedMovie}/>}
          {error && <ErrorMsg msg={error}/>}
        </Box>
        <Box>
          {
            selectedId? (<MovieDetails selectedId={selectedId} handdleRemoveMovie={handdleRemoveMovie} handleWatchedMovie={handleWatchedMovie} watched={watched}/>) : 
            (<>
              <WatchedSummary watched={watched}/>
              <WatchedMoviesList watched={watched} handleRemoveMovie={handleRemoveMovie}/>
            </>)
          }
        </Box>
      </Main>
    </>
  );
}
const Loader = () => <p className="loader">Just Loading</p>
const ErrorMsg = ({msg}) => <p className="error">⛔️ {msg} ⛔️</p>
const average = (arr) => arr?.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function Navbar({children}){
  return(
    <nav className="nav-bar">
      <Logo />
      {children}    
    </nav>
  )
}
function NumResults({movies}){
  return(
    <p className="num-results">
          Found <strong>{movies?.length}</strong> results
        </p>
  )
}
function Logo(){
  return(
    <div className="logo">
          <span role="img">🍿</span>
          <h1>usePopcorn</h1>
    </div>
  )
}

function Search({query, setQuery}){
  const inputElement = useRef(null);
  useKey("Enter",() => {
    if(document.activeElement  === inputElement.current) return;
    inputElement.current.focus()
    setQuery("")
  })

  return(
    <input
          className="search"
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          ref={inputElement}
      />
  )
}
function Main({children}){
  return(
    <main className="main">
        {children}
    </main>
  )
}


function MovieList({movies, setSelectedId}){
  
  return(
    <ul className="list list-movies">
              {movies?.map((movie) => <Movie movie={movie} key={movie.imdbID} setSelectedId={setSelectedId}/>)}
            </ul>
  )
}
function Movie({movie, setSelectedId}){
  return(
    <li key={movie.imdbID} onClick={() => {setSelectedId(movie.imdbID)}}>
                  <img src={movie.Poster} alt={`${movie.Title} poster`} />
                  <h3>{movie.Title}</h3>
                  <div>
                    <p>
                      <span>🗓</span>
                      <span>{movie.Year}</span>
                    </p>
                  </div>
                </li>
  )
}
function MovieDetails({selectedId, handdleRemoveMovie, handleWatchedMovie, watched}){
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const [userRating, setUserRating] = useState('')
  const countRef = useRef(0)
  
  const isWatched = watched.map(movie => movie.imbdID).includes(selectedId)
  const watchedMovieRating = watched.find(movie => movie.imbdID === selectedId)?.userRating

  useEffect(() => {
    if(userRating > 0) countRef.current = countRef.current + 1
  },[userRating])

  useKey('Escape',handdleRemoveMovie)

  useEffect(() => {
    document.title = `Movie🍿 | ${movie.Title}`
    return () => document.title = "UsePopCorn!🍿"
  },[movie])
  
  useEffect(() =>{
    const controller = new AbortController()
    const {signal} = controller
    const getMovieDetails = async() =>{
      setLoading(true);
      try {
        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`,{ signal })
        const data = await res.json()
        setMovie(data)
      } catch (error) {
        console.log(error)
      }
      finally{
        setLoading(false)
      }
    }
    getMovieDetails()
    return () => controller.abort()
  },[selectedId])
  const handleAdd= ()=>{
    const newWatchedMovie = {
      imbdID: selectedId,
      title: movie.Title,
      poster: movie.Poster,
      year: movie.Year,
      imdbRating: Number(movie.imdbRating),
      runtime: Number(movie.Runtime.split(" ").at(0)),
      userRating

    }
    handleWatchedMovie(newWatchedMovie)
    handdleRemoveMovie()
    setUserRating(0)
  }
  return(
    <div className="details">
      {loading && <Loader/>}
      {!loading && movie && 
      <>
        <header>
          <img src={movie.Poster} alt={`Poster of the movie ${movie.Title}`} />
          <div className="details-overview">
            <h2>{movie.Title}</h2>
            <p>
              {movie.Released} &bull; {movie.Runtime}
            </p>
            <p>{movie.Genre}</p>
            <p><span>⭐️</span>{movie.imdbRating} rating on imdb</p>
          </div>
        </header>
        <section>
          <div className="rating">
            {!isWatched ? <>
              <StarRating maxRating={10} size={24} onSetRating={setUserRating}/>
              {userRating > 0 &&  <button className="btn-add" onClick={(handleAdd)}>Add to list</button>}
            </> : <p>You have watched the movie, you gave it a total of {watchedMovieRating}⭐️</p>}    
          </div>
          <p><em>{movie.Plot}</em></p>
          <p>Starring {movie.Actors}</p>
          <p>Directed by {movie.Director}</p>
        </section>
        <button className="btn-back" onClick={handdleRemoveMovie}>&larr;</button>
      </>
      }
    </div>
  )
}
function Box({children}){ 
  const [isOpen, setIsOpen] = useState(true);
  return(
    <div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? "–" : "+"}
          </button>
          {isOpen && children}
        </div>
  )
}

function WatchedBox(){
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen2, setIsOpen2] = useState(true);
  
  return(
    <div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen2((open) => !open)}
          >
            {isOpen2 ? "–" : "+"}
          </button>
          {isOpen2 && (
            <>
              <WatchedSummary watched={watched}/>
              <WatchedMoviesList watched={watched}/>
              
            </>
          )}
        </div>
  )
}
function WatchedMoviesList({watched, handleRemoveMovie}){
  return( 
    <ul className="list">
                {watched?.map((movie) => <WatchedMovie key={movie.imbdID} movie={movie} handleRemoveMovie={handleRemoveMovie}/>)}
              </ul>
  )
}
function WatchedMovie({movie, handleRemoveMovie}){
  return(
    <li>
                    <img src={movie.poster} alt={`${movie.title} poster`} />
                    <h3>{movie.title}</h3>
                    <div>
                      <p>
                        <span>⭐️</span>
                        <span>{movie.imdbRating}</span>
                      </p>
                      <p>
                        <span>🌟</span>
                        <span>{movie.userRating}</span>
                      </p>
                      <p>
                        <span>⏳</span>
                        <span>{movie.runtime} min</span>
                      </p>
                      <button className="btn-delete" onClick={() => handleRemoveMovie(movie)}>X</button>
                    </div>
                  </li>
  )
}

function WatchedSummary({watched}){
  const avgImdbRating = average(watched?.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched?.map((movie) => movie.userRating));
  const avgRuntime = average(watched?.map((movie) => movie.runtime));
  return(
    <div className="summary">
                <h2>Movies you watched</h2>
                <div>
                  <p>
                    <span>#️⃣</span>
                    <span>{watched?.length} movies</span>
                  </p>
                  <p>
                    <span>⭐️</span>
                    <span>{avgImdbRating}</span>
                  </p>
                  <p>
                    <span>🌟</span>
                    <span>{avgUserRating}</span>
                  </p>
                  <p>
                    <span>⏳</span>
                    <span>{avgRuntime} min</span>
                  </p>
                </div>
              </div>
  )
}