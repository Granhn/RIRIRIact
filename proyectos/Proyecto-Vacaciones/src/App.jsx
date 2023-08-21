//import Logo from "./Components/Logo"
import Form from "./Components/Form"
import PackingList from "./Components/PackingList"
import Stats from "./Components/Stats"
import Logo from "./Components/Logo"
import './App.css'



const App = () =>{
  return(
    <>
      <Logo />
      <main>
        <Form />
        <PackingList />
      </main>
      <Stats />
    </>
  )
}

export default App