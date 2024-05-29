import { useSelector } from "react-redux";

import Conversation from "./Conversation";

export default function Conversations() {
  const { conversations } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);

  return (
    <div className="convos scrollbar">
      <ul>
        {conversations &&
          conversations.map((convo) => {
            return <Conversation key={convo._id} convo={convo} />;
          })}
      </ul>
    </div>
  );
}
