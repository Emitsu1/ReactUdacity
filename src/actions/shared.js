import { getInitialData, saveQuestionAnswer } from "../utils/api";
import { receiveUsers } from "../actions/users";
import { receieveQuestions } from "./questions";

export const APPEND_ANSWER = "APPEND_ANSWER";
/* export const APPEND_ANSWER_QUESTION = "APPEND_QUESTION"; */

export function handleInitialData() {
  return dispatch => {
    getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receieveQuestions(questions));
    });
  };
}

export function appendAnswer({ qid, answer, authedUser }) {
  return {
    type: APPEND_ANSWER,
    answerData: {
      qid,
      answer,
      authedUser,
    },
  };
}

/* export function appendAnswerToQuestion(authedUser, qid, answer) {
  return {
    type: APPEND_ANSWER_QUESTION,
    answerData: {
      authedUser,
      qid,
      answer,
    },
  };
} */

/* export function saveAnswer(authedUser, qid, answer) {
  return dispatch => {
    dispatch(appendAnswerToUser(authedUser, qid, answer));
    dispatch(appendAnswerToQuestion(authedUser, qid, answer));

    return saveQuestionAnswer({ authedUser, qid, answer }).catch(e => {
      console.warn("Error in saveAnswer:", e);
    });
  };
} */

export function saveAnswer(qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    return saveQuestionAnswer({
      qid,
      answer,
      authedUser,
    }).then(() =>
      dispatch(
        appendAnswer({
          qid,
          answer,
          authedUser,
        })
      )
    );
  };
}
