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
  const [selectedId, setSelecetedId] = useState(null);
  const handleSelectedMovie = (id) => setSelecetedId(selected => selected === id? null : id);
  const handdleRemoveMovie = () => setSelecetedId(null)
  useEffect(() => {
    const getMovies = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`)
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
          {!isLoading && !error && <MovieList movies={movies} setSelecetedId={handleSelectedMovie}/>}
          {error && <ErrorMsg msg={error}/>}
        </Box>
        <Box>
          {
            selectedId? (<MovieDetails selectedId={selectedId} handdleRemoveMovie={handdleRemoveMovie}/>) : 
            (<>
              <WatchedSummary watched={watched}/>
              <WatchedMoviesList watched={watched}/>
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


function MovieList({movies, setSelecetedId}){
  
  return(
    <ul className="list list-movies">
              {movies?.map((movie) => <Movie movie={movie} key={movie.imdbID} setSelecetedId={setSelecetedId}/>)}
            </ul>
  )
}
function Movie({movie, setSelecetedId}){
  return(
    <li key={movie.imdbID} onClick={() => setSelecetedId(movie.imdbID)}>
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
function MovieDetails({selectedId, handdleRemoveMovie}){
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  
  useEffect(() =>{
    const getMovieDetails = async() =>{
      try {
        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`)
        const data = await res.json()
        setMovie(data)
      } catch (error) {
        console.log(error)
      }
    }
    getMovieDetails()
  },[])
  return(
    <div className="details">
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
          <StarRating maxRating={10} size={24}/>
        </div>
        <p><em>{movie.Plot}</em></p>
        <p>Starring {movie.Actors}</p>
        <p>Directed by {movie.Director}</p>
      </section>
      <button className="btn-back" onClick={handdleRemoveMovie}>&larr;</button>
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
function WatchedMoviesList({watched}){
  return( 
    <ul className="list">
                {watched.map((movie) => <WatchedMovie key={movie.imdbID} movie={movie}/>)}
              </ul>
  )
}
function WatchedMovie({movie}){
  return(
    <li key={movie.imdbID}>
                    <img src={movie.Poster} alt={`${movie.Title} poster`} />
                    <h3>{movie.Title}</h3>
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