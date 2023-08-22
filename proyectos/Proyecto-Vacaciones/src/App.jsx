//import Logo from "./Components/Logo"
import Form from "./Components/Form"
import PackingList from "./Components/PackingList"
import Stats from "./Components/Stats"
import Logo from "./Components/Logo"
import './App.css'
import { useState } from "react"



const App = () =>{
  const [items, setItems] = useState([]);
  const totalItems = items.length
  const totalPackedItems = items.reduce((acc,item) => (item.packed ? acc + 1: 0 ), 0)
  const porcentagePackedItems = Math.round((totalPackedItems * 100) / totalItems)
  const handleAddItems = (item) => {
    setItems(items => [...items, item])
  }
  const handleChangeItem = (id) => {
    setItems(items => items.map(item => item.id === id ? {...item, packed: !item.packed} : item))
  }
  const handleRemoveItem = (item) => {
    setItems(items.filter(i => i !== item))
  }
  const clearItems = () => setItems([])
  return(
    <>
      <Logo />
      <main>
        <Form onAddItems={handleAddItems}/>
        <PackingList items={items} onRemoveItem={handleRemoveItem} onUpdateItem={handleChangeItem } clearItems={clearItems}/>
      </main>
      <Stats totalItems={totalItems} porcentagePackedItems={porcentagePackedItems} totalPackedItems={totalPackedItems}/>
    </>
  )
}

export default App