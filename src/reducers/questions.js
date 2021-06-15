import { RECEIVE_QUESTIONS } from "../actions/questions";
import { APPEND_ANSWER } from "../actions/shared";

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case APPEND_ANSWER:
      return {
        ...state,
        [action.answerData.qid]: {
          ...state[action.answerData.qid],
          [action.answerData.answer]: {
            ...state[action.answerData.qid][action.answerData.answer],
            votes: state[action.answerData.qid][
              action.answerData.answer
            ].votes.concat([action.answerData.authedUser]),
          },
        },
      };
    default:
      return state;
  }
}
