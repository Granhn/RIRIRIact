import Item from "./Item";
const PackingList = ({items, onRemoveItem, onUpdateItem}) =>{
    return(
        <div className="list">
            <ul className="list">
                { items.map(item => <Item item={item} key={item.id} onRemoveItem={onRemoveItem} onUpdateItem={()=>onUpdateItem(item.id)} /> ) }
            </ul>
        </div>
    )
}
export default PackingList