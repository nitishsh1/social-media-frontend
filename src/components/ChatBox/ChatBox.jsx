import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchChat } from "../../actions/ChatAction";
import { getConversation } from "../../api/ChatRequest";
import { getUser } from "../../api/UserRequest";
import Messenger from "../Messenger/Messenger";

import "./ChatBox.css";


const ChatBox = ({personId}) => {
  const dispatch = useDispatch()
  const params = useParams()
  const {user} = useSelector(state=>state.authReducer.authData)

  const [conversation ,setConversation] = useState({})
  const [person, setPerson] = useState({})
 
  
  useEffect(() =>{
      const fetchPersons = async (id) => {
          const { data } = await getUser(id);
          setPerson(data);
          console.log("person ",person);
      };
      fetchPersons(params.id );

      const fetchConversation = async (userId , personId) => {
        console.log("user" , userId);
        const {data} = await getConversation(userId , personId)
        setConversation(data)
        console.log("conversation " , conversation);

        dispatch(fetchChat(data._id))
        
        
      }

      fetchConversation(user._id , params.id)

  },[params.id ])
  
   
    
  return (
    <div className="ChatBox">
      {
        personId===""?<span>Open a conversation</span>:<Messenger person={person} conversation={conversation} />
      }
    </div>
  );
};

export default ChatBox;
