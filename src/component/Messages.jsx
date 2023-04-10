import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../pages/context/ChatContext'
import { db } from '../pages/Firebase'
import Message from './Message'

function Messages() {
  const [messages,setMessages]=useState([])
  const {data}=useContext(ChatContext)

  useEffect(()=>{
    const unSub=onSnapshot(doc(db,"chats",data.chatId),(doc)=>{
      doc.exists() && setMessages(doc.data().messages)
    })
    return ()=>{
      unSub()
    }
  },[data.chatId])
  return (
    <div className='messages'>
    {messages.map((msg)=>{
      return(
      <Message message={msg} key={msg.id}/>
      )
    })}
     
    </div>
  )
}

export default Messages
