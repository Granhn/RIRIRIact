import Button from "./Button"

const FormSplitBill = () =>{
    return(
        <form className="form-split-bill">
            <h2>Split a bill with "FRIEND"</h2>
            <label htmlFor="Bill">Bill value</label>
            <input type="number" id="Bill" />
            <label htmlFor="YourExpense">Your expense</label>
            <input type="number" id="YourExpense"/>
            <label htmlFor="Friends">X's expense</label>
            <input type="number" id="Friends" disabled/>
            <label htmlFor="WhosPaying">Who's paying the bill 🤑</label>
            <select name="" id="WhosPaying">
                <option value="">You</option>
                <option value="">X</option>
            </select>
            <Button>Split bill</Button>
        </form>
    )
}
export default FormSplitBill