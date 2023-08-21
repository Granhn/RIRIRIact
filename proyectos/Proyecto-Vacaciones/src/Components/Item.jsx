
const Item = ({item, onRemoveItem}) =>{
    return(
       <li>
            <span style={item.packed ? {textDecoration : "line-through"} : {}}>{`${item.description}: ${item.quantity}`}</span>
            <button onClick={e => onRemoveItem(item)}>❎</button>
        </li>
    )
}

export default Item