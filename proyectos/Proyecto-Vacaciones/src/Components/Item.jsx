import { useState } from "react"

const Item = ({item, onRemoveItem, onUpdateItem}) =>{
    const handleCheckBox = (id) => onUpdateItem(id)
    return(
       <li style={item.packed ? {textDecoration:"line-trough"} : {}}>
            <input type="checkbox" value={item.checked} onChange={() => handleCheckBox(item.id)} />
            <span style={item.packed ? {textDecoration : "line-through"} : {}}>{`${item.description}: ${item.quantity}`}</span>
            <button onClick={e => onRemoveItem(item)}>❎</button>
        </li>
    )
}

export default Item