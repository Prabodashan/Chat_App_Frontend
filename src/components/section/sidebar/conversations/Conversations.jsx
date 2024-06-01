import { useSelector } from "react-redux";

import Conversation from "./Conversation";

export default function Conversations() {
  const { conversations, activeConversation } = useSelector(
    (state) => state.chat
  );
  const { user } = useSelector((state) => state.user);

  return (
    <div className="convos scrollbar">
      <ul>
        {conversations &&
          conversations
            .filter(
              (c) =>
                c.latestMessage ||
                c._id === activeConversation._id ||
                c.isGroup == true
            )
            .map((convo) => {
              return <Conversation key={convo._id} convo={convo} />;
            })}
      </ul>
    </div>
  );
}
