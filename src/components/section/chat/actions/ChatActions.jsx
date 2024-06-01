import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ClipLoader } from "react-spinners";

import { SendIcon } from "../../../../svg";

import { sendMessage } from "../../../../features/chatSlice";

import { Attachments } from "./attachments";
import EmojiPickerApp from "./EmojiPickerApp";
import Input from "./Input";

function ChatActions() {
  const dispatch = useDispatch();
  const { activeConversation, status } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const { token } = user;

  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);

  const textRef = useRef();

  const values = {
    message,
    convo_id: activeConversation._id,
    files: [],
    token,
  };
  const sendMessageHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    let newMsg = await dispatch(sendMessage(values));
    setMessage("");
    setLoading(false);
  };

  return (
    <form
      onSubmit={(e) => sendMessageHandler(e)}
      className="dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0 py-2 px-4 select-none"
    >
      {/*Container*/}
      <div className="w-full flex items-center gap-x-2">
        {/*Emojis and attachpments*/}
        <ul className="flex gap-x-2">
          <EmojiPickerApp
            message={message}
            setMessage={setMessage}
            textRef={textRef}
          />
          <Attachments />
        </ul>
        <Input message={message} setMessage={setMessage} textRef={textRef} />
        {/*Send button*/}
        <button type="submit" className="btn">
          {status === "loading" && loading ? (
            <ClipLoader color="#E9EDEF" size={25} />
          ) : (
            <SendIcon className="dark:fill-dark_svg_1" />
          )}
        </button>
      </div>
    </form>
  );
}

export default ChatActions;
