import FriendsList from "./Components/FriendsList";
import FormAddFriend from "./Components/FormAddFriend";
import Button from "./Components/Button";
import FormSplitBill from "./Components/FromSplitBill";
import { useState } from "react";
export default function App(){
  const [showFormFriend, setShowFormFriend] = useState(false)
  const handleTogleFormFriend = () => setShowFormFriend(showForm => !showForm)
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        {showFormFriend && <FormAddFriend toggleForm={() => setShowFormFriend(setShowF => !setShowF)}/>} 
        <Button clickEvent={handleTogleFormFriend}>{showFormFriend ? "Close" : "Add friend!"}</Button>
      </div>
      <FormSplitBill></FormSplitBill>
    </div>
  )
}