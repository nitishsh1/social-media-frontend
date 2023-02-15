import React, { useState } from "react";
import "./FollowersCard.css";

import User from "../User/User";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllUser } from "../../api/UserRequest";

const FollowerCard = ({chat}) => {
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data);
      console.log(data);
    };
    fetchPersons();
  }, []);

  return (
    <div className="followerCard">
      <h3>{ chat==="chat"?"Start a conversation with":"People you may know"}</h3>
      {persons.map((person, id) => {
        if (person._id !== user._id) {
          return <User person={person} key={id} chat={chat} />;
        }
      })}
    </div>
  );
};

export default FollowerCard;
