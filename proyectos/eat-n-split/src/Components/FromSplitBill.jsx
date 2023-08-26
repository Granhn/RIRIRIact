import { useState } from "react"
import Button from "./Button"


const FormSplitBill = ({friendIs, handleSplitBill}) =>{
    const [bill, setBill] = useState(0);
    const [paidByUser, setPaidByUser] = useState(0)
    const paideByFriend = bill - paidByUser
    const [whoIsPaying, setWhoIsPaying] = useState("user")
    const manageUserMoney = (e) => {
        let userMoney = e.target.value
        if(userMoney > bill) return 
        setPaidByUser(userMoney)
    }
    const manageOnSubmit = (e) => {
        e.preventDefault()
        if(!bill || !paidByUser) return;
        handleSplitBill(whoIsPaying === "user" ? paideByFriend : -paidByUser)
        setPaidByUser(0)
        setBill(0)
    }

    return(
        <form className="form-split-bill">
            <h2>Split a bill with {friendIs.name}</h2>
            <label htmlFor="Bill">Bill value</label>
            <input type="number" id="Bill" value={bill} onChange={(e) => setBill(Number(e.target.value))}/>

            <label htmlFor="YourExpense">Your expense</label>
            <input type="number" id="YourExpense" value={paidByUser} onChange={manageUserMoney}/>

            <label htmlFor="Friends">{friendIs.name}'s expense</label>
            <input type="number" id="Friends" disabled value={paideByFriend}/>

            <label htmlFor="WhosPaying">Who's paying the bill 🤑</label>
            <select name="" id="WhosPaying" value={whoIsPaying} onChange={e => setWhoIsPaying(e.target.value)}>
                <option value="user">You</option>
                <option value={friendIs.name}>{friendIs.name}</option>
            </select>
            <Button onClickEvent={manageOnSubmit}>Split bill</Button>
        </form>
    )
}
export default FormSplitBill