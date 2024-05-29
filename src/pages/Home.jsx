import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getConversations } from "../features/chatSlice";

import { Sidebar } from "../components/section/sidebar";

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

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
        </div>
      </div>
    </>
  );
};

export default Home;
