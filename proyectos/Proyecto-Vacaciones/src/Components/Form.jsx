import { useState } from "react"
import Item from './Item'
const Form = ({ onAddItems }) =>{
    const [description, setDescription] = useState('')
    const [ quantity, setQuantity ] = useState(1)
    const handleAddItems = (item) => {
        onAddItems(item)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (description === '') return alert("Must have a description")    
        const newItem = { description, quantity, packed: false ,id:Date.now() }
        console.log(newItem)
        handleAddItems(newItem)
        setDescription("")
        setQuantity(1);
    }
    return(
        <form className="add-form">
            <h3>What do you need for your 😍 trip?</h3>
            <select onChange={(e) => setQuantity(Number(e.target.value))} value={quantity}>
                {Array.from({length : 20, },(value, index) => index+1).map(num => (<option value={num} key={num} >{num}</option>))}
            </select>
            <input type="text" placeholder="Item..." value={description} onChange={(e) => setDescription(e.target.value)}/>
            <button onClick={handleSubmit}>Submit!</button>
        </form>
    )
}

export default Form