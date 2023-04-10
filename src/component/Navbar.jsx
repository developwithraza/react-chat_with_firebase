import { Button } from 'antd'
import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../pages/context/AuthContext'
import { auth } from '../pages/Firebase'

function Navbar() {
  const navigate = useNavigate()
  const { currentUser } = useContext(AuthContext)
  return (
    <div className='navbar'>
      <span className='logo'>Raza Chat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span style={{color:'white'}}>{currentUser.displayName}</span>
        <Button type='link' onClick={() => {
          signOut(auth)
          navigate('/')
        }}>Logout</Button>
      </div>
    </div>
  )
}

export default Navbar
