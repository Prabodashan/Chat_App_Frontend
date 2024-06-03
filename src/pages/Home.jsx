import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getConversations,
  updateMessagesAndConversations,
} from "../features/chatSlice";

import SocketContext from "../context/SocketContext";

import { Sidebar } from "../components/section/sidebar";
import { ChatContainer, EmptyChatContainer } from "../components/section/chat/";

const Home = ({ socket }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);

  const [onlineUsers, setOnlineUsers] = useState([]);

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
  }, []);

  return (
    <>
      <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
        {/*container*/}
        <div className="container h-screen flex">
          {/*Sidebar*/}
          <Sidebar onlineUsers={onlineUsers} />
          {activeConversation._id ? (
            <ChatContainer onlineUsers={onlineUsers} />
          ) : (
            <EmptyChatContainer />
          )}
        </div>
      </div>
    </>
  );
};

const HomeWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Home {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default HomeWithSocket;
