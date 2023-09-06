import { useState, useEffect } from "react";
import StarRating from "./StarRating";
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];
const KEY = "33e238fc";


export default function App() {
  const [watched, setWatched] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("")
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const handleSelectedMovie = (id) => setSelectedId(selected => selected === id? null : id);
  const handdleRemoveMovie = () => setSelectedId(null)
  const handleWatchedMovie = (movie) => setWatched((movies) => {
    if(!movies.includes(movie)) return [...movies, movie]
    return console.log("Movie already in teh movies array")
  })
  const handleRemoveMovie = (watchedMovie) =>setWatched(watched => watched.filter(movie => movie.imbdID != watchedMovie.imbdID)) 
  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller
    const getMovies = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,{ signal })
        const data = await res.json();
        setMovies(data.Search)  
        setError("")
      } catch (error) {
        console.log(error);
        setError("Ocurrio un error con tus peliculas :/, vuelve a intentar")
      }
      finally{
        setIsLoading(false);
      }
    }
    if(!query.length) setMovies([])
    getMovies();
    return () => controller.abort()
  },[query])
  
  
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
const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

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
  return(
    <input
          className="search"
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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
    <li key={movie.imdbID} onClick={() => setSelectedId(movie.imdbID)}>
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
  
  const isWatched = watched.map(movie => movie.imbdID).includes(selectedId)
  const watchedMovieRating = watched.find(movie => movie.imbdID === selectedId)?.userRating
  useEffect(() => {
    const addKeyDown = (e) => {
      if (e.code === 'Escape') handdleRemoveMovie()
    }
    document.addEventListener("keydown", addKeyDown)
    return () => document.removeEventListener("keydown",addKeyDown)
  },[handdleRemoveMovie])

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
                {watched.map((movie) => <WatchedMovie key={movie.imbdID} movie={movie} handleRemoveMovie={handleRemoveMovie}/>)}
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
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return(
    <div className="summary">
                <h2>Movies you watched</h2>
                <div>
                  <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
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