import React, { useState, useReducer, useContext } from "react";
import questionsReducer from "./reducers/questions";
import Reply from "./Reply";
import { QuestionBox } from "../styles";

const questionsData = [
  {
    id: 0,
    text: "First Question",
    user: "Stefan",
    replies: [
      {
        id: 0,
        text: "First reply",
        user: "Elena",
        replies: [
          {
            id: 0,
            text: "First Reply to the reply",
            user: "Hanna"
          }
        ]
      }
    ]
  }
];

const QuestionsContext = React.createContext();
const QuestionList = () => {
  const [questions, dispatch] = useReducer(questionsReducer, questionsData);
  const [question, setQuestion] = useState("");
  const [reply, setReply] = useState("");
  const handleChangeQuestion = e => setQuestion(e.target.value);
  const handleChangeReply = e => setReply(e.target.value);
  const handleAddQuestion = e => {
    e.preventDefault();
    const payload = { question: { user: "Stefan", replies: [] } };
    payload.question.id = questions.length;
    payload.question.text = question;
    dispatch({ type: "add-question", payload });
  };
  const handleAddReply = questionId => {
    const payload = { questionId, reply: { user: "Stefan", replies: [] } };
    const replyId = questions.find(question => question.id === questionId)
      .replies.length;
    payload.reply.id = replyId;
    payload.reply.text = reply;
    dispatch({ type: "add-reply", payload });
  };

  return (
    <QuestionsContext.Provider value={{ questions, dispatch }}>
      <form onSubmit={handleAddQuestion}>
        <input onChange={handleChangeQuestion} />
      </form>
      {questions.map(q => (
        <QuestionBox key={q.id}>
          <div>{q.user}</div>
          <div>{q.text}</div>
          <div>
            {q.replies.map(reply => (
                <Reply
                  key={reply.id}
                  reply={reply}
                  questionId={q.id}
                  dispatch={dispatch}
                  questions={questions}
                />
            ))}
          </div>
          <input onChange={handleChangeReply} />
          <button onClick={() => handleAddReply(q.id)}>reply</button>
        </QuestionBox>
      ))}
    </QuestionsContext.Provider>
  );
};

export const useQuestions = () => useContext(QuestionsContext);
export default QuestionList;
