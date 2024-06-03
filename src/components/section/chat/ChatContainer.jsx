import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getConversationMessages } from "../../../features/chatSlice";

import { checkOnlineStatus, getConversationId } from "../../../utils/chat";

import ChatHeader from "./header/ChatHeader";
import ChatMessages from "./messages/ChatMessages";
import { ChatActions } from "./actions";

export default function ChatContainer({ onlineUsers }) {
  const dispatch = useDispatch();
  const { activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const { token } = user;
  const values = {
    token,
    convo_id: activeConversation?._id,
  };
  useEffect(() => {
    if (activeConversation?._id) {
      dispatch(getConversationMessages(values));
    }
  }, [activeConversation]);
  return (
    <div className="relative w-full h-full border-l dark:border-l-dark_border_2 select-none overflow-hidden ">
      {/*Container*/}
      <div>
        {/*Chat header*/}
        <ChatHeader
          online={
            activeConversation.isGroup
              ? false
              : checkOnlineStatus(onlineUsers, user, activeConversation.users)
          }
        />

        <ChatMessages />

        <ChatActions />
      </div>
    </div>
  );
}
