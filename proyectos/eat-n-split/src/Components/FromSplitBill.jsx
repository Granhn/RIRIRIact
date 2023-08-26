import Button from "./Button"

const FormSplitBill = ({friendIs, setFriend}) =>{
    return(
        <form className="form-split-bill">
            <h2>Split a bill with {friendIs.name}</h2>
            <label htmlFor="Bill">Bill value</label>
            <input type="number" id="Bill" />
            <label htmlFor="YourExpense">Your expense</label>
            <input type="number" id="YourExpense"/>
            <label htmlFor="Friends">{friendIs.name}'s expense</label>
            <input type="number" id="Friends" disabled/>
            <label htmlFor="WhosPaying">Who's paying the bill 🤑</label>
            <select name="" id="WhosPaying">
                <option value="">You</option>
                <option value="">{friendIs.name}</option>
            </select>
            <Button onClickEvent={() => setFriend(null)}>Split bill</Button>
        </form>
    )
}
export default FormSplitBill