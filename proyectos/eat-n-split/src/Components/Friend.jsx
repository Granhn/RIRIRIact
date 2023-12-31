import Button from "./Button"
export default function Friend({friend, setFriend, selectedFriend}){
    const isSelected = selectedFriend?.id === friend.id;
    const handleSetFriend = () => {
        setFriend(friend);
        toggleForm()
    }
    return(
        <li className={isSelected ? "selected": ""}>
            <img src={friend.image} alt={`Image of ${friend.name}`}></img>
            <h3>{friend.name}</h3>
            {friend.balance > 0 && <p className="green">{friend.name} owes you {Math.abs(friend.balance)}$ </p>}
            {friend.balance < 0 && <p className="red">You owe {friend.name} {Math.abs(friend.balance)}$</p>} 
            {friend.balance === 0 && <p>{friend.name} and you are good :$</p>}   
            <Button onClickEvent={() => setFriend(friend)}>{ isSelected ? "Close" : "Select" }</Button>
        </li>
    )
} 