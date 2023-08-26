import { useState } from "react"
import Button from "./Button"

export default function FormAddFriend({toggleForm, addFriend}){
    const [friendName, setFriendName] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault()
        if(friendName === "" || imageUrl === "") return alert("fill both inputs")
        const newFriend = {
            name:friendName,
            id: Date.now(),
            image: `https://i.pravatar.cc/48?=${imageUrl}+${friendName}`,
            balance: 0
        }
        console.log(newFriend)
        addFriend(friends => [...friends, newFriend])
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
            <Button clickEvent={handleSubmit}>Add</Button>
        </form>
    )
}