import React, { useState } from "react";
import NestedReply from "./NestedReply";
import { ReplyBox } from "../styles";

const Reply = ({ reply, questionId, dispatch, questions }) => {
  const [nestedReply, setNestedReply] = useState("");
  const handleChangeNestedReply = e => setNestedReply(e.target.value);
  const handleAddNestedReply = replyId => {
    const payload = { questionId, replyId, nestedReply: { user: "Stefan" } };
    const nestedReplyId = reply.replies.length;
    payload.nestedReply.id = nestedReplyId;
    payload.nestedReply.text = nestedReply;
    console.log(payload);
    dispatch({ type: "add-nested-reply", payload });
  };

  return (
    <ReplyBox>
      <div>{reply.user}</div>
      <div>{reply.text}</div>
      <div>
        {reply.replies.map(reply => (
          <NestedReply key={reply.id} reply={reply} replyId={reply.id} />
        ))}
      </div>
      <input onChange={handleChangeNestedReply} />
      <button onClick={() => handleAddNestedReply(reply.id)}>reply</button>
    </ReplyBox>
  );
};

export default Reply;
