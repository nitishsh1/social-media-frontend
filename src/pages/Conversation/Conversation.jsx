import React from 'react'
import ChatBox from '../../components/ChatBox/ChatBox'
import LeftConversation from '../../components/LeftConversation/LeftConversation'
import RightConversation from '../../components/RightConversation/RightConversation'
import './Conversation.css'

const Conversation = ({personId}) => {
  return (
    <div className="conversation">
        <LeftConversation/>
        <ChatBox personId={personId} />
        <RightConversation/>
    </div>
  )
}

export default Conversation