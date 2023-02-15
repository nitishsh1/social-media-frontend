import React from "react";
import Cover from "../../img/cover.jpg";
import Profile from "../../img/profileImg.jpg";
import "./ProfileCard.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfileCard = ({location}) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const posts = useSelector((state) => state.timelinePostReducer.timelinePosts)

  return (
    <div className="profileCard">
      <div className="profileImages">
        <img
          src={
            user.coverPicture
              ? serverPublic + user.coverPicture
              : serverPublic + "defaultCover.jpg"
          }
          alt=""
        />
        <img
          src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt=""
        />
      </div>

      <div className="profileName">
        <span>{`${user.firstname} ${user.lastname}`}</span>
        <spna>react developer</spna>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.following.length}</span>
            <span>Following</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.followers.length}</span>
            <span>Follower</span>
          </div>

          {location==='profilePage' && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{posts.filter((post)=>post.userId===user._id).length}</span>
                <span>posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {location==='profilePage' ? (
        ""
      ) : (
        <span>
          <Link style={{textDecoration: 'none' , color:"inherit"}}to={`/profile/${user._id}`}>My Profile</Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
