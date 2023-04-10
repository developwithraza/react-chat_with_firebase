import React from 'react'
import ChatCotent from '../component/ChatCotent'
import SideBar from '../component/SideBar'

function Home() {
  return (
    <div className='home'>
        <div className="main_container">
            <SideBar />
            <ChatCotent />
        </div>
    </div>
  )
}

export default Home