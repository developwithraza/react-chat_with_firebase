import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../pages/context/AuthContext'
import { ChatContext } from '../pages/context/ChatContext'
import { db } from '../pages/Firebase'

function ChatUserList() {
    const [chats, setChats] = useState([])
    const { currentUser } = useContext(AuthContext)
    const { dispatch } = useContext(ChatContext)


    useEffect(() => {
        const getUserList = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data())
            })
            return () => {
                unsub();
            }

        }
        currentUser.uid && getUserList()

    }, [currentUser.uid])


const handleSelect=(us)=>{
    dispatch({type:"CHANGE_USER",payload:us})
}
    return (
        <div className="chats">
            {Object.entries(chats)?.sort((a,b)=>b[1].date-a[1].date).map(chat => {
                return(
                <div className="userChats" key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
                    <img src={chat[1].userInfo.photoURL} alt='' />
                    <div className="user_chat_info">
                        <span style={{fontSize:"1rem"}}>{chat[1].userInfo.displayName}</span>
                        <p style={{fontSize:".8rem"}}>{chat[1].lastMessage ?.text}</p>
                    </div>
                </div>
                )
            })}
        </div>
    )
}

export default ChatUserList
