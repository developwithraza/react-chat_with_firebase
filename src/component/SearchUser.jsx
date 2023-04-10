import { Input } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore"
import { db } from '../pages/Firebase'
import { AuthContext } from '../pages/context/AuthContext'

function SearchUser() {
  const [userName, setUserName] = useState("")
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)
  const { currentUser } = useContext(AuthContext)


  const handleSearch = async () => {
    const q = query(
      collection(db, "users"), where("displayName", "==", userName)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
        console.log(user)
      })
    } catch (err) {
      setErr(true)
    }

  }
  const handleUserSearch = (e) => {
    e.code === "Enter" && handleSearch()
  }

  useEffect(() => {
    console.log(currentUser)

  })
  const handleSelect = async () => {
    console.warn("clicks")
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    try{
      const res = await getDoc(doc(db, "chats",combinedId))

      if(!res.exists()){
        await setDoc(doc(db,"chats",combinedId),{messages : []});

       await updateDoc(doc(db,"userChats",currentUser.uid ),{
        [combinedId+".userInfo"]: {
          uid:user.uid,
          displayName:user.displayName,
          photoURL:user.photoURL,
        },
        [combinedId+".date"]:serverTimestamp()
       });

       await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      
      }

    }catch(err){

    }
    setUser(null);
    setUserName("")
  }

  return (
    <div className='search'>
      <div className="searchForm">
        <Input placeholder='search user' onChange={(e) => {
          setUserName(e.target.value)
          console.log(userName)
        }} onKeyDown={handleUserSearch} value={userName} />

      </div>
      {err && <span>user not available !</span>}
      {user && <div className="userChats" onClick={handleSelect}>
        <img src={user.photoURL} alt='' />
        <div className="user_chat_info">
          <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  )
}

export default SearchUser
