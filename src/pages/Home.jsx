import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Peer from "simple-peer";

import {
  getConversations,
  updateMessagesAndConversations,
} from "../features/chatSlice";
import {
  getConversationId,
  getConversationName,
  getConversationPicture,
} from "../utils/chat";

import SocketContext from "../context/SocketContext";

import { ChatContainer, EmptyChatContainer } from "../components/section/chat/";
import { Sidebar } from "../components/section/sidebar";
import Call from "../components/section/call/Call";

const callData = {
  mySocketId: "",
  socketId: "",
  receiveingCall: false,
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
  const [show, setShow] = useState();
  const [stream, setStream] = useState();
  const { socketId, mySocketId } = call;
  const [callAccepted, setCallAccepted] = useState(false);
  const [totalSecInCall, setTotalSecInCall] = useState(0);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  //join user into the socket io
  useEffect(() => {
    socket.emit("join", user._id);
    //get online users
    socket.on("get-online-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  //call
  useEffect(() => {
    setupMedia();
    socket.on("setup socket", (id) => {
      setCall({ ...call, socketId: id, mySocketId: id });
    });
    socket.on("call user", (data) => {
      setCall({
        ...call,
        socketId: data.from,
        name: data.name,
        picture: data.picture,
        signal: data.signal,
        receiveingCall: true,
      });
    });
    socket.on("end call", () => {
      setShow(false);
      setCall({
        ...call,
        callEnded: true,
        receiveingCall: false,
        SocketId: mySocketId,
      });
      myVideo.current.srcObject = null;
      if (callAccepted) {
        connectionRef?.current?.destroy();
      }
    });
  }, []);

  //--call user funcion
  const callUser = () => {
    enableMedia();
    setCall({
      ...call,
      name: getConversationName(user, activeConversation.users),
      picture: getConversationPicture(user, activeConversation.users),
    });
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("call user", {
        userToCall: getConversationId(user, activeConversation.users),
        signal: data,
        from: socketId,
        name: user.name,
        picture: user.picture,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    socket.on("call accepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
    connectionRef.current = peer;
  };

  //--answer call  funcion
  const answerCall = () => {
    enableMedia();
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answer call", { signal: data, to: call.socketId });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  //--end call  funcion
  const endCall = () => {
    setShow(false);
    socket.emit("end call", call.socketId);
    setCall({
      ...call,
      callEnded: true,
      receiveingCall: false,
      socketId: mySocketId,
    });
    myVideo.current.srcObject = null;
    if (callAccepted) {
      connectionRef?.current?.destroy();
    }
  };

  //..................
  const setupMedia = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        // userVideo.current.srcObject = stream;
      });
  };

  const enableMedia = () => {
    myVideo.current.srcObject = stream;
    setShow(true);
  };

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
            <ChatContainer
              onlineUsers={onlineUsers}
              typing={typing}
              callUser={callUser}
            />
          ) : (
            <EmptyChatContainer />
          )}
        </div>
      </div>
      {/*Call*/}
      <Call
        call={call}
        setCall={setCall}
        callAccepted={callAccepted}
        myVideo={myVideo}
        userVideo={userVideo}
        stream={stream}
        answerCall={answerCall}
        show={show}
        endCall={endCall}
        totalSecInCall={totalSecInCall}
        setTotalSecInCall={setTotalSecInCall}
      />
    </>
  );
};

const HomeWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Home {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default HomeWithSocket;
