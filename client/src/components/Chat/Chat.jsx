import React, { useRef, useState } from "react";
import ChatBox from "../ChatBox/ChatBox";
import Conversation from "../Conversation/Conversation";
import "./chat.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import axios from "axios";
import UserNavbar from "../UserNavBar/UserNavBar";

const Chat = () => {
  const dispatch = useDispatch();
  const socket = useRef();

  const user = useSelector((state) => {
    return state.user.detials;
  });

  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [receiver, setReceiver] = useState("");

  // mobile responsive

  const [showLeftSideChat, setShowLeftSideChat] = useState(true);
  const [showRightSideChat, setShowRightSideChat] = useState(false);

  const handleConversationClick = (chat) => {
    setCurrentChat(chat);
    setShowLeftSideChat(false);
    setShowRightSideChat(true);
  };

  const handleBackClick = () => {
    setShowLeftSideChat(true);
    setShowRightSideChat(false);
  };

  // end

  // Get the chat in chat section
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await axios.get("/chat/" + user._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user._id]);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("https://onmyway.perfumemart.store/");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      setReceivedMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <div className="user-main">
      <UserNavbar />
      <div className="Chat">
        <div
          className={
            showLeftSideChat ? "Left-side-chat" : "Left-side-chat hidden"
          }
        >
          <div className="Chat-container">
            <h4 style={{ marginTop: "20px", marginLeft: "20px" }}>Messages</h4>
            <div className="Chat-list">
              {chats.map((chat, i) => (
                <div
                  onClick={() => {
                    handleConversationClick(chat);
                  }}
                >
                  <Conversation
                    key={i}
                    data={chat}
                    currentUser={user._id}
                    online={checkOnlineStatus(chat)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className={
            showRightSideChat ? "Right-side-chat" : "Right-side-chat hidden"
          }
        >
          <ChatBox
            chat={currentChat}
            currentUser={user._id}
            setSendMessage={setSendMessage}
            receivedMessage={receivedMessage}
            setReceiver={setReceiver}
            setShowLeftSideChat={setShowLeftSideChat}
            setShowRightSideChat={setShowRightSideChat}
            handleBackClick={handleBackClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
