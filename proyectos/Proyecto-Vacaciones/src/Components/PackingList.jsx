import Item from "./Item";

const initialItems = [
    { id: 1, description: "Passports", quantity: 2, packed: false },
    { id: 2, description: "Socks", quantity: 12, packed: false },
    { id: 3, description: "Jacket", quantity: 3, packed: true },
  ];
const PackingList = () =>{
    return(
        <div className="list">
            <ul className="list">
                { initialItems.map(item => <Item item={item} key={item.id}/> ) }
            </ul>
        </div>
    )
}
export default PackingList