import { getInitialData, saveQuestionAnswer } from "../utils/api";
import { receiveUsers } from "../actions/users";
import { receieveQuestions } from "./questions";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export const APPEND_ANSWER = "APPEND_ANSWER";

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

export function saveAnswer(qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());

    return saveQuestionAnswer({
      qid,
      answer,
      authedUser,
    })
      .then(() =>
        dispatch(
          appendAnswer({
            qid,
            answer,
            authedUser,
          })
        )
      )
      .then(() => dispatch(hideLoading()));
  };
}
