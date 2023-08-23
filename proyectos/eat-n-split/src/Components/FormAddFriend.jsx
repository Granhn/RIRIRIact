import { useState } from "react"
import Button from "./Button"
export default function FormAddFriend({toggleForm}){
    const [friendName, setFriendName] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault()
        if(friendName === "" || imageUrl === "") return alert("fill both inputs")
        const newFriend = {
            name:friendName,
            id: crypto.randomUUID,
            image: `https://i.pravatar.cc/48?=${imageUrl}+${friendName}`,
        }
        console.log(newFriend)
        setFriendName("")
        setImageUrl("")
        toggleForm()
    }
    return(
        <form className="form-add-friend" onSubmit={handleSubmit}>
            <label htmlFor="addFriend">Add a friend</label>
            <input type="text" id="addFriend" value={friendName} onChange={(e) => setFriendName(e.target.value)}/>

            <label htmlFor="imageUrl">Image url</label>
            <input type="text" id="imageUrl"value={imageUrl} onChange={(e)=> setImageUrl(e.target.value)} />
            <Button >Add</Button>
        </form>
    )
}