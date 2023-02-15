import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { startConversation } from "../../actions/ChatAction";

import { followUser, unfollowUser } from "../../actions/UserAction";



const User = ({ person, chat }) => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();

  const [currentChat , setCurrentChat]  = useState(false)

  useEffect(()=>{
    setCurrentChat(false)
  },[])
  
  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );
  const handleFollow = (e) => {
    e.preventDefault();
    following
      ? dispatch(unfollowUser(person._id, user))
      : dispatch(followUser(person._id, user));

    setFollowing((prev) => !prev);

    window.location.reload(true);
  };
  

  const handleChat = async (e) => {
    e.preventDefault();
    const data = {
      "senderId" : user._id,
      "receiverId" : person._id
    }

    setCurrentChat(pre=>!pre)
    
    currentChat && dispatch(startConversation(data))
    
    
  };

  return (
    <div className="follower">
      <div>
        <img
          src={
            person.profilePicture
              ? serverPublic + person.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt=""
          className="followerImg"
        />
        <div className="name">
          <span>{person.firstname}</span>
          <span>{person.username}</span>
        </div>
      </div>

      <button
        className={
          chat === "chat"
            ? (!currentChat?"button fc-button":"button fc-button UnfollowButton" )
            : following
            ? "button fc-button UnfollowButton"
            : "button fc-button"
        }
        onClick={chat === "chat" ? handleChat : handleFollow}
      ><Link style={{textDecoration: 'none' , color:"inherit"}} to={chat==="chat"&&`/messenger/${person._id}`}> {chat === "chat" ? "chat" : following ? "unfollow" : "follow"}</Link>
       
      </button>
    </div>
  );
};

export default User;
