import React, { useRef, useState } from "react";
import ChatBoxGuide from "../ChatBoxGuide/ChatBoxGuide";
import ConversationGuide from "../ConversationGuide/ConversationGuide";
// import LogoSearch from "../../components/LogoSearch/LogoSearch";
// import NavIcons from "../../components/NavIcons/NavIcons";
import "../Chat/chat.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import axios from "axios";

const ChatGuide = () => {
  const dispatch = useDispatch();
  const socket = useRef();

  const guide=useSelector((state)=>{
    return state.guide.detials
  });


  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [receiver , setReceiver] = useState("")


  // Get the chat in chat section
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await axios.get('/chat/'+guide._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [guide._id]);



  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("ws://localhost:2004/");
    socket.current.emit("new-user-add", guide._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [guide]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage!==null) {
      socket.current.emit("send-message", sendMessage);}
  }, [sendMessage]);


  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data)
      setReceivedMessage(data);
    }

    );
  }, []);


  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== guide._id);
    const online = onlineUsers.find((user) => guide.guideId === chatMember);
    return online ? true : false;
  };

  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        {/* <LogoSearch /> */}
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat,i) => (
              <div
                onClick={() => {
                  setCurrentChat(chat);
                }}
              >
                <ConversationGuide
                  key={i}
                  data={chat}
                  currentUser={guide._id}
                  online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          {/* <NavIcons /> */}
        </div>
        <ChatBoxGuide
          chat={currentChat}
          currentUser={guide._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
          setReceiver={setReceiver}
        />
      </div>
    </div>
  );
};

export default ChatGuide;