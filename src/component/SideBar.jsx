import React from 'react'
import ChatCotent from './ChatCotent'
import ChatUserList from './ChatUserList'
import Navbar from './Navbar'
import SearchUser from './SearchUser'

function SideBar() {
  return (
    <div className='sidebar'>
      <Navbar />
      <SearchUser />
      <ChatUserList/>
    </div>
  )
}

export default SideBar
