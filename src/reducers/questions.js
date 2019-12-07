const questionsReducer = (questions, action) => {
  switch (action.type) {
    case "add-question":
      return [...questions, action.payload.question];
    case "remove-question":
      return questions.filter(question => question.id !== action.payload.id);
    case "edit-question":
      return questions.map(question => {
        if (question.id === action.payload.question.id) {
          return action.payload.question;
        }
        return question;
      });
    case "add-reply":
      return questions.map(question => {
        if (question.id === action.payload.questionId) {
          const updatedQuestion = {
            ...question,
            replies: [...question.replies, action.payload.reply]
          };
          return updatedQuestion;
        }
        return question;
      });
    case "remove-reply":
      return questions.map(question => {
        if (question.id === action.payload.questionId) {
          const updatedQuestion = {
            ...question,
            replies: question.replies.filter(
              reply => reply.id !== action.payload.replyId
            )
          };
          return updatedQuestion;
        }
        return question;
      });
    case "edit-reply":
      return questions.map(question => {
        if (question.id === action.payload.questionId) {
          const updatedReplies = questions.replies.map(reply => {
            if (reply.id === action.payload.reply.id) {
              return action.payload.reply;
            }
            return reply;
          });
          const updatedQuestion = {
            ...question,
            replies: updatedReplies
          };
          return updatedQuestion;
        }
        return question;
      });
    case "add-nested-reply":
      return questions.map(question => {
        if (question.id === action.payload.questionId) {
          const updatedQuestion = {
            ...question,
            replies: question.replies.map(reply => {
              if (reply.id === action.payload.replyId) {
                return {
                  ...reply,
                  replies: [...reply.replies, action.payload.nestedReply]
                };
              }
              return reply;
            })
          };
          return updatedQuestion;
        }
        return question;
      });
    case "remove-nested-reply":
      return questions.map(question => {
        if (question.id === action.payload.questionId) {
          const updatedQuestion = {
            ...question,
            replies: question.replies.map(reply => {
              if (reply.id === action.payload.replyId) {
                return {
                  ...reply,
                  replies: reply.replies.filter(
                    reply => reply.id !== action.payload.nestedReplyId
                  )
                };
              }
              return reply;
            })
          };
          return updatedQuestion;
        }
        return question;
      });
    case "edit-nested-reply":
      return questions.map(question => {
        if (question.id === action.payload.questionId) {
          const updatedQuestion = {
            ...question,
            replies: question.replies.map(reply => {
              if (reply.id === action.payload.replyId) {
                return {
                  ...reply,
                  replies: reply.replies.map(reply => {
                    if (reply.id === action.payload.nestedReply.id) {
                      return action.payload.nestedReply;
                    }
                    return reply;
                  })
                };
              }
              return reply;
            })
          };
          return updatedQuestion;
        }
        return question;
      });
    default:
      return Error("action does not exist!");
  }
};

export default questionsReducer;
