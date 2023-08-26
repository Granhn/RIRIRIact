import Friend from "./Friend";


export default function FriendsList({friends, onSelection}){
    return(
        <ul>
            { friends.map(friend => <Friend key={friend.id} friend={friend} setFriend={onSelection}/>) }
            
        </ul>
    )
} 