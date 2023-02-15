import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addChat, fetchChat } from "../../actions/ChatAction";
import { addMessage } from "../../api/ChatRequest";
import { io } from "socket.io-client";
import { UilVideo } from "@iconscout/react-unicons";

import Peer from "simple-peer";

import Message from "../Message/Message";

const Messenger = ({ person, conversation }) => {

  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
 
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);

  const userVideo = useRef();
  const partnerVideo = useRef();
  const videoButton = useRef();

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const [message, setMessage] = useState({ text: "" });
  const { user } = useSelector((state) => state.authReducer.authData);
  const { chats } = useSelector((state) => state.chatReducer);

  const socket = useRef();

  const scrollRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (activeUsers) => {
      console.log("active users", activeUsers);
    });
  }, [user]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
      }).catch((e)=>{
        console.log(e)
      });

    // socket.current.on("yourID", (id) => {
    //   setYourID(id);
    // });
    // socket.current.on("allUsers", (users) => {
    //   setUsers(users);
    // });

    socket.current.on("hey", (data) => {
      setReceivingCall(true);
      setCallerSignal(data.signal);
    });
  }, [stream]);

  function callPeer(id) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      config: {
        iceServers: [
          {
            urls: ["stun:bn-turn1.xirsys.com"],
          },
          {
            username:
              "0kYXFmQL9xojOrUy4VFemlTnNPVFZpp7jfPjpB3AjxahuRe4QWrCs6Ll1vDc7TTjAAAAAGAG2whXZWJUdXRzUGx1cw==",
            credential: "285ff060-5a58-11eb-b269-0242ac140004",
            urls: [
              "turn:bn-turn1.xirsys.com:80?transport=udp",
              "turn:bn-turn1.xirsys.com:3478?transport=udp",
              "turn:bn-turn1.xirsys.com:80?transport=tcp",
              "turn:bn-turn1.xirsys.com:3478?transport=tcp",
              "turns:bn-turn1.xirsys.com:443?transport=tcp",
              "turns:bn-turn1.xirsys.com:5349?transport=tcp",
            ],
          },
        ],
      },
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.current.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: user._id,
      });
    });

    peer.on("stream", (stream) => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    socket.current.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
  }

  function acceptCall() {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.current.emit("acceptCall", { signal: data, to: person._id });
    });

    peer.on("stream", (stream) => {
      partnerVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
  }

  let UserVideo;
  if (stream) {
    UserVideo = <video style={{width:"300px", height:"240px", outline:"none",
    border: "5px solid #45c9d0", padding: "10px"}} playsInline muted ref={userVideo} autoPlay />;
  }

  let PartnerVideo;
  if (callAccepted) {
    PartnerVideo = <video  style={{width:"300px", height:"240px", outline:"none",
    border: "5px solid #45c9d0", padding: "10px"}} playsInline ref={partnerVideo} autoPlay />;
  }

  let incomingCall;
  if (receivingCall) {
    incomingCall = (
      <div>
        <h1>{person._id} is calling you</h1>
        <button onClick={acceptCall}>Accept</button>
      </div>
    );
  }

  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      const formData = {
        text: data.text,
        sender: data.userId,
        createdAt: data.createdAt,
      };
      dispatch(addChat(formData));
    });
  }, [socket]);

  useEffect(() => {
    console.log("222222", person, conversation, chats);
    dispatch(fetchChat(conversation?._id));
  }, []);

  const handleMessage = async (e) => {
    e.preventDefault();
    const formData = {
      text: message.text,
      conversationId: conversation._id,
      sender: user._id,
    };

    console.log("form ", formData);

    const { data } = await addMessage(formData);

    dispatch(addChat(data));

    socket.current.emit("send-message", {
      userId: user._id,
      receiverId: person._id,
      text: message.text,
      createdAt: data.createdAt,
    });

    setMessage({ text: "" });
  };

  const handleChange = (e) => {
    setMessage({ ...message, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [chats]);

  const handleVideo = (e) => {
    e.preventDefault()
    console.log("video")
    callPeer(person._id);
  };

  return (
    <>
      <div className="follower">
        <div>
          <img
            src={
              person?.profilePicture
                ? serverPublic + person.profilePicture
                : serverPublic + "defaultProfile.png"
            }
            alt=""
            className="followerImg"
          />
          <div className="name">
            <span>{person?.firstname}</span>
            <span></span>
          </div>
        </div>
        <div>
          <span style={{cursor:"pointer"}}>
            <UilVideo onClick={handleVideo} ref={videoButton} />
          </span>
        </div>
      </div>

      <div className="ChatContainer" ref={scrollRef}>
        {chats.length > 0 ? (
          chats.map((chat, id) => {
            return (
              <div ref={scrollRef}>
                {" "}
                <Message chat={chat} key={id} person={person} />
              </div>
            );
          })
        ) : (
          <span>Namsate</span>
        )}
      </div>

      <div>{incomingCall}</div>
      <div>
        {UserVideo}
        {PartnerVideo}
      </div>
      <div className="TypeMessage">
        <input
          type="text"
          placeholder="Type message"
          name="text"
          onChange={handleChange}
          value={message.text}
        />
        <button className="button fc-button" onClick={handleMessage}>
          Send
        </button>
      </div>
      
    </>
  );
};

export default Messenger;
