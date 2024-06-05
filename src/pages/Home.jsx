import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getConversations,
  updateMessagesAndConversations,
} from "../features/chatSlice";

import SocketContext from "../context/SocketContext";

import { ChatContainer, EmptyChatContainer } from "../components/section/chat/";
import { Sidebar } from "../components/section/sidebar";
import Call from "../components/section/call/Call";

const callData = {
  socketId: "",
  receiveingCall: true,
  callEnded: false,
  name: "",
  picture: "",
  signal: "",
};

const Home = ({ socket }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);

  //onlineUsers
  const [onlineUsers, setOnlineUsers] = useState([]);
  //typing
  const [typing, setTyping] = useState(false);
  //call
  const [call, setCall] = useState(callData);
  const { receiveingCall } = call;
  const [callAccepted, setCallAccepted] = useState(false);
  const [totalSecInCall, setTotalSecInCall] = useState(0);

  //join user into the socket io
  useEffect(() => {
    socket.emit("join", user._id);
    //get online users
    socket.on("get-online-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  //get Conversations
  useEffect(() => {
    if (user?.token) {
      dispatch(getConversations(user.token));
    }
  }, [user]);

  useEffect(() => {
    //lsitening to receiving a message
    socket.on("receive message", (message) => {
      dispatch(updateMessagesAndConversations(message));
    });
    //listening when a user is typing
    socket.on("typing", (conversation) => setTyping(conversation));
    socket.on("stop typing", () => setTyping(false));
  }, []);

  return (
    <>
      <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
        {/*container*/}
        <div className="container h-screen flex">
          {/*Sidebar*/}
          <Sidebar onlineUsers={onlineUsers} typing={typing} />
          {activeConversation._id ? (
            <ChatContainer onlineUsers={onlineUsers} typing={typing} />
          ) : (
            <EmptyChatContainer />
          )}
        </div>
      </div>
      {/*Call*/}
      <Call call={call} setCall={setCall} callAccepted={callAccepted} />
    </>
  );
};

const HomeWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Home {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default HomeWithSocket;
