import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getConversations } from "../features/chatSlice";

import { Sidebar } from "../components/section/sidebar";
import { EmptyChatContainer } from "../components/section/chat/";

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);

  //get Conversations
  useEffect(() => {
    if (user?.token) {
      dispatch(getConversations(user.token));
    }
  }, [user]);

  return (
    <>
      <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
        {/*container*/}
        <div className="container h-screen flex">
          {/*Sidebar*/}
          <Sidebar />
          {activeConversation._id ? "home" : <EmptyChatContainer />}
        </div>
      </div>
    </>
  );
};

export default Home;
