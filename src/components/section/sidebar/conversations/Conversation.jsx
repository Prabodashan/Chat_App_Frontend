import { useDispatch, useSelector } from "react-redux";

import { dateHandler } from "./../../../../utils/date";

function Conversation({ convo }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { token } = user;

  return (
    <li>
      {/*Container */}
      <div className="relative w-full flex items-center justify-between py-[10px]">
        {/*Left*/}
        <div className="flex items-center gap-x-3">
          {/*Conversation user picture*/}
          <div
            className={`relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden `}
          >
            <img
              src={convo.picture}
              alt="picture"
              className="w-full h-full object-cover "
            />
          </div>
          {/*Conversation name and message*/}
          <div className="w-full flex flex-col">
            {/*Conversation name*/}
            <h1 className="font-bold flex items-center gap-x-2">
              {convo.name}
            </h1>
            {/* Conversation message */}
            <div>
              <div className="flex items-center gap-x-1 dark:text-dark_text_2">
                <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                  <p>{convo.latestMessage?.message}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*Right*/}
        <div className="flex flex-col gap-y-4 items-end text-xs">
          <span className="dark:text-dark_text_2">
            {dateHandler(convo.latestMessage.createdAt)}
          </span>
        </div>
      </div>
      {/*Border*/}
      <div className="ml-16 border-b dark:border-b-dark_border_1"></div>
    </li>
  );
}

export default Conversation;
