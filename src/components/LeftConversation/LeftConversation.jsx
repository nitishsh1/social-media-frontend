import React from "react";
import FollowerCard from "../FollowersCard/FollowerCard";
import LogoSearch from "../logoSearch/LogoSearch";


const LeftConversation = () => {
  return (
    <div className="profileSide">
      <LogoSearch />
      <FollowerCard chat="chat"/>
    </div>
  );
};

export default LeftConversation;
