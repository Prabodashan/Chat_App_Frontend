import React from "react";
import Ringing from "./Ringing";

const Call = ({ call, setCall, callAccepted }) => {
  const { receiveingCall, callEnded } = call;
  return (
    <div>
      {receiveingCall && !callAccepted && (
        <Ringing call={call} setCall={setCall} />
      )}
    </div>
  );
};

export default Call;
