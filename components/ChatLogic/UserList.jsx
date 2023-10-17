"use client"
import { useEffect, useState } from "react"

const UserList = ({ userList }) => {
  const [ newUserList, setNewUserList ] = useState()
  useEffect(() => {
    // userList会有一段极短的时间为空, 所以使用Object.values时需要进行处理
    if(userList) {
      const res = Object.values(userList)
      setNewUserList(res)
    } else {
      console.log('userlist为空1')
    }
  }, [userList])
  console.log(newUserList)
  return (
    <>
    {
      newUserList ? 
      <div></div> :
      <div></div>
    }
    </>
      
  )
}

export default UserList