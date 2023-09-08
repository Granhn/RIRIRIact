export function useGetFetch(url,controller){
    
    
    let data = ""
    let fetchError = ""
    const fetchData = async () => {
        try {
            const res = await fetch(url,{signal : controller.signal})
            data = await res.json();
            setMovies(data.Search)  
            setError("")
          } catch (error) {
            console.log(error);
            fetchError = error
          }
          finally{
            setIsLoading(false);
          }
    }
    fetchData()
    return { data, fetchError }
}