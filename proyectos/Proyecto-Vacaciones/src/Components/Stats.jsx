
const Stats = ({totalItems, porcentagePackedItems, totalPackedItems}) =>{
    return(
        <footer className="stats">
            <em><h3>💼You have {totalItems} items on your list, and you already paacked {totalPackedItems} ({porcentagePackedItems}%)</h3></em>
        </footer>
    )
}
export default Stats