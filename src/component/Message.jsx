import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../pages/context/AuthContext'
import { ChatContext } from '../pages/context/ChatContext'

function Message({message}) {
    const {currentUser}=useContext(AuthContext)
    const {data}=useContext(ChatContext)
    const ref=useRef()
    console.log(message)

    useEffect(()=>{
       ref.current?.scrollIntoView({behavior:"smooth"}) 
    },[message])

    return (
        <div   ref={ref} className={`message ${message.senderId===currentUser.uid && "owner"}`}>
            <div className='messageInfo'>
                <img src={message.senderId===currentUser.uid ? currentUser.photoURL :data.user.photoURL} alt='' />
                <span className='justNow'>Just Now</span>
            </div>
            <div className="messageData">
            <p>{message.text}</p>
            {message.img && <img src={message.img} alt='' />}
           
            </div>
        </div>
    )
}

export default Message
