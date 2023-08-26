import Friend from "./Friend";


export default function FriendsList({friends, onSelection,selectedFriend}){
    return(
        <ul>
            { friends.map(friend => <Friend key={friend.id} friend={friend} setFriend={onSelection} selectedFriend={selectedFriend}/>) }
            
        </ul>
    )
} 