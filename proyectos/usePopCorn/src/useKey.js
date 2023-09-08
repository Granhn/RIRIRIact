import { useEffect } from "react"
export function useKey(key , callback){
    useEffect(() => {
        const addKeyDown = (e) => {
          if (e.code.toLowerCase() === key.toLowerCase()) callback?.()
        }
        document.addEventListener("keydown", addKeyDown)
        return () => document.removeEventListener("keydown",addKeyDown)
      },[callback, key])
      return 
}