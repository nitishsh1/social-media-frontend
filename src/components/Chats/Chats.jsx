import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Chats = () => {
    const {chats} = useSelector(state=>state.chatReducer)
    useEffect(() =>{
        console.log("chats 1111" , chats);
    },[])
  return (
    <div>Chats</div>
  )
}

export default Chats