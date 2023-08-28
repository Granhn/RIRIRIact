import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
//import './index.css'
import StarRating from './StarRating.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/*<App />*/}
    <StarRating maxRating={20} size={40} messages={["bad","good","naaaashee","coscu","es","gooooooood"]}/>
    <StarRating maxRating={20} color={"#f3f3"} messages={["bad","good","naaaashee","coscu","es","gooooooood"]}/>
  </React.StrictMode>,
)
