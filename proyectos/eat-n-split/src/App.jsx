import FriendsList from "./Components/FriendsList";
import FormAddFriend from "./Components/FormAddFriend";
import Button from "./Components/Button";
import FormSplitBill from "./Components/FromSplitBill";
import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
export default function App(){
  const [friends, setFriends ] = useState([...initialFriends])
  const [showFormFriend, setShowFormFriend] = useState(false)
  const [selectedFriend, setSelectedFriend] = useState(null);
  const handleTogleFormFriend = () => setShowFormFriend(showForm => !showForm)
  const handleSelection = (friend) => {
    setSelectedFriend((selected) => selected?.id === friend.id ? null : friend)
    setShowFormFriend(false)
  }
  const handleSplitBill = (currency) => {
    setFriends(friends => friends.map(friend => friend.id === selectedFriend.id ? {...friend, balance:friend.balance + currency} : friend))
    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} onSelection={handleSelection} selectedFriend={selectedFriend}/>
        {showFormFriend && <FormAddFriend toggleForm={() => setShowFormFriend(setShowF => !setShowF)} addFriend={setFriends}/>} 
        <Button onClickEvent={handleTogleFormFriend}>{showFormFriend ? "Close" : "Add friend!"}</Button>
      </div>
      {selectedFriend && <FormSplitBill friendIs={selectedFriend} setFriend={handleSelection} handleSplitBill={handleSplitBill}/>}
    </div>
  )
}