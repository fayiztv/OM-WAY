import React, { useEffect, useState } from "react";
import { useRef } from "react";
import "./chatbox.css";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import axios from "axios";
import { MdSend } from "react-icons/md";
import profile from "../../assets/images/face1.png";
import message from "../../assets/images/message.png";
import { AiOutlineArrowLeft } from "react-icons/ai";

const ChatBox = ({
  chat,
  currentUser,
  setSendMessage,
  receivedMessage,
  setReceiver,
  handleBackClick,
}) => {
  const [guideData, setGuideData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const validbtn = ()=>{
    if(newMessage.trim() === ""){
      return false
    }else{
      return true
    }
  }

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  setReceiver(chat?.members.find((id) => id !== currentUser));

  useEffect(() => {
    const guideId = chat?.members?.find((id) => id !== currentUser);
    const getGuideData = async () => {
      try {
        const { data } = await axios.get("guide/get-guide/" + guideId);
        setGuideData(data.guide);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) getGuideData();
  }, [chat, currentUser]);

  // fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get("/message/" + chat._id);
        setMessages(data.result);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);

  // Always scroll to last Message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send Message
  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };

    const receiverId = chat.members.find((id) => id !== currentUser);
    // send message to socket server
    setSendMessage({ ...message, receiverId });

    // send message to database
    try {
      const { data } = await axios.post("/message", message);
      setMessages([...messages, data.result]);
      setNewMessage("");
    } catch {
      console.log("error");
    }
  };

  // Receive Message from parent component
  useEffect(() => {
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);

  const scroll = useRef();
  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            <div className="chat-header">
              <div className="header-1">
                <button className="back-button" onClick={handleBackClick}>
                  <AiOutlineArrowLeft size={20} />
                </button>

                <img
                  src={guideData?.image ? guideData.image : profile}
                  alt="Profile"
                  className="followerImage"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "100%",
                    marginLeft: "20px",
                  }}
                />
                <div className="name" style={{ fontSize: "0.9rem" }}>
                  <span>{guideData?.firstName}</span>
                </div>
              </div>
              <hr
                style={{
                  width: "94%",
                  border: "0.1px solid rgb(186 186 186)",
                  marginTop: "13px",
                  marginLeft: "20px",
                }}
              />
            </div>
            <div className="chat-body">
              {messages.map((message) => (
                <>
                  {message.senderId === currentUser ? (
                    <div className="own-message-body">
                      <div ref={scroll} className="message">
                        <span>{message.text}</span>{" "}
                      </div>
                      <p style={{ fontSize: "10px" }}>
                        {format(message.createdAt)}
                      </p>
                    </div>
                  ) : (
                    <div className="message-body">
                      <div ref={scroll} className="message">
                        <span>{message.text}</span>{" "}
                      </div>
                      <p style={{ fontSize: "10px" }}>
                        {format(message.createdAt)}
                      </p>
                    </div>
                  )}
                </>
              ))}
            </div>
            <div className="chat-sender">
              <InputEmoji
                multilene
                value={newMessage}
                onChange={handleChange}
              />
              <button className="send-button" disabled={!validbtn()} onClick={handleSend}><MdSend size={20} className="send" /></button>
            </div>
          </>
        ) : (
          <div className="empty-div">
            <span className="chatbox-empty-message">
              Tap on a chat to start conversation...
            </span>
            <img src={message} alt="" />
          </div>
        )}
      </div>
    </>
  );
};

export default ChatBox;
