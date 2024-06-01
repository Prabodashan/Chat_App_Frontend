import { SendIcon } from "../../../../svg";

import { Attachments } from "./attachments";
import EmojiPickerApp from "./EmojiPicker";
import Input from "./Input";

function ChatActions() {
  return (
    <form className="dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0 py-2 px-4 select-none">
      {/*Container*/}
      <div className="w-full flex items-center gap-x-2">
        {/*Emojis and attachpments*/}
        <ul className="flex gap-x-2">
          <EmojiPickerApp />
          <Attachments />
        </ul>
        <Input />
        {/*Send button*/}
        <button type="submit" className="btn">
          <SendIcon className="dark:fill-dark_svg_1" />
        </button>
      </div>
    </form>
  );
}

export default ChatActions;
