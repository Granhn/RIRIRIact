import { useEffect, useState } from "react";
const KEY = "33e238fc";
export function useGetMovies(query/*, callback*/){

    const [isLoading, setIsLoading] = useState(false);
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState("")

    useEffect(() => {
        //callback?.()
        let controller = new AbortController()
        const { signal } = controller
        setIsLoading(true)
        const getMovies = async () => {
          try {
            const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,{ signal })
            const data = await res.json();
            setMovies(data.Search)  
            setError("")
          } catch (error) {
            setError("Ocurrio un error con tus peliculas :/, vuelve a intentar")
          }
          finally{
            setIsLoading(false);
          }
        }
        getMovies()
        return () => controller.abort()
    
      },[query])
      return { movies, isLoading, error }


}