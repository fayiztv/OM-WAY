import React, { useEffect, useState } from "react";
import { useRef } from "react";
import "../ChatBox/chatbox.css";
import { format } from "timeago.js";
import InputEmoji from 'react-input-emoji'
import axios from "axios";

const ChatBoxGuide = ({ chat, currentUser, setSendMessage,  receivedMessage , setReceiver}) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);;
  const [newMessage, setNewMessage] = useState("");

  const handleChange = (newMessage)=> {
    setNewMessage(newMessage)
  }

  setReceiver(chat?.members.find((id)=> id !== currentUser))

  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    console.log(userId,"userId");
    const getUserData = async () => {
      try {
        const { data } = await axios.get("/user/get-user/"+userId);
        console.log(data.user);
        setUserData(data.user);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) 
    getUserData();
  }, [chat, currentUser]);

  // fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get("/message/"+chat._id);
        setMessages(data.result);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) 
    fetchMessages();
  }, [chat]);


  // Always scroll to last Message
  useEffect(()=> {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  },[messages])



  // Send Message
  const handleSend = async(e)=> {
     e.preventDefault()
    const message = {
      senderId : currentUser,
      text: newMessage,
      chatId: chat._id,
  }

  
  const receiverId = chat.members.find((id)=>id!==currentUser);
  // send message to socket server
  console.log(setSendMessage);
  setSendMessage({...message, receiverId})


  // send message to database
  try {
    const { data } = await axios.post("/message",message);
    setMessages([...messages, data.result]);
    setNewMessage("");
  }
  catch
  {
    console.log("error")
  }
}

// Receive Message from parent component
useEffect(()=> {
  if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
    setMessages([...messages, receivedMessage]);
  }

},[receivedMessage])

console.log(messages,'mesageeeeeeeeeeee');



  const scroll = useRef();
  const imageRef = useRef();
  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            <div className="chat-header">
              <div className="follower">
                <div>
                  <img
                    src={
                        userData?.profilePicture
                        ? userData.profilePicture
                        : "defaultProfile.png"
                    }
                    alt="Profile"
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div className="name" style={{ fontSize: "0.9rem" }}>
                    <span>
                      {userData?.name}
                    </span>
                  </div>
                </div>
              </div>
              <hr
                style={{
                  width: "95%",
                  border: "0.1px solid #ececec",
                  marginTop: "20px",
                }}
              />
            </div>
            <div className="chat-body" >
              {messages.map((message) => (
                <>
                  <div ref={scroll}
                    className={
                      message.senderId === currentUser
                        ? "message own"
                        : "message"
                    }
                  >
                    <span>{message.text}</span>{" "}
                    <span>{format(message.createdAt)}</span>
                  </div>
                </>
              ))}
            </div>
            {/* chat-sender */}
            <div className="chat-sender">
              <div onClick={() => imageRef.current.click()}>+</div>
              <InputEmoji
                value={newMessage}
                onChange={handleChange}
              />
              <div className="send-button button" onClick = {handleSend}>Send</div>
              <input
                type="file"
                name=""
                id=""
                style={{ display: "none" }}
                ref={imageRef}
              />
            </div>{" "}
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
        )}
      </div>
    </>
  );
};

export default ChatBoxGuide;