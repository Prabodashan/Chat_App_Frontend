// import EmojiPicker from "emoji-picker-react";
import { useEffect, useState } from "react";
import { CloseIcon, EmojiIcon } from "../../../../svg";

export default function EmojiPickerApp() {
  const showPicker = true;
  return (
    <li className="w-full">
      <button className="btn" type="button">
        {showPicker ? (
          <CloseIcon className="dark:fill-dark_svg_1" />
        ) : (
          <EmojiIcon className="dark:fill-dark_svg_1" />
        )}
      </button>
    </li>
  );
}
