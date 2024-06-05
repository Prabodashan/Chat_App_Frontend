import React, { useState } from "react";
import Ringing from "./Ringing";
import Header from "./Header";
import CallArea from "./CallArea";
import CallAcions from "./CallAcions";

const Call = ({ call, setCall, callAccepted, myVideo, userVideo, stream }) => {
  const { receiveingCall, callEnded } = call;

  const [showActions, setShowActions] = useState(false);
  const [toggle, setToggle] = useState(false);
  return (
    <div
      className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[550px] z-10 rounded-2xl overflow-hidden callbg`}
      onMouseOver={() => setShowActions(true)}
      onMouseOut={() => setShowActions(false)}
    >
      {/*Container*/}
      <div>
        <div>
          {/*Header*/}
          <Header />
          {/*Call area*/}
          <CallArea name="me" />
          {/*Call actions*/}
          {showActions ? <CallAcions /> : null}
        </div>
        {/*Video streams*/}
        <div>
          {/*user video*/}
          <div>
            <video
              ref={userVideo}
              playsInline
              muted
              autoPlay
              className={toggle ? "SmallVideoCall" : "largeVideoCall"}
              onClick={() => setToggle((prev) => !prev)}
            ></video>
          </div>
          {/*my video*/}

          <div>
            <video
              ref={myVideo}
              playsInline
              muted
              autoPlay
              className={`${toggle ? "largeVideoCall" : "SmallVideoCall"} ${
                showActions ? "moveVideoCall" : ""
              }`}
              onClick={() => setToggle((prev) => !prev)}
            ></video>
          </div>
        </div>
      </div>
      {receiveingCall && !callAccepted && (
        <Ringing call={call} setCall={setCall} />
      )}
    </div>
  );
};

export default Call;
