import { Input } from 'antd';
import React, { useContext } from 'react'
import { FiMoreHorizontal, FiUserPlus } from "react-icons/fi";
import { ChatContext } from '../pages/context/ChatContext';
import CreateMessage from './CreateMessage';
import Messages from './Messages';

function ChatCotent() {
    const {data}=useContext(ChatContext)
    return (
        <div className='chat'>
            <div className="chatHeader">
                <div className="title">
                    <span>{data.user?.displayName}</span>
                </div>
                <div className="actionIcons">
                    <FiUserPlus className='icons' />
                    <FiMoreHorizontal className='icons' />
                </div>

            </div>
           
                <Messages />
                <CreateMessage />
        </div>
    )
}

export default ChatCotent
