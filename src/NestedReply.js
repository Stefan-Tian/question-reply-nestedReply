import React from "react";
import { NestedReplyBox } from "../styles";

const NestedReply = ({ reply }) => {
  return (
    <NestedReplyBox>
      <div>{reply.user}</div>
      <div>{reply.text}</div>
    </NestedReplyBox>
  );
};

export default NestedReply;
