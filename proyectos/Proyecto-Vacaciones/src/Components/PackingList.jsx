import { useState } from "react";
import Item from "./Item";
const PackingList = ({items, onRemoveItem, onUpdateItem, clearItems}) =>{
    const [sortBy, setSortBy] = useState('input')
    let sortedItems;
    if(sortBy === 'input') sortedItems = items
    else if(sortBy === 'description') sortedItems = items.slice().sort((a,b) => a.description.localeCompare(b.description))
    else if(sortBy === "packed") sortedItems = items.slice().filter((item) => item.packed)
    
    return(
        <div className="list">
            <ul className="list">
                { sortedItems.map(item => <Item item={item} key={item.id} onRemoveItem={onRemoveItem} onUpdateItem={()=>onUpdateItem(item.id)} /> ) }
            </ul>
            <div className="actions">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="input">Sort by input order</option>
                    <option value="description">Sort by description</option>
                    <option value="packed">Sort by packed status</option>
                </select>
                <button onClick={clearItems}>Clear list</button>
            </div>
        </div>
    )
}
export default PackingList