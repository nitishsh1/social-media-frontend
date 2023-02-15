import React from 'react'

import { useSelector } from 'react-redux'

const Message = ({chat , person}) => {
  const {user} = useSelector(state=>state.authReducer.authData)
  return (
    <div className={chat.sender===person._id ? "person_chat": "user_cht"}>{chat.text} - {chat.sender===person._id ? person.firstname : user.firstname}</div>
  )
}

export default Message